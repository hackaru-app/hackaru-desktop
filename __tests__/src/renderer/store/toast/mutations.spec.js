import { mutations } from '~/store/toast'

describe('Mutations', () => {
  describe('when commit SHOW_ERROR', () => {
    const state = { rand: 0 }

    beforeEach(() => {
      mutations.SHOW_ERROR(state, 'description')
    })

    it('sets text', () => {
      expect(state.text).toBe('description')
    })

    it('sets type', () => {
      expect(state.type).toBe('error')
    })

    it('sets rand', () => {
      expect(state.rand).not.toBe(0)
    })

    it('sets duration', () => {
      expect(state.duration).toBe(5000)
    })
  })

  describe('when commit SHOW_SUCCESS', () => {
    const state = { rand: 0 }

    beforeEach(() => {
      mutations.SHOW_SUCCESS(state, 'description')
    })

    it('sets text', () => {
      expect(state.text).toBe('description')
    })

    it('sets type', () => {
      expect(state.type).toBe('success')
    })

    it('sets rand', () => {
      expect(state.rand).not.toBe(0)
    })

    it('sets duration', () => {
      expect(state.duration).toBe(3000)
    })
  })
})
