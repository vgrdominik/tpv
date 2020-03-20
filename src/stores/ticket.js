export const state = () => ({
  // Contain all tickets
  tickets: [
    {
      id: null,
    },
  ]
})

export const actions = {
  setTickets(state, payload) {
    state.commit('updateTickets', payload)
  },
}

export const mutations = {
  updateTickets (state, tickets) {
    state.tickets = tickets
  },
}
