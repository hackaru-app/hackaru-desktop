import { getters } from '@/store/modules/auth';

jest.mock('keytar', () => {});

describe('Getters', () => {
  let result;

  describe('when call authorizeUrl', () => {
    const state = {
      webUrl: 'http://web.example.com',
      uid: 'uid',
      redirectUri: 'redirectUri',
      scopes: ['activities:read', 'activities:write']
    };

    beforeEach(() => {
      result = getters.authorizeUrl(state);
    });

    it('returns authorize-url', () => {
      expect(result).toBe(
        'http://web.example.com/oauth/authorize?client_id=uid&redirect_uri=redirectUri&response_type=token&scope=activities%3Aread%20activities%3Awrite'
      );
    });
  });

  describe('when call accessToken', () => {
    const state = {
      accessToken: 'accessToken'
    };

    beforeEach(() => {
      result = getters.accessToken(state);
    });

    it('returns accessToken', () => {
      expect(result).toBe('accessToken');
    });
  });

  describe('when call apiUrl', () => {
    const state = {
      apiUrl: 'http://api.example.com'
    };

    beforeEach(() => {
      result = getters.apiUrl(state);
    });

    it('returns apiUrl', () => {
      expect(result).toBe('http://api.example.com');
    });
  });

  describe('when call webUrl', () => {
    const state = {
      webUrl: 'http://web.example.com'
    };

    beforeEach(() => {
      result = getters.webUrl(state);
    });

    it('returns webUrl', () => {
      expect(result).toBe('http://web.example.com');
    });
  });

  describe('when call persistKey', () => {
    const state = {
      apiUrl: 'http://api.example.com',
      uid: 'uid'
    };

    beforeEach(() => {
      result = getters.persistKey(state);
    });

    it('returns key correctly', () => {
      expect(result).toBe('aHR0cDovL2FwaS5leGFtcGxlLmNvbX0=');
    });
  });
});
