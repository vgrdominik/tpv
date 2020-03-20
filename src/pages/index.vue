<template>
  <v-container fluid id="main-content">
    <v-row dense>
      <v-col cols="12" md="3">
        <CtCard :type="stored_config.branding.style.card" :title="tickets.title" dense class="fill-height">
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                Tests
              </v-col>
            </v-row>
          </v-card-text>
        </CtCard>
      </v-col>
      <v-col cols="12" md="9">
        <v-expansion-panels v-model="panel" accordion>
          <v-expansion-panel>
            <v-expansion-panel-header class="primary--text pt-0 pb-0">Familias</v-expansion-panel-header>
            <v-expansion-panel-content>
              <FamilyList />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="primary--text pt-0 pb-0">Unidades</v-expansion-panel-header>
            <v-expansion-panel-content>
              <UnitList class="pb-12" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <ProductList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import FamilyList from "../components/family/FamilyList";
import ProductList from "../components/product/ProductList";
import UnitList from "../components/product/UnitList";

export default {
  components: {UnitList, FamilyList, ProductList},
  data() {
    return {
      tickets: {
        title: 'Tíquets',
      },
      panel: 0,
    }
  },

  computed: {
    stored_config () {
      return this.$store.state.global.config
    }
  },

  mounted() {
    if (this.$vuetify.breakpoint.smAndDown) {
      this.panel = false
    }
    this.setIsContainerNeeded(false)
  },

  methods: {
    ...mapActions('global', [
      'setIsContainerNeeded',
    ]),
  },
}
</script>
<style>
#main-content .v-expansion-panel-header {
  height: 35px;
  max-height: 35px;
  min-height: 35px;
}
#main-content .v-expansion-panel--active > .v-expansion-panel-header {
  height: 35px;
  max-height: 35px;
  min-height: 35px;
}
</style>
