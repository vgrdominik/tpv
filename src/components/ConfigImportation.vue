<template>
  <div>
    <!-- Config TPV -->
    <v-row dense>
      <v-col cols="12" sm="8" class="body-2 justify-center">
        <CtBtn :type="stored_config.branding.style.button" color="secondary" @click="show_config_tpv = ! show_config_tpv">Configuración Importaciones</CtBtn> (Click para mostrar/ocultar)
      </v-col>
    </v-row>

    <v-row dense v-if="show_config_tpv">
      <v-col cols="12">
        La carpeta seleccionada en el anterior apartado, "Directorio de importación", determina donde se deben poner los ficheros a importar. Estos son products.csv, families.csv y tickets.csv (Productos, familias y tíquets respectivamente).<br>
        Al poner los ficheros a importar en dicha carpeta se recopilan sus cabeceras y se exponen en el siguiente apartado para que especifiques a qué campos corresponden.
      </v-col>
    </v-row>

    <!-- Config TPV Actions -->
    <template v-if="show_config_tpv">
      <template v-for="domain in model.domain">
        <v-row dense :key="domain.title">
          <v-row dense>
            <v-spacer />
            <v-col cols="12" lg="3">
              <v-row dense class="body-1 text-uppercase">
                <v-spacer />
                {{ domain.title }}
                <v-spacer />
              </v-row>
            </v-col>
            <v-spacer />
          </v-row>
        </v-row>
        <v-row dense :key="domain.title + '-refresh'">
          <v-col cols="12" class="text-center">
            <CtBtn :type="stored_config.branding.style.button" color="primary">
              <font-awesome-icon :icon="['fas', 'sync-alt']"/>
              <span class="ml-3">Actualizar cabeceras</span>
            </CtBtn>
          </v-col>
        </v-row>
        <v-row dense :key="domain.title + '-titles'">
          <v-col cols="12" lg="4" class="text-center body-2 text-uppercase">
            Campo
          </v-col>
          <v-col cols="12" lg="4" class="text-center body-2 text-uppercase">
            Columna del fichero
          </v-col>
          <v-col cols="12" lg="4" class="text-center body-2 text-uppercase">
            Descripción
          </v-col>
        </v-row>
        <v-row dense v-for="field in domain.fields" :key="domain.title + field.label">
          <v-col cols="12" lg="4">
            <v-row dense>
              <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
              <CtTextField v-model="field.name" readonly :ctType="stored_config.branding.style.form" class="ma-4" :label="field.label + '(' + field.type + ')'" />
              <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
            </v-row>
          </v-col>
          <v-col cols="12" lg="4">
            <v-row dense>
              <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
              <CtSelect v-model="domain.fields_columns[field.name]" :ctType="stored_config.branding.style.form" class="ma-4" :items="domain.columns" item-value="name" item-text="name" label="Columna del fichero" />
              <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
            </v-row>
          </v-col>
          <v-col cols="12" lg="4" :class="{ 'body-2': true, 'mt-4': $vuetify.breakpoint.smAndUp }">
            <v-row dense>
              <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
              {{ field.description }}
              <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
            </v-row>
          </v-col>
        </v-row>
      </template>
    </template>
  </div>
</template>

<script type="application/javascript">
import CtTextField from "../globalComponents/CtTextField";
export default {
  name: "ConfigImportation",
  components: {CtTextField},
  props: {
    'model': {
      type: Object,
      required: true,
    },
  },

  data: () => {
    return {
      show_config_tpv: false,
    }
  },

  computed: {
    stored_config () {
      return this.$store.state.global.config
    }
  },
}
</script>
