import { mutations } from '~/store/user'

describe('Mutations', () => {
  describe('when commit SET_USER_ID', () => {
    const state = { id: undefined }

    beforeEach(() => {
      mutations.SET_USER_ID(state, { id: 1 })
    })

    it('sets id', () => {
      expect(state.id).toBe(1)
    })
  })
})
