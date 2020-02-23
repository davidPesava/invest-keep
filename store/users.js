export const state = () => ({
  currentUser: null,
  credentials: null
})

export const mutations = {
  setCurrentUser(state, val) {
    state.currentUser = val
  },
  setCredentials(state, val) {
    state.credentials = val
  },
}
