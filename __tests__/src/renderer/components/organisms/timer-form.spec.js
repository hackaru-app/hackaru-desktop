import MockDate from 'mockdate'
import { Store } from 'vuex-mock-store'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { formatISO } from 'date-fns'
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
    sendMixpanelEvent: jest.fn(),
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

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith(
        'Select project',
        {
          component: 'timer-form',
        }
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

    it('does not send mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).not.toHaveBeenCalled()
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
      $store.dispatch.mockReturnValue(true)
      $store.getters['activities/working'] = {
        id: 1,
        project: { id: 2 },
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

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith(
        'Update activity',
        {
          component: 'timer-form',
          projectId: 2,
          descriptionLength: 7,
        }
      )
    })

    it('dispatches activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        description: 'updated',
        projectId: 2,
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

    it('does not send mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).not.toHaveBeenCalled()
    })

    it('does not dispatch activities/update', () => {
      expect($store.dispatch).not.toHaveBeenCalled()
    })
  })

  describe('when change description and timer is working', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true)
      $store.getters['activities/working'] = {
        id: 1,
        project: { id: 2 },
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

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith(
        'Update activity',
        {
          component: 'timer-form',
          projectId: 2,
          descriptionLength: 7,
        }
      )
    })

    it('dispatches activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        description: 'updated',
        projectId: 2,
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

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith(
        'Start activity',
        {
          component: 'timer-form',
          startedAt: formatISO(new Date()),
          projectId: undefined,
          descriptionLength: 7,
        }
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

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith(
        'Stop activity',
        {
          component: 'timer-form',
          startedAt: '2019-01-01T01:23:45',
          stoppedAt: formatISO(new Date()),
          projectId: undefined,
          duration: 2592000,
          descriptionLength: 15,
        }
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

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith(
        'Start activity',
        {
          component: 'timer-form',
          startedAt: formatISO(new Date()),
          projectId: undefined,
          descriptionLength: 0,
        }
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

  describe('when select suggestion', () => {
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

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith(
        'Start activity',
        {
          component: 'timer-form',
          startedAt: formatISO(new Date()),
          projectId: 1,
          descriptionLength: 15,
        }
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
        project: { id: 1 },
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

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith(
        'Delete activity',
        {
          component: 'timer-form',
          projectId: 1,
          descriptionLength: 15,
        }
      )
    })

    it('dispatches activities/delete', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/delete', 1)
    })
  })
})
