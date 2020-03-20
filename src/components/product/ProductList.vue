<template>
  <CtCard
          :type="stored_config.branding.style.card"
          fluid
          :title="this.$store.state.family.current_family ? this.$store.state.family.families.filter((family) => family.id === this.$store.state.family.current_family)[0].text_tpv : 'Productos'"
          dense
          class="mt-2">
    <!-- HEADER -->
    <template v-slot:leftTitleContent>
      <CtTextField
              v-model="search"
              clearable
              dark
              flat
              solo-inverted
              hide-details
              class="ml-3"
              label="Buscador" />
      <v-spacer />
    </template>
    <template v-slot:rightTitleContent v-if="$vuetify.breakpoint.mdAndUp">
      <v-spacer />
      <v-col cols="2">
        <CtSelect
                v-model="sortBy"
                flat
                dark
                solo-inverted
                hide-details
                :items="keys"
                item-value="value"
                item-text="name"
                label="Ordenado por" />
      </v-col>
      <v-btn-toggle v-model="sortDesc" mandatory dense>
        <CtBtn :type="stored_config.branding.style.button" color="primary" :value="false">
          <v-icon>mdi-arrow-up</v-icon>
        </CtBtn>
        <CtBtn :type="stored_config.branding.style.button" color="primary" :value="true">
          <v-icon>mdi-arrow-down</v-icon>
        </CtBtn>
      </v-btn-toggle>
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
              <v-card>
                <v-row dense class="pt-4">
                  <v-spacer />
                  <v-avatar v-if="item.img" width="100" height="100">
                    <v-img
                            :src="require('../../assets/product/barRestaurant/' + item.img)"
                            class="my-3"
                    />
                  </v-avatar>
                  <v-avatar v-else color="secondary" width="100" height="100">
                    <span class="white--text headline" v-html="item.text_tpv ? item.text_tpv.charAt(0).toUpperCase() + item.text_tpv.charAt(1) : 'Ar'" />
                  </v-avatar>
                  <v-spacer />
                </v-row>
                <v-row dense class="pb-4">
                  <v-spacer />
                  <span class="body-2 text-uppercase product-text-tpv pb-4" v-html="item.text_tpv" />
                  <v-spacer />
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer>
          <v-row class="mt-3 ml-2 mr-2" align="center" justify="center">
            <span class="grey--text">Productos por página</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                        dark
                        text
                        color="primary"
                        class="ml-2"
                        v-on="on"
                >
                  {{ productsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                        v-for="(number, index) in productsPerPageArray"
                        :key="index"
                        @click="updateproductsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer />

            <v-col dense class="body-1 text-uppercase pa-2" v-if="$vuetify.breakpoint.smAndUp">
              <v-spacer />
              Frase del día
              <v-spacer />
            </v-col>

            <v-spacer />

            <span
                    class="mr-4
              grey--text"
            >
              Página {{ page }} de {{ numberOfPages }}
            </span>
            <v-btn
                    fab
                    dark
                    color="primary"
                    class="mr-1"
                    @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
                    fab
                    dark
                    color="primary"
                    class="ml-1"
                    @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-card-text>
  </CtCard>
</template>

<script type="application/javascript">
export default {
  name: "ProductList",
  data: () => {
    return {
      productsPerPageArray: [12, 18],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      productsPerPage: 18,
      sortBy: 'text_tpv',
      keys: [
        { name: 'Nombre', value: 'text_tpv' },
        { name: 'Precio', value: 'pvp' },
      ],
    }
  },

  computed: {
    products () {
      if (this.$store.state.family.current_family) {
        return this.$store.state.product.products.filter((product) => product.id_taxonomy === this.$store.state.family.current_family)
      }

      return this.$store.state.product.products
    },

    stored_config () {
      return this.$store.state.global.config
    },

    numberOfPages () {
      return Math.ceil(this.products.length / this.productsPerPage)
    },
  },

  mounted() {
    if (this.$vuetify.breakpoint.smAndDown) {
      document.getElementsByClassName('ct-card-content-product-list')[0].style.maxHeight = '52vh'
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
  },
}
</script>
<style>
  .ct-card-content-product-list {
    max-height: 59vh;
  }
  .product-text-tpv {
    max-height: 15px;
  }
</style>
