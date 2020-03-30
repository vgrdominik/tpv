<template>
  <div>
    <!-- Config TPV -->
    <v-row dense>
      <v-col cols="12" class="body-2 justify-center">
        <CtBtn :type="stored_config.branding.style.button" color="secondary" @click="show_advanced = ! show_advanced">Ficha del cliente</CtBtn> (Click para mostrar/ocultar)
      </v-col>
    </v-row>

    <!-- Config TPV Actions -->
    <template v-if="show_advanced">
      <v-row dense>
        <div class="title">Ficha de cliente</div>
        Los datos modificados en esta ficha son permanentes.
      </v-row>
      <v-row dense v-for="customer_field in stored_config.import.domain.customer.fields" :key="'customerField' + customer_field.label">
        <v-col cols="12" lg="6">
          <v-row dense>
            <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
            <CtTextField v-model="customer[customer_field.name]" :ctType="stored_config.branding.style.form" class="ma-4" :label="customer_field.label" v-if="customer_field.type === 'string'" />
            <CtTextField v-model="customer[customer_field.name]" :ctType="stored_config.branding.style.form" class="ma-4" :label="customer_field.label" type="number" v-else-if="customer_field.type === 'number' || customer_field.type === 'integer' || customer_field.type === 'int' || customer_field.type === 'float'" />
            <CtSelect v-model="customer[customer_field.name]" :ctType="stored_config.branding.style.form" class="ma-4" :items="customer_field.options" :label="customer_field.label" v-else-if="customer_field.type === 'select'" />
            <v-switch v-model="customer[customer_field.name]" class="ma-4" :label="customer_field.label" v-else />
            <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
          </v-row>
        </v-col>
        <v-col cols="12" lg="6" :class="{ 'body-2': true, 'mt-6': $vuetify.breakpoint.smAndUp }">
          <v-row dense>
            <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
            {{ customer_field.description }}
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
    'customer': {
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
