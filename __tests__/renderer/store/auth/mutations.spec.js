import { mutations } from '@/store/modules/auth';

jest.mock('keytar', () => {});

describe('Mutations', () => {
  describe('when commit SET_API_URL', () => {
    const state = {};

    beforeEach(() => {
      mutations['SET_API_URL'](state, 'http://api.example.com');
    });

    it('set api-url', () => {
      expect(state.apiUrl).toBe('http://api.example.com');
    });
  });

  describe('when commit SET_APP_TOKEN', () => {
    const state = {};

    beforeEach(() => {
      mutations['SET_APP_TOKEN'](state, {
        uid: 'uid',
        secret: 'secret',
        webUrl: 'http://web.example.com'
      });
    });

    it('set uid', () => {
      expect(state.uid).toBe('uid');
    });

    it('set secret', () => {
      expect(state.secret).toBe('secret');
    });

    it('set webUrl', () => {
      expect(state.webUrl).toBe('http://web.example.com');
    });
  });

  describe('when commit SET_ACCESS_TOKEN', () => {
    const state = {};

    beforeEach(() => {
      mutations['SET_ACCESS_TOKEN'](state, 'accessToken');
    });

    it('set accessToken', () => {
      expect(state.accessToken).toBe('accessToken');
    });
  });

  describe('when commit CLEAR_ACCESS_TOKEN', () => {
    const state = { accessToken: 'accessToken' };

    beforeEach(() => {
      mutations['CLEAR_ACCESS_TOKEN'](state);
    });

    it('removes accessToken', () => {
      expect(state.accessToken).toBeUndefined();
    });
  });
});
