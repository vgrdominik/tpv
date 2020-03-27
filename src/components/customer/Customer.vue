<template>
  <div>
    <!-- Config TPV -->
    <v-row dense>
      <v-col cols="12" sm="8" class="body-2 justify-center">
        <CtBtn :type="stored_config.branding.style.button" color="secondary" @click="show_advanced = ! show_advanced">Ficha del cliente</CtBtn> (Click para mostrar/ocultar)
      </v-col>
    </v-row>

    <!-- Config TPV Actions -->
    <template v-if="show_advanced">
      <v-row dense>
        <div class="title">Ficha de cliente</div>
        Los datos modificados en esta ficha son permanentes.
      </v-row>
      <v-row dense v-for="customer_fields in stored_config.import.domain.customer.fields" :key="'customerField' + customer_fields.label">
        <v-spacer />
        <v-col cols="12" lg="3">
          <v-row dense>
            <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
            <CtTextField v-model="config.value" :ctType="stored_config.branding.style.form" class="ma-4" :label="config.label" type="number" v-if="config.type === 'number'" />
            <CtSelect v-model="config.value" :ctType="stored_config.branding.style.form" class="ma-4" :items="config.options" :label="config.label" v-else-if="config.type === 'select'" />
            <v-switch v-model="config.value" class="ma-4" :label="config.label" v-else />
            <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
          </v-row>
        </v-col>
        <v-col cols="12" lg="6" :class="{ 'body-2': true, 'mt-6': $vuetify.breakpoint.smAndUp }">
          <v-row dense>
            <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
            {{ config.description }}
            <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
          </v-row>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script type="application/javascript">
export default {
  name: "Customer",
  props: {
    'model': {
      type: Object,
      required: true,
    },
  },

  data: () => {
    return {
      show_advanced: false,

      default_fields_to_show: [],
    }
  },

  computed: {
    stored_config () {
      return this.$store.state.global.config
    }
  },
}
</script>
