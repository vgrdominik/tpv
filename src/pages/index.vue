<template>
    <v-container>
        <CtCard title="Configuración inicial">
            <v-card-text>
                <v-row dense>
                    <v-spacer />
                    <v-col cols="12" sm="10">
                        <TaxIdentification :model="model.tax_identification" />
                    </v-col>
                    <v-spacer />
                </v-row>
                <v-row dense>
                    <v-spacer />
                    <v-col cols="12" sm="10">
                        <Branding :model="model.branding" />
                    </v-col>
                    <v-spacer />
                </v-row>
                <v-row dense>
                    <v-spacer />
                    <v-col cols="12" sm="3">
                        <v-switch v-model="model.customers" class="ma-4" label="Clientes" />
                    </v-col>
                    <v-col cols="12" sm="7" :class="{ 'body-2': true, 'mt-6': $vuetify.breakpoint.smAndUp }" v-if="model.customers">
                        Saldrán listas de clientes y podrás modificar el cliente de los tíquets.
                    </v-col>
                    <v-col cols="12" sm="7" :class="{ 'body-2': true, 'mt-6': $vuetify.breakpoint.smAndUp }" v-else>
                        El cliente siempre será ventas contado.
                    </v-col>
                    <v-spacer />
                </v-row>
            </v-card-text>
        </CtCard>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
import TaxIdentification from "../components/TaxIdentification";
import Branding from "../components/Branding";

export default {

    components: {Branding, TaxIdentification},

    data() {
        return {
            model: {
                tax_identification: {
                    tax_name: null,
                    tax_identification: null,
                    address: null,
                    postal_code: null,
                    city: null,
                    province: null,
                },
                branding: {
                    color_palette: {
                        primary: '#267699',
                        secondary: '#70B0CC',
                        accent: '#FF877A',
                        success: '#4CAF50',
                        error: '#FF5252',
                        warning: '#FFC107',
                        info: '#D19BA3',
                    },
                    style: {
                        button: 'text',
                        form: 'outlined',
                        card: 'shaped',
                        dialog_card: 'shaped',
                    },
                },
                customers: false,
            },
        }
    },

    mounted() {
        this.setIsContainerNeeded(true)
    },

    beforeDestroy() {
    },

    methods: {
        ...mapActions('global', [
            'setIsContainerNeeded',
        ]),
    },
}
</script>
