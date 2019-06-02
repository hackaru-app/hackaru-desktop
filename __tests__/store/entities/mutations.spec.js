import { mutations } from '@/store/modules/entities';

describe('Mutations', () => {
  describe('when commit MERGE_ENTITIES', () => {
    const entities = {
      users: {
        1: {
          id: 1,
          name: 'Jonh',
          tags: ['orange']
        }
      }
    };

    const state = { entities };

    beforeEach(() => {
      mutations['MERGE_ENTITIES'](state, {
        users: {
          1: {
            name: 'John',
            age: 20,
            tags: ['apple']
          },
          2: {
            id: 2,
            name: 'Bob'
          }
        }
      });
    });

    it('overwrite existing array', () => {
      expect(state.data.users[1].tags).toEqual(['apple']);
    });

    it('overwrite existing property', () => {
      expect(state.data.users[1].name).toBe('John');
    });

    it('add new property', () => {
      expect(state.data.users[1].age).toBe(20);
    });

    it('add new user', () => {
      expect(state.data.users[2]).toEqual({ id: 2, name: 'Bob' });
    });

    it('is not shallow copy', () => {
      expect(entities).not.toBe(state.data);
    });
  });

  describe('when commit DELETE_ENTITY', () => {
    const state = {
      data: {
        users: {
          1: {
            id: 1,
            name: 'Jonh',
            tags: ['orange']
          }
        }
      }
    };

    beforeEach(() => {
      mutations['DELETE_ENTITY'](state, { name: 'users', id: 1 });
    });

    it('remove entity', () => {
      expect(state.data.users).toEqual({});
    });
  });
});
