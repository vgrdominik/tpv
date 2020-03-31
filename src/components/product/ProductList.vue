<template>
  <v-content class="pa-0">
    <v-row class="ml-2 mr-2" align="center" justify="center">
      <v-col dense class="body-1 text-uppercase pb-0 pt-2" v-if="$vuetify.breakpoint.smAndUp">
        <UnitList />
      </v-col>
    </v-row>
    <CtCard
            :type="stored_config.branding.style.card"
            fluid
            :title="currentFamily ? $store.state.family.families.filter((family) => family.id === currentFamily)[0].text_tpv : 'Todos'"
            dense
            class="mt-2">
      <!-- HEADER -->
      <template v-slot:leftTitleContent>
        <CtTextField
                v-model="search"
                :ctType="stored_config.branding.style.form"
                clearable
                dark
                flat
                solo-inverted
                hide-details
                class="ml-3"
                label="Buscador" />
        <v-spacer />
      </template>
      <template v-slot:rightTitleContent>
        <CtTooltip left btn btn-type="icon" btn-color="white" :btn-icon="['fas', 'times']" @click="$store.state.family.current_family = 0" v-if="currentFamily !== 0">
          Eliminar filtro de familia
        </CtTooltip>
        <v-spacer />

        <span class="mr-4 white--text" v-if="$vuetify.breakpoint.mdAndUp">
          Página {{ page }} de {{ numberOfPages }}
        </span>
        <v-btn
                fab
                small
                color="secondary"
                class="mr-1"
                @click="formerPage"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
                fab
                small
                color="secondary"
                class="ml-1"
                @click="nextPage"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </template>

      <!-- LIST -->
      <v-card-text class="ct-card-content-product-list pt-0 pb-3">
        <v-data-iterator
                :items="products"
                :items-per-page.sync="productsPerPage"
                :page="page"
                :search="search"
                :sort-by="sortBy"
                :sort-desc="sortDesc"
                hide-default-footer
        >
          <template v-slot:no-data>
            <v-col cols="12" class="text-center">
              <span class="primary--text body-2">No hay productos</span>
            </v-col>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col
                      v-for="item in props.items"
                      :key="item.name"
                      cols="4"
                      sm="4"
                      md="3"
                      lg="2"
                      class="pt-3 pb-0"
              >
                <v-card @click="addProductToTicker(item)" style="cursor: pointer">
                  <v-row dense class="pt-4">
                    <v-spacer />
                    <v-avatar v-if="item.img" :width="$vuetify.breakpoint.smAndDown? 50 : '7vh'" :height="$vuetify.breakpoint.smAndDown? 50 : '7vh'">
                      <v-img
                              :src="require('../../assets/product/barRestaurant/' + item.img)"
                              class="my-3"
                      />
                    </v-avatar>
                    <v-avatar v-else color="secondary" :width="$vuetify.breakpoint.smAndDown? 50 : '7vh'" :height="$vuetify.breakpoint.smAndDown? 50 : '7vh'">
                      <span class="white--text headline" v-html="item.text_tpv ? item.text_tpv.charAt(0).toUpperCase() + item.text_tpv.charAt(1) : 'Ar'" />
                    </v-avatar>
                    <v-spacer />
                  </v-row>
                  <v-row dense class="pb-4">
                    <v-spacer />
                    <span class="body-2 text-uppercase product-text-tpv pb-4 primary--text" v-html="item.text_tpv" />
                    <v-spacer />
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-card-text>
    </CtCard>
  </v-content>
</template>

