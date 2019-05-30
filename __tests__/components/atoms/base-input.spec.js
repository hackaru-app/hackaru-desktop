import { shallowMount } from '@vue/test-utils';
import BaseInput from '@/components/atoms/base-input';

describe('BaseInput', () => {
  let wrapper;

  const factory = () => shallowMount(BaseInput);

  describe('when enter text', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setValue('foo');
    });

    it('emit input', () => {
      expect(wrapper.emitted('input')[0][0]).toBe('foo');
    });
  });
});
