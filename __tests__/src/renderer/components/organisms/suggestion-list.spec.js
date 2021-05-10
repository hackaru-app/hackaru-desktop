import { Store } from 'vuex-mock-store'
import { shallowMount } from '@vue/test-utils'
import testId from '../../../../__helpers__/test-id'
import SuggestionList from '~/components/organisms/suggestion-list'

describe('SuggestionList', () => {
  let wrapper

  const $store = new Store({})

  const factory = () =>
    shallowMount(SuggestionList, {
      mocks: {
        $store,
      },
      propsData: {
        query: '',
      },
    })

  describe('when suggestions is empty', () => {
    beforeEach(() => {
      $store.getters['suggestions/all'] = []
      wrapper = factory()
    })

    it('hides suggestion-list', () => {
      expect(wrapper.find(testId('suggestion-list')).exists()).toBe(false)
    })
  })

  describe('when mousedown suggestion', () => {
    beforeEach(() => {
      $store.getters['suggestions/all'] = [
        {
          description: 'Review my tasks',
          project: {
            id: 2,
            name: 'Review',
            color: '#ff0',
          },
        },
      ]
      wrapper = factory()
      wrapper.find(testId('suggestion')).trigger('mousedown')
    })

    it('emits select', () => {
      expect(wrapper.emitted('select')[0][0]).toEqual({
        description: 'Review my tasks',
        project: {
          id: 2,
          name: 'Review',
          color: '#ff0',
        },
      })
    })
  })
})
