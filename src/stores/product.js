export const state = () => ({
  units: 1,

  // Contain all products
  products: [
    {
      id: null,
      id_taxonomy: null,
      iva: null,
      ids_send_to: null,
      name: null,
      cost: null,
      base: null,
      total: null,
      reference: null,
      complement_unique: null,
      complement_show: null,
      img: null,
      text_tpv: null,
    },
  ]
})

export const actions = {
  setProducts(state, payload) {
    state.commit('updateProducts', payload)
  },
  setUnits(state, payload) {
    state.commit('updateUnits', payload)
  },
}

export const mutations = {
  updateProducts (state, products) {
    state.products = products
  },
  updateUnits (state, units) {
    state.units = units
  },
}
