<template>
  <div>
    <v-row dense>
      <v-col cols="12" sm="6">
        <CtTextField v-model="model.tax_name" label="Nombre fiscal" />
      </v-col>
      <v-col cols="12" sm="6">
        <CtTextField v-model="model.tax_identification" label="Identificación fiscal (NIF o DNI)" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <CtTextField v-model="model.address" label="Dirección" />
      </v-col>
      <v-col cols="12" sm="6">
        <CtTextField v-model="model.postal_code" label="Código postal" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <CtTextField v-model="model.city" label="Poblacion" />
      </v-col>
      <v-col cols="12" sm="6">
        <CtTextField v-model="model.province" label="Provincia" />
      </v-col>
    </v-row>
  </div>
</template>

<script type="application/javascript">
export default {
  name: "TaxIdentification",

  props: {
    'model': {
      type: Object,
      required: true,
    },
  },
}
</script>
