import MockDate from 'mockdate';
import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import BigTimer from '@/components/organisms/big-timer';

describe('BigTimer', () => {
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const $store = new Store({
    getters: {
      'activities/working': [],
      'activities/search': () => [
        {
          project: {
            id: 2,
            name: 'Review',
            color: '#ff0'
          },
          description: 'Review my tasks'
        }
      ]
    }
  });

  const factory = () =>
    shallowMount(BigTimer, {
      mocks: { $store }
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when select project and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.project-select').vm.$emit('input', 1);
    });

    it('does not dispatch activities/update', () => {
      expect($store.dispatch).not.toHaveBeenCalledWith(
        'activities/update',
        expect.any(Object)
      );
    });
  });

  describe('when select project and timer is working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({
        id: 1,
        projectId: undefined,
        startedAt: '2019-01-01T01:23:45',
        description: 'Review my tasks'
      });
      wrapper.find('.project-select').vm.$emit('input', 1);
    });

    it('dispatch activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        description: 'Review my tasks',
        projectId: 1
      });
    });
  });

  describe('when submit and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.project-select').vm.$emit('input', 2);
      wrapper.find('.description').setValue('Review my tasks');
      wrapper.find('.form').trigger('submit');
    });

    it('dispatch activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        description: 'Review my tasks',
        projectId: 2,
        startedAt: `${new Date()}`
      });
    });
  });

  describe('when submit and timer is working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ id: 1 });
      wrapper.find('.form').trigger('submit');
    });

    it('dispatch activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        stoppedAt: `${new Date()}`
      });
    });
  });

  describe('when press enter on description and timer is working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ id: 1 });
      wrapper.find('.project-select').vm.$emit('input', 2);
      wrapper.find('.description').setValue('Review my tasks');
      wrapper.find('.description').trigger('keypress.enter');
    });

    it('dispatch activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        projectId: 2,
        description: 'Review my tasks'
      });
    });
  });

  describe('when press enter on description and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.project-select').vm.$emit('input', 2);
      wrapper.find('.description').setValue('Review my tasks');
      wrapper.find('.description').trigger('keypress.enter');
    });

    it('dispatch activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        projectId: 2,
        description: 'Review my tasks',
        startedAt: `${new Date()}`
      });
    });
  });

  describe('when focus description', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.description').trigger('focus');
    });

    it('show suggest-list', () => {
      expect(wrapper.find('.suggest-list-wrapper').exists()).toBe(true);
    });
  });

  describe('when blur description and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.description').trigger('focus');
      wrapper.find('.description').trigger('blur');
    });

    it('hide suggest-list', () => {
      expect(wrapper.find('.suggest-list-wrapper').exists()).toBe(false);
    });
  });

  describe('when change description and timer is not working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.description').setValue('Review my tasks');
      wrapper.find('.description').trigger('change');
    });

    it('does not dispatch activities/update', () => {
      expect($store.dispatch).not.toHaveBeenCalledWith(
        'activities/update',
        expect.any(Object)
      );
    });
  });

  describe('when change description and timer is working', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ id: 1 });
      wrapper.find('.project-select').vm.$emit('input', 2);
      wrapper.find('.description').setValue('Review my tasks');
      wrapper.find('.description').trigger('change');
    });

    it('dispatch activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        projectId: 2,
        description: 'Review my tasks'
      });
    });
  });

  describe('when click suggest-item', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.description').trigger('focus');
      wrapper.find('.suggest-item').trigger('click');
    });

    it('dispatch activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        projectId: 2,
        description: 'Review my tasks',
        startedAt: `${new Date()}`
      });
    });
  });

  describe('when click delete-button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper.setData({ id: 1 });
      wrapper.find('.delete-button').vm.$emit('click');
    });

    it('dispatch activities/delete', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/delete', 1);
    });
  });

  describe('when click delete-button but confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory();
      wrapper.setData({ id: 1 });
      wrapper.find('.delete-button').vm.$emit('click');
    });

    it('does not dispatch activities/delete', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });
  });
});
