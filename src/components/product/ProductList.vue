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
import UnitList from "./UnitList";
import {mapActions} from "vuex";
export default {
  name: "ProductList",
  components: {UnitList},
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
    }
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
      if (! this.current_ticket) {
        this.$store.state.ticket.current_ticket = this.$store.state.ticket.tickets.filter(ticket => ticket.name.toLowerCase() === 'ventas contado' || ticket.name.toLowerCase() === 'vendes comptat')[0].id
      }
      if (! this.current_ticket) {
        this.$store.state.ticket.current_ticket = this.$store.state.ticket.tickets.filter(ticket => ticket.id === 1 || ticket.id === '1')[0].id
      }
      if (! this.current_ticket) {
        return false
      }

      this.current_ticket.lines.push({
        id_ticket_line: parseInt(this.current_ticket.lines[this.current_ticket.lines.length].id_ticket_line) + 1,
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
        discount: null,

        reference: product.reference,
        reference_customer: null,

        // CSV Sample: id,id_linea (ordre_entrada de Tiquets2),quantitat,complemento,iva,import
        ticket_complements: [
          {
            id_ticket_line: null,

            id_complement: null,

            // Same structure as ticket_line
            description: null,
            quantity: null,
            serial_number: null, // Technological identifier
            lot: null, // Nutrition identifier
            expiration: null, // It's a informative date
            cost: null,
            price: null,
            iva: null,
            surcharge: null,
            discount: null,

            reference: null,
            reference_customer: null,
          }
        ],

        create_date: new Date('now'),
        update_date: new Date('now'),
      })

      this.setUnits(1)
    },

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
