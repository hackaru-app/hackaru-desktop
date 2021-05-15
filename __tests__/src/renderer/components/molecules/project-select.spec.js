import { shallowMount } from '@vue/test-utils'
import testId from '../../../../__helpers__/test-id'
import ProjectSelect from '~/components/molecules/project-select'

describe('ProjectSelect', () => {
  let wrapper

  const factory = () =>
    shallowMount(ProjectSelect, {
      propsData: {
        projects: [
          {
            id: null,
            name: 'No Project',
            color: '#cccfd9',
          },
          {
            id: 1,
            name: 'Review',
            color: '#ff0',
          },
        ],
      },
    })

  describe('when select project', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('select')).findAll('option').at(1).setSelected()
    })

    it('emits input', () => {
      expect(wrapper.emitted('input')[0][0]).toBe(1)
    })
  })

  describe('when select no-project', () => {
    beforeEach(async () => {
      wrapper = factory()
      await wrapper.setProps({ value: 1 })
      wrapper.find(testId('select')).findAll('option').at(0).setSelected()
    })

    it('emits input', () => {
      expect(wrapper.emitted('input')[0][0]).toBeNull()
    })
  })
})
