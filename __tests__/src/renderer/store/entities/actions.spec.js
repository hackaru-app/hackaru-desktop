import { schema } from 'normalizr'
import { actions } from '~/store/entities'

describe('Actions', () => {
  const user = new schema.Entity('users', {
    comment: new schema.Entity('comments'),
  })

  describe('when dispatch merge', () => {
    const commit = jest.fn()

    beforeEach(() => {
      actions.merge(
        { commit },
        {
          schema: user,
          json: {
            id: 1,
            name: 'John',
            comment: {
              id: 2,
              description: 'Hello',
            },
          },
        }
      )
    })

    it('commits MERGE_ENTITIES', () => {
      expect(commit).toHaveBeenCalledWith('MERGE_ENTITIES', {
        users: {
          1: {
            id: 1,
            comment: 2,
            name: 'John',
          },
        },
        comments: {
          2: {
            id: 2,
            description: 'Hello',
          },
        },
      })
    })
  })

  describe('when dispatch merge and json is null', () => {
    const commit = jest.fn()

    beforeEach(() => {
      actions.merge(
        { commit },
        {
          schema: user,
          json: null,
        }
      )
    })

    it('does not commit', () => {
      expect(commit).not.toHaveBeenCalled()
    })
  })

  describe('when dispatch merge and json is not object', () => {
    const commit = jest.fn()

    beforeEach(() => {
      actions.merge(
        { commit },
        {
          schema: user,
          json: 'invalid',
        }
      )
    })

    it('does not commit', () => {
      expect(commit).not.toHaveBeenCalled()
    })
  })

  describe('when dispatch delete', () => {
    const commit = jest.fn()

    beforeEach(() => {
      actions.delete({ commit }, { name: 'activities', id: 1 })
    })

    it('commits DELETE_ENTITY', () => {
      expect(commit).toHaveBeenCalledWith('DELETE_ENTITY', {
        name: 'activities',
        id: 1,
      })
    })
  })
})
