import MockDate from 'mockdate';
import { shallowMount } from '@vue/test-utils';
import { parse } from 'date-fns';
import DatetimePicker from '@/components/molecules/datetime-picker';

describe('DatetimePicker', () => {
  let wrapper;

  MockDate.set('2019-01-31T01:23:45');

  const factory = () => shallowMount(DatetimePicker);

  describe('when focus date', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.date').trigger('focus');
    });

    it('emit input with current date', () => {
      expect(wrapper.emitted('input')[0]).toEqual([`${new Date()}`]);
    });
  });

  describe('when focus date and date already inputted', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ value: `${parse('2018-03-03T01:23:45')}` });
      wrapper.find('.date').trigger('focus');
    });

    it('emit input with inputted date', () => {
      expect(wrapper.emitted('input')[0]).toEqual([
        `${parse('2018-03-03T01:23:45')}`
      ]);
    });
  });

  describe('when focus time', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.time').trigger('focus');
    });

    it('emit input with current date', () => {
      expect(wrapper.emitted('input')[0]).toEqual([`${new Date()}`]);
    });
  });

  describe('when focus time but time already inputted', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setProps({ value: `${parse('2018-03-03T01:23:45')}` });
      wrapper.find('.time').trigger('focus');
    });

    it('emit input with inputted date', () => {
      expect(wrapper.emitted('input')[0]).toEqual([
        `${parse('2018-03-03T01:23:45')}`
      ]);
    });
  });

  describe('when input value is invalid', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.date').setValue('foo');
      wrapper.find('.time').setValue('bar');
    });

    it('emit input with undefined', () => {
      expect(wrapper.emitted('input')[0]).toEqual([undefined]);
      expect(wrapper.emitted('input')[1]).toEqual([undefined]);
    });
  });
});
