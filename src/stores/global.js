export const state = () => ({
  is_container_needed: '',
})

export const actions = {
  setIsContainerNeeded(state, is_container_needed) {
    state.commit('updateIsContainerNeeded', is_container_needed)
  },
}

export const mutations = {
  updateIsContainerNeeded (state, is_container_needed) {
    state.is_container_needed = is_container_needed
  },
}
