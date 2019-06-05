import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import ProjectSelect from '@/components/molecules/project-select';

describe('ProjectSelect', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'projects/all': [
        {
          id: 1,
          name: 'Development',
          color: '#ccc'
        }
      ]
    }
  });

  const factory = () =>
    shallowMount(ProjectSelect, {
      mocks: {
        $store
      }
    });

  it('has no-project option', () => {
    wrapper = factory();
    expect(
      wrapper
        .findAll('option')
        .at(0)
        .text()
    ).toBe('No Project');
  });

  describe('when select option', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper
        .findAll('option')
        .at(1)
        .setSelected();
    });

    it('emit input', () => {
      expect(wrapper.emitted('input')[0][0]).toBe(1);
    });
  });
});
