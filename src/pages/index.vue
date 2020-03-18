<template>
  <CtCard title="Home" width="600" class="mx-auto">
    <v-row dense>
      <CtBtn color="primary" to="/registro" class="mt-4 mx-auto">
        Registro gratuito
      </CtBtn>
    </v-row>
  </CtCard>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  mounted() {
    this.setIsContainerNeeded(true)
  },

  methods: {
    ...mapActions('global', [
      'setIsContainerNeeded',
    ]),
  },
}
</script>
