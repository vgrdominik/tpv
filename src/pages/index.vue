<template>
  <v-container fluid >
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
        <CtCard :type="stored_config.branding.style.card" title="Familias" dense>
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                Test
              </v-col>
            </v-row>
          </v-card-text>
        </CtCard>
        <CtCard :type="stored_config.branding.style.card" title="Productos" dense class="mt-2">
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                Test
              </v-col>
            </v-row>
          </v-card-text>
        </CtCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  data() {
    return {
      tickets: {
        title: 'Tíquets',
      }
    }
  },

  computed: {
    stored_config () {
      return this.$store.state.global.config
    }
  },

  mounted() {
    this.setIsContainerNeeded(false)
  },

  methods: {
    ...mapActions('global', [
      'setIsContainerNeeded',
    ]),
  },
}
</script>
