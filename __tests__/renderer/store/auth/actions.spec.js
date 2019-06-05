import { actions } from '@/store/modules/auth';

jest.mock('keytar', () => ({
  deletePassword: () => {},
  getPassword: () => 'accessToken',
  setPassword: () => {}
}));

describe('Actions', () => {
  let result;

  describe('when dispatch fetchAppToken', () => {
    const commit = jest.fn();

    const dispatch = jest.fn(() => ({
      data: {
        webUrl: 'http://web.example.com',
        application: {
          uid: 'uid',
          secret: 'secret'
        }
      }
    }));

    const state = {
      name: 'Example',
      service: 'service',
      redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
      scopes: ['activities:read', 'activities:write'],
      apiUrl: 'https://api.hackaru.app'
    };

    beforeEach(() => {
      actions.fetchAppToken(
        { state, commit, dispatch },
        'http://api.example.com'
      );
    });

    it('dispatch api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/oauth/applications',
          method: 'post',
          data: {
            name: 'Example',
            redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
            scopes: 'activities:read activities:write'
          }
        },
        { root: true }
      );
    });

    it('commit SET_APP_TOKEN', () => {
      expect(commit).toHaveBeenCalledWith('SET_APP_TOKEN', {
        webUrl: 'http://web.example.com',
        uid: 'uid',
        secret: 'secret'
      });
    });
  });

  describe('when dispatch logout', () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    const state = {
      name: 'Example',
      service: 'service',
      uid: 'uid',
      secret: 'secret',
      accessToken: 'accessToken'
    };

    beforeEach(() => {
      actions.logout({ state, commit, dispatch });
    });

    it('dispatch api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'api/request',
        {
          url: '/v1/oauth/revoke',
          method: 'post',
          data: {
            client_id: 'uid',
            client_secret: 'secret',
            token: 'accessToken'
          }
        },
        { root: true }
      );
    });

    it('commit CLEAR_ACCESS_TOKEN', () => {
      expect(commit).toHaveBeenCalledWith('CLEAR_ACCESS_TOKEN');
    });
  });

  describe('when dispatch restoreAccessToken', () => {
    const commit = jest.fn();
    const state = {
      service: 'service',
      uid: 'uid'
    };

    beforeEach(async () => {
      result = await actions.restoreAccessToken({ state, commit });
    });

    it('commit SET_ACCESS_TOKEN', () => {
      expect(commit).toHaveBeenCalledWith('SET_ACCESS_TOKEN', 'accessToken');
    });

    it('return accessToken', () => {
      expect(result).toBe('accessToken');
    });
  });

  describe('when dispatch restoreAccessToken but already has accessToken', () => {
    const commit = jest.fn();
    const state = {
      accessToken: 'accessToken'
    };

    beforeEach(async () => {
      result = await actions.restoreAccessToken({ state, commit });
    });

    it('does not commit', () => {
      expect(commit).not.toHaveBeenCalled();
    });

    it('return accessToken', () => {
      expect(result).toBe('accessToken');
    });
  });

  describe('when dispatch storeAccessToken', () => {
    const commit = jest.fn();
    const state = {
      service: 'service',
      uid: 'uid'
    };

    beforeEach(() => {
      actions.storeAccessToken({ state, commit }, 'accessToken');
    });

    it('commit SET_ACCESS_TOKEN', () => {
      expect(commit).toHaveBeenCalledWith('SET_ACCESS_TOKEN', 'accessToken');
    });
  });
});
