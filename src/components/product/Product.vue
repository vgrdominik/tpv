<template>
  <!-- PRODUCT CARD -->
  <v-card
          :loading="loading"
          class="mx-auto my-12"
          max-width="374"
  >
    <v-img
            height="250"
            :src="require('../../assets/product/barRestaurant/' + product.img)"
    ></v-img>

    <v-card-title v-html="product.name" />

    <v-card-text>
      <v-row
              align="center"
              class="mx-0"
      >
        <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 subtitle-1">
        {{ price(product.total) }} • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
              v-model="selection"
              active-class="deep-purple accent-4 white--text"
              column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
              color="deep-purple lighten-2"
              text
              @click="addProductToTicket(product)"
      >
        Añadir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script type="application/javascript">
import price from '../../mixins/price'
import ticket from '../../mixins/ticket'
export default {
  name: "Product",

  mixins: [price, ticket],

  props: {
    'product': {
      type: Object,
      required: true,
    },
  },

  data: () => {
    return {
      loading: false
    }
  },

  computed: {
    stored_config () {
      return this.$store.state.global.config
    },
  },

  watch: {
  },

  mounted() {
  },

  methods: {
  },
}
</script>
