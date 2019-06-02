import { getters } from '@/store/modules/entities';
import { schema } from 'normalizr';

describe('Getters', () => {
  let result;

  const user = new schema.Entity('users', {
    comment: new schema.Entity('comments')
  });

  describe('when call getEntities', () => {
    const state = {
      data: {
        users: {
          1: {
            comment: 2,
            id: 1,
            name: 'John'
          }
        },
        comments: {
          2: {
            id: 2,
            description: 'Hello'
          }
        }
      }
    };

    beforeEach(() => {
      result = getters.getEntities(state)('users', [user]);
    });

    it('returns getEntities entities', () => {
      expect(result).toEqual([
        {
          id: 1,
          name: 'John',
          comment: {
            id: 2,
            description: 'Hello'
          }
        }
      ]);
    });
  });

  describe('when call getEntities but entities is empty', () => {
    const state = {
      data: {}
    };

    beforeEach(() => {
      result = getters.getEntities(state)('users', [user]);
    });

    it('returns empty array', () => {
      expect(result).toEqual([]);
    });
  });
});