<script type="application/javascript">
import UnitList from "./UnitList"
import {mapActions} from "vuex"
import price from '../../mixins/price'
export default {
  name: "ProductList",
  components: {UnitList},
  mixins: [price],
  data: () => {
    return {
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      sortBy: 'text_tpv',
    }
  },

  computed: {
    products () {
      if (this.currentFamily) {
        return this.$store.state.product.products.filter((product) => product.id_taxonomy === this.$store.state.family.current_family)
      }

      return this.$store.state.product.products
    },

    stored_config () {
      return this.$store.state.global.config
    },

    current_ticket () {
      if (this.$store.state.ticket.current_ticket === 0) {
        return null
      }

      return this.$store.state.ticket.tickets.filter(ticket => ticket.id === this.$store.state.ticket.current_ticket)[0]
    },

    current_customer: {
      get() {
        if (! this.current_ticket) {
          return null
        }
        let current_customer = this.$store.state.customer.customers.filter(customer => customer.id === this.current_ticket.id_customer)
        if (!current_customer.length) {
          return null
        }

        return current_customer[0]
      },
      set(newValue) {
        return newValue
      },
    },

    currentFamily () {
      return this.$store.state.family.current_family
    },

    numberOfPages () {
      return Math.ceil(this.products.length / this.productsPerPage)
    },

    productsAddedToResolution () {
      return window.innerHeight > 750 ? window.innerHeight > 1000 ? 12 : 6 : 0
    },

    productsPerPage: {
      get() {
        return (this.$vuetify.breakpoint.smAndDown ? 6 : this.$vuetify.breakpoint.lgAndUp ? 18 : 12) + this.productsAddedToResolution
      },
      set(newValue) {
        return newValue
      },
    },
  },

  watch: {
    currentFamily() {
      this.page = 1
    },
  },

  mounted() {
    if (this.$vuetify.breakpoint.smAndDown) {
      document.getElementsByClassName('ct-card-content-product-list')[0].style.maxHeight = '52vh'
    } else {
      document.getElementsByClassName('ct-card-content-product-list')[0].style.maxHeight = '65vh'
    }
  },

  methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateproductsPerPage (number) {
      this.productsPerPage = number
    },

    addProductToTicker(product) {
      // Define current customer
      let current_customer = this.current_customer

      if (! current_customer) {
        current_customer = this.$store.state.customer.customers.filter(customer => customer.name.toLowerCase() === 'ventas contado' || customer.name.toLowerCase() === 'vendes comptat')[0]
      }
      if (! current_customer) {
        current_customer = this.$store.state.customer.customers.filter(customer => customer.id === 1 || customer.id === '1')[0]
      }
      if (! current_customer) {
        return false
      }

      // Set new ticket if have not current selected
      let currentTicketId = 0
      if (! this.current_ticket) {
        let lastTicket = this.$store.state.ticket.tickets[this.$store.state.ticket.tickets.length - 1]
        currentTicketId = parseInt(lastTicket.id) + 1
        this.$store.state.ticket.current_ticket = currentTicketId
        this.addTicket({
          id: currentTicketId,
          id_customer: current_customer.id,
          id_user: null,
          id_terminal: null,
          id_turn: null,

          // Payment parameters
          number: currentTicketId, // TODO
          irpf: current_customer.irpf,
          method_payment: current_customer.payment_method,
          discount_prompt_payment: current_customer.discount_prompt_payment,
          discount_customer: current_customer.discount_document,
          total: 0,

          // Number of customers related with ticket
          diners: current_customer.diners,

          // pending, paid_check, paid
          state: 'pending',

          // CSV sample: id_document,descripcio_article,grup,element,quantitat,numero_serie,lot,caducitat,preu,descompte,tipo_article,preu_fixe,referencia_article,referencia_client,formato,iva,ordre_entrada,recarrec,fecha,usuari,venedor,compta
          lines: [],

          // CSV Sample: codi,codi_factura,empresa,import,fecha,venciment,client,cobrat,fecha_cobro,codi_compte_ingres,modalitat_cobro,numero_efecte,usuari,tancat,caixa,id_torn
          receipt: [],

          create_date: new Date('now'),
          update_date: new Date('now'),
        })
      } else {
        // Reset pipe to others components when current ticket it's set
        currentTicketId = this.current_ticket.id
        this.$store.state.ticket.current_ticket = 0
      }

      this.$nextTick(() => {
        // It's reset pipe to update all components with current ticket dependency
        this.$store.state.ticket.current_ticket = currentTicketId
        if (! this.current_ticket) {
          return false
        }

        let currentTicketLineId = 1
        if (this.current_ticket.lines[this.current_ticket.lines.length - 1]) {
          currentTicketLineId = parseInt(this.current_ticket.lines[this.current_ticket.lines.length - 1].id_ticket_line) + 1
        }

        // Set new current ticket line
        this.current_ticket.lines.push({
          id_ticket_line: currentTicketLineId,
          id_attribute: null,
          id_user: null,

          // Used to determine with fields and how show
          type: null,

          description: product.text_tpv,
          quantity: this.$store.state.product.units,
          serial_number: null, // Technological identifier
          lot: null, // Nutrition identifier
          expiration: null, // It's a informative date
          cost: product.cost,
          price: product.total,
          iva: product.iva,
          surcharge: null,
          discount: current_customer.discount_product,

          reference: product.reference,
          reference_customer: null,

          ticket_complements: [], // TODO

          create_date: new Date('now'),
          update_date: new Date('now'),
        })

        // Set current ticket total
        this.current_ticket.total = this.totalTicketWithIva(this.current_ticket)

        // Set current units to one
        this.setUnits(1)

        console.log(this.current_ticket)
      })
    },

    ...mapActions('ticket', [
      'addTicket',
    ]),

    ...mapActions('product', [
      'setUnits',
    ]),
  },
}
</script>
<style>
  .product-text-tpv {
    max-height: 15px;
  }
</style>
