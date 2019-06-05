import { actions } from '@/store/modules/auth-api';

describe('Actions', () => {
  let result;

  describe('when dispatch', () => {
    const dispatch = jest.fn(() => ({ foo: 'bar' }));
    const rootGetters = { 'auth/accessToken': 'accessToken' };

    beforeEach(async () => {
      result = await actions.request(
        { dispatch, rootGetters },
        {
          url: '/example',
          method: 'post',
          headers: { 'X-Foo': 'bar' },
          params: {
            fooBar: 'baz'
          },
          data: {
            barBaz: 'baz'
          }
        }
      );
    });

    it('dispatch api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/example',
          method: 'post',
          headers: {
            'X-Foo': 'bar',
            Authorization: 'Bearer accessToken'
          },
          params: {
            fooBar: 'baz'
          },
          data: {
            barBaz: 'baz'
          }
        },
        { root: true }
      );
    });

    it('returns response', () => {
      expect(result).toEqual({
        foo: 'bar'
      });
    });
  });
});
