<template>
  <!-- LIST -->
  <v-row class="ct-card-content-unit-list pt-0 pb-0">
    <v-col
            v-for="number in numbers"
            :key="number"
            cols="12"
            sm="3"
            md="2"
            lg="1"
            class="text-center"
            @click="currentNumber = number"
    >
      <v-card class="pa-4 mt-4" :elevation="currentNumber === number ? 5 : 1" style="cursor: pointer">
        <span v-html="number" :class="{ 'primary--text': currentNumber === number, 'secondary--text': currentNumber !== number, 'display-1': true }" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script type="application/javascript">
  import { mapActions } from 'vuex'
export default {
  name: "UnitList",
  data: () => {
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      currentNumber: 1,
    }
  },

  computed: {
    stored_config () {
      return this.$store.state.global.config
    },
  },

  watch: {
    currentNumber(newValue) {
      this.setUnits(newValue)
    },
  },

  mounted() {
    this.currentNumber = this.$store.state.product.units
  },

  methods: {
    ...mapActions('product', [
      'setUnits',
    ]),
  },
}
</script>
<style>
  .ct-card-content-family-list {
    max-height: 59vh;
  }
</style>
