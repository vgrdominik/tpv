import Vue from 'vue'
import Vuex from 'vuex'
import { state as serverMessageState, actions as serverMessageActions, mutations as serverMessageMutations } from '../stores/serverMessage'
import { state as userState, actions as userActions, mutations as userMutations } from '../stores/user'
import { state as globalState, actions as globalActions, mutations as globalMutations } from '../stores/global'
import { state as productState, actions as productActions, mutations as productMutations } from '../stores/product'
import { state as familyState, actions as familyActions, mutations as familyMutations } from '../stores/family'
import { state as ticketState, actions as ticketActions, getters as ticketGetters, mutations as ticketMutations } from '../stores/ticket'
import { state as customerState, actions as customerActions, getters as customerGetters, mutations as customerMutations } from '../stores/customer'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        serverMessage: {
            namespaced: true,
            state: serverMessageState,
            actions: serverMessageActions,
            mutations: serverMessageMutations,
        },
        user: {
            namespaced: true,
            state: userState,
            actions: userActions,
            mutations: userMutations,
        },
        global: {
            namespaced: true,
            state: globalState,
            actions: globalActions,
            mutations: globalMutations,
        },
        product: {
            namespaced: true,
            state: productState,
            actions: productActions,
            mutations: productMutations,
        },
        family: {
            namespaced: true,
            state: familyState,
            actions: familyActions,
            mutations: familyMutations,
        },
        ticket: {
            namespaced: true,
            state: ticketState,
            actions: ticketActions,
            getters: ticketGetters,
            mutations: ticketMutations,
        },
        customer: {
            namespaced: true,
            state: customerState,
            actions: customerActions,
            getters: customerGetters,
            mutations: customerMutations,
        },
    },
})
