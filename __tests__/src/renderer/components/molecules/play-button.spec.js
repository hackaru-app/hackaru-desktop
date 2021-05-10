import { shallowMount } from '@vue/test-utils'
import testId from '../../../../__helpers__/test-id'
import PlayButton from '~/components/molecules/play-button'

describe('PlayButton', () => {
  let wrapper

  const factory = () =>
    shallowMount(PlayButton, {
      propsData: { working: true },
    })

  describe('when click start-button', () => {
    beforeEach(async () => {
      wrapper = factory()
      await wrapper.setProps({ working: true })
      wrapper.find(testId('stop-button')).vm.$emit('click')
    })

    it('emits stop', () => {
      expect(wrapper.emitted('stop')).toBeTruthy()
    })
  })

  describe('when click stop-button', () => {
    beforeEach(async () => {
      wrapper = factory()
      await wrapper.setProps({ working: false })
      wrapper.find(testId('start-button')).vm.$emit('click')
    })

    it('emits start', () => {
      expect(wrapper.emitted('start')).toBeTruthy()
    })
  })
})
