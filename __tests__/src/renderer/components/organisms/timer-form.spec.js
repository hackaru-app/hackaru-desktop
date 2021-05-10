import MockDate from 'mockdate'
import { Store } from 'vuex-mock-store'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import testId from '../../../../__helpers__/test-id'
import TimerForm from '~/components/organisms/timer-form'

describe('TimerForm', () => {
  let wrapper

  MockDate.set('2019-01-31T01:23:45')

  const $store = new Store({
    getters: {
      'activities/working': [],
      'projects/all': [],
    },
  })

  global.electron = {
    sendGaEvent: jest.fn(),
  }

  const localVue = createLocalVue()
  localVue.directive('tooltip', () => {})

  const factory = () =>
    shallowMount(TimerForm, {
      localVue,
      mocks: {
        $store,
        $modal: {
          hide: () => {},
        },
      },
      propsData: {
        query: '',
      },
    })

  describe('when timer is not working', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = null
      wrapper = factory()
    })

    it('hides delete-button', () => {
      expect(wrapper.find(testId('delete-button')).exists()).toBe(false)
    })
  })

  describe('when timer is working', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = {
        id: 1,
        project: null,
        description: 'Review my tasks',
        startedAt: '2019-01-01T01:23:45',
        stoppedAt: null,
      }
      wrapper = factory()
    })

    it('shows delete-button', () => {
      expect(wrapper.find(testId('delete-button')).exists()).toBe(true)
    })
  })

  describe('when select project and timer is working', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = {
        id: 1,
        project: null,
        description: 'Review my tasks',
        startedAt: '2019-01-01T01:23:45',
        stoppedAt: null,
      }
      wrapper = factory()
      wrapper.find(testId('project-select')).vm.$emit('input', 1)
    })

    it('sends ga event', () => {
      expect(global.electron.sendGaEvent).toHaveBeenCalledWith(
        'Activities',
        'update'
      )
    })

    it('dispatches activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        description: 'Review my tasks',
        projectId: 1,
      })
    })
  })

  describe('when select project and timer is not working', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = null
      wrapper = factory()
      wrapper.find(testId('project-select')).vm.$emit('input', 1)
    })

    it('does not send ga event', () => {
      expect(global.electron.sendGaEvent).not.toHaveBeenCalled()
    })

    it('does not dispatch activities/update', () => {
      expect($store.dispatch).not.toHaveBeenCalledWith('activities/update')
    })
  })

  describe('when focus description and timer is not working', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = null
      wrapper = factory()
      wrapper.find(testId('description')).trigger('focus')
    })

    it('shows suggestion-list', () => {
      expect(wrapper.find(testId('suggestion-list')).exists()).toBe(true)
    })
  })

  describe('when focus description and timer is working', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = {
        id: 1,
        project: null,
        description: 'Review my tasks',
        startedAt: '2019-01-01T01:23:45',
        stoppedAt: null,
      }
      wrapper = factory()
      wrapper.find(testId('description')).trigger('focus')
    })

    it('does not show suggestion-list', () => {
      expect(wrapper.find(testId('suggestion-list')).exists()).toBe(false)
    })
  })

  describe('when blur description', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = null
      wrapper = factory()
      wrapper.find(testId('description')).trigger('focus')
      wrapper.find(testId('description')).trigger('blur')
    })

    it('hides show suggestion-list', () => {
      expect(wrapper.find(testId('suggestion-list')).exists()).toBe(false)
    })
  })

  describe('when change description and timer is working', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = {
        id: 1,
        project: null,
        description: 'Review my tasks',
        startedAt: '2019-01-01T01:23:45',
        stoppedAt: null,
      }
      wrapper = factory()
      wrapper.find(testId('description')).setValue('updated')
      wrapper.find(testId('description')).trigger('change')
    })

    it('sends ga event', () => {
      expect(global.electron.sendGaEvent).toHaveBeenCalledWith(
        'Activities',
        'update'
      )
    })

    it('dispatches activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        description: 'updated',
        projectId: undefined,
      })
    })
  })

  describe('when change description and timer is not working', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = null
      wrapper = factory()
      wrapper.find(testId('description')).setValue('updated')
      wrapper.find(testId('description')).trigger('change')
    })

    it('does not send ga event', () => {
      expect(global.electron.sendGaEvent).not.toHaveBeenCalled()
    })

    it('does not dispatch activities/update', () => {
      expect($store.dispatch).not.toHaveBeenCalled()
    })
  })

  describe('when change description and timer is working', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = {
        id: 1,
        project: null,
        description: 'Review my tasks',
        startedAt: '2019-01-01T01:23:45',
        stoppedAt: null,
      }
      wrapper = factory()
      wrapper.find(testId('description')).setValue('updated')
      wrapper.find(testId('description')).trigger('keypress.enter')
    })

    it('sends ga event', () => {
      expect(global.electron.sendGaEvent).toHaveBeenCalledWith(
        'Activities',
        'update'
      )
    })

    it('dispatches activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        description: 'updated',
        projectId: undefined,
      })
    })
  })

  describe('when press enter and timer is not working', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = null
      wrapper = factory()
      wrapper.find(testId('description')).setValue('updated')
      wrapper.find(testId('description')).trigger('keypress.enter')
    })

    it('sends ga event', () => {
      expect(global.electron.sendGaEvent).toHaveBeenCalledWith(
        'Activities',
        'start'
      )
    })

    it('dispatches activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        description: 'updated',
        projectId: undefined,
        startedAt: new Date(),
      })
    })
  })

  describe('when emit stop of play-button', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = {
        id: 1,
        project: null,
        description: 'Review my tasks',
        startedAt: '2019-01-01T01:23:45',
        stoppedAt: null,
      }
      wrapper = factory()
      wrapper.find(testId('play-button')).vm.$emit('stop')
    })

    it('sends ga event', () => {
      expect(global.electron.sendGaEvent).toHaveBeenCalledWith(
        'Activities',
        'stop'
      )
    })

    it('dispatches activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        projectId: undefined,
        description: 'Review my tasks',
        stoppedAt: new Date(),
      })
    })
  })

  describe('when emit start of play-button', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = null
      wrapper = factory()
      wrapper.find(testId('play-button')).vm.$emit('start')
    })

    it('sends ga event', () => {
      expect(global.electron.sendGaEvent).toHaveBeenCalledWith(
        'Activities',
        'start'
      )
    })

    it('dispatches activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        description: '',
        projectId: undefined,
        startedAt: new Date(),
      })
    })
  })

  describe('when selects suggestion', () => {
    beforeEach(async () => {
      $store.getters['activities/working'] = null
      wrapper = factory()
      await wrapper.find(testId('description')).trigger('focus')
      wrapper.find(testId('suggestion-list')).vm.$emit('select', {
        description: 'Review my tasks',
        project: {
          id: 1,
        },
      })
    })

    it('sends ga event', () => {
      expect(global.electron.sendGaEvent).toHaveBeenCalledWith(
        'Activities',
        'start'
      )
    })

    it('dispatches activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        description: 'Review my tasks',
        projectId: 1,
        startedAt: new Date(),
      })
    })
  })

  describe('when delete timer', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = {
        id: 1,
        project: null,
        description: 'Review my tasks',
        startedAt: '2019-01-01T01:23:45',
        stoppedAt: null,
      }
      wrapper = factory()
      wrapper.vm.deleteWorking()
    })

    it('sends ga event', () => {
      expect(global.electron.sendGaEvent).toHaveBeenCalledWith(
        'Activities',
        'delete'
      )
    })

    it('dispatches activities/delete', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/delete', 1)
    })
  })
})
