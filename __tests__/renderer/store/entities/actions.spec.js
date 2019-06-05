import { actions } from '@/store/modules/entities';
import { schema } from 'normalizr';

describe('Actions', () => {
  const user = new schema.Entity('users', {
    comment: new schema.Entity('comments')
  });

  describe('when dispatch merge', () => {
    const commit = jest.fn();

    beforeEach(async () => {
      actions.merge(
        { commit },
        {
          schema: user,
          json: {
            id: 1,
            name: 'John',
            comment: {
              id: 2,
              description: 'Hello'
            }
          }
        }
      );
    });

    it('commit MERGE_ENTITIES', () => {
      expect(commit).toHaveBeenCalledWith('MERGE_ENTITIES', {
        users: {
          1: {
            id: 1,
            comment: 2,
            name: 'John'
          }
        },
        comments: {
          2: {
            id: 2,
            description: 'Hello'
          }
        }
      });
    });
  });
});
