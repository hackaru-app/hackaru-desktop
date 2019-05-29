import MockDate from 'mockdate';
import { shallowMount } from '@vue/test-utils';
import Ticker from '@/components/atoms/ticker';

describe('Ticker', () => {
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const $timer = { stop: jest.fn() };
  const factory = () =>
    shallowMount(Ticker, {
      propsData: { startedAt: '2019-01-31T02:23:45' },
      mocks: { $timer }
    });

  describe('when stoppedAt is empty', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        startedAt: '2019-01-31T00:23:45',
        stoppedAt: undefined
      });
      wrapper.vm.updateDuration();
    });

    it('set duration correctly', () => {
      expect(wrapper.find('time').text()).toBe('01:00:00');
    });
  });

  describe('when stoppedAt is defined', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({
        startedAt: '2019-01-31T02:23:45',
        stoppedAt: '2019-01-31T04:23:45'
      });
      wrapper.vm.updateDuration();
    });

    it('set duration correctly', () => {
      expect(wrapper.find('time').text()).toBe('02:00:00');
    });

    it('stop timer', () => {
      expect($timer.stop).toHaveBeenCalledWith('updateDuration');
    });
  });
});
