<template>
    <v-container>
        <CtCard title="Configuración inicial">
            <v-card-text>
                <v-row dense class="body-2">
                    <v-spacer />
                    <h1 class="body-1 text-uppercase text-center">Identificación fiscal de la empresa</h1>
                    <v-spacer />
                </v-row>
                <v-row dense class="body-2">
                    <v-spacer />
                    Estos datos saldrán en el tíquet.
                    <v-spacer />
                </v-row>
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
                <v-row dense>
                    <v-spacer />
                    <v-col cols="12" sm="3">
                        <v-switch v-model="model.turns" class="ma-4" label="Turnos" />
                    </v-col>
                    <v-col cols="12" sm="7" :class="{ 'body-2': true, 'mt-6': $vuetify.breakpoint.smAndUp }" v-if="model.turns">
                        Los turnos estarán habilitados. Se agruparán ventas y estadísticas junto a características extra.
                    </v-col>
                    <v-col cols="12" sm="7" :class="{ 'body-2': true, 'mt-6': $vuetify.breakpoint.smAndUp }" v-else>
                        Los turnos estarán deshabilitados
                    </v-col>
                    <v-spacer />
                </v-row>
                <v-row dense>
                    <v-spacer />
                    <v-col cols="12" sm="10">
                        <LayoutTPV :model="model.layout_tpv" />
                    </v-col>
                    <v-spacer />
                </v-row>
                <v-row dense>
                    <v-spacer />
                    <v-col cols="12" sm="10">
                        <ConfigTPV :model="model.config_tpv" />
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
import LayoutTPV from "../components/LayoutTPV";
import ConfigTPV from "../components/ConfigTPV";

export default {

    components: {ConfigTPV, Branding, TaxIdentification, LayoutTPV},

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
                turns: false,
                layout_tpv: {
                    distribution: '1-2x2',
                },
                config_tpv: {
                    // Actions
                    action: {
                        title: 'Acciones',
                        values: {
                            maximize: { value: true, label: 'Maximizar', description: 'Accionar el maximizado de la ventana.' },
                            open_money: { value: true, label: 'Cajón de monedas', description: 'Accionar la apertura del cajón de monedas.' },
                            exit: { value: true, label: 'Salir', description: 'Accionar la salida de la TPV.' },
                            refresh: { value: true, label: 'Refrescar', description: 'Accionar l\'actualización de la TPV.' },
                            alerts: { value: true, label: 'Alertas', description: 'Accionar el modal de las alertas.' },
                        },
                    },

                    // Ticket List
                    ticket: {
                        title: 'Listado de tickets',
                        values: {
                            show_closed: {value: true, label: 'Cerrados', description: 'Mostrar los últimos tíquets cerrados.'},
                            closed_number: {value: 10, type: 'number', label: 'Número de cerrados', description: ''},
                            name: {value: false, label: 'Nombre', description: 'Mostrar el nombre del cliente.'},
                            check: {value: false, label: 'Revisar', description: 'Mostrar el botón para revisar el tíquet después de cerrarlo.'},
                            collect: {value: true, label: 'Cobrar', description: 'Mostrar el botón de cobrar.'},
                            collect_direct: {value: true, label: 'Cobrar directamente', description: 'Mostrar el botón de cobrar directamente.'},
                            send_custom: {value: true, label: 'Enviar personalizado', description: 'Mostrar un checkbox al lado de cada tíquet para enviarlo.'},
                            delete: {value: true, label: 'Eliminar', description: 'Mostrar el botón para eliminar el tíquet.'}, // If hasn't ticket number
                        },
                    },

                    // Ticket Opened

                    ticket_opened: {
                        title: 'Ticket abierto',
                        values: {
                            save: {value: false, label: 'Guardar', description: 'Mostrar el botón de guardar.'},
                            close: {value: false, label: 'Cerrar', description: 'Mostrar el botón de cerrar.'},
                            save_close: {value: true, label: 'Guardar y cerrar', description: 'Mostrar el botón de guardar y cerrar.'},
                            total_price: {value: true, label: 'Precio total', description: 'Mostrar precio total.'},
                            send: {value: true, label: 'Enviar', description: 'Mostrar el botón de enviar.'},
                            delete: {value: true, label: 'Eliminar', description: 'Mostrar el botón de eliminar.'}, // If hasn't ticket number
                        },
                    },

                    // Ticket Opened - Customer
                    ticket_opened_customer: {
                        title: 'Ticket abierto - Cliente',
                        values: {
                            unfolded: {value: false, label: 'Desplegado', description: 'Desplegar de forma automática el cliente.'},
                            link: {value: true, label: 'Enlace', description: 'Mostrar botón para ir a la ficha entera del cliente.'},
                            update: {value: true, label: 'Modificación temporal', description: 'Habilitar la modificación temporal del cliente.'},
                            temporary_discount_product: {value: true, label: 'Descuento de producto', description: 'Habilitar la modificación temporal del descuento de producto.'},
                            temporary_discount_pay_soon: {value: true, label: 'Descuento pronto pago', description: 'Habilitar la modificación temporal del descuento pronto pago.'},
                            temporary_discount_customer: {value: true, label: 'Descuento de cliente', description: 'Habilitar la modificación temporal del descuento de cliente.'},
                            temporary_apply_zone_tax: {value: false, label: 'Impuestos por zona', description: 'Habilitar la aplicación de impuestos por zona.'},
                            temporary_apply_equivalence_surcharge: {value: false, label: 'Recargo de equivalencia', description: 'Habilitar la aplicación del recargo de equivalencia.'},
                            temporary_apply_irpf: {value: false, label: 'IRPF', description: 'Habilitar la aplicación del IRPF.'},
                            temporary_apply_rate: {value: '1', type: 'select', options: ['1', '2', '3', '4'], label: 'Tarifa', description: 'Modificar la tarifa aplicada.'}, // Select customizable
                            temporary_save: {value: true, label: 'Guardar', description: 'Mostrar el botón para guardar los canvios en la ficha del cliente.'},
                        },
                    },

                    // Ticket - Lines
                    ticket_line: {
                        title: 'Tickets - Línea',
                        values: {
                            discount: {value: true, label: 'Descuento', description: 'Mostrar la columna de descuento.'},
                            unit_price: {value: true, label: 'Precio unidad', description: 'Mostrar la columna de precio unidad.'},
                            unit: {value: true, label: 'Unidad', description: 'Mostrar la columna de unidades.'},
                            total_price: {value: true, label: 'Precio total', description: 'Mostrar la columna de precio total.'},
                            complements: {value: true, label: 'Complementos', description: 'Mostrar el botón de complementos.'},
                            delete: {value: true, label: 'Eliminar', description: 'Mostrar el botón de eliminar.'}, // If hasn't ticket number
                            send: {value: false, label: 'Enviar', description: 'Mostrar el botón de enviar.'},
                        },
                    },

                    // Families
                    family: {
                        title: 'Familias',
                        values: {
                            image: {value: true, label: 'Imagen', description: 'Mostrar imagen'},
                            image_size: {value: 'md', type: 'select', options: ['s', 'sm', 'md', 'lg'], label: 'Tamaño de la imagen', description: ''}, // Select s, sm, md, lg
                            text: {value: true, label: 'Texto', description: 'Mostrar texto'},
                            text_size: {value: 'md', type: 'select', options: ['s', 'sm', 'md', 'lg'], label: 'Tamaño del texto', description: ''}, // Select s, sm, md, lg
                        },
                    },

                    // Feature
                    feature: {
                        title: 'Características',
                        values: {
                            text_size: {value: 'md', type: 'select', options: ['s', 'sm', 'md', 'lg'], label: 'Tamaño del texto', description: ''}, // Select s, sm, md, lg
                        },
                    },

                    // Quantities
                    quantities: {
                        title: 'Cantidades',
                        values: {
                            unfolded: {value: false, label: 'Desplegadas', description: 'Desplegar de forma automática las cantidades.'},
                            linear: {value: true, label: 'Lineal', description: 'Mostrar las cantidades de forma lineal.'},
                        },
                    },

                    // Search
                    search: {
                        title: 'Búsqueda',
                        values: {
                            show: {value: true, label: 'Mostrar', description: 'Mostrar el buscador'},
                        },
                    },

                    // Product List
                    product: {
                        title: 'Listado de productos',
                        values: {
                            show_price: {value: false, label: 'Precio', description: 'Mostrar el precio.'},
                            image: {value: true, label: 'Imagen', description: 'Mostrar la imagen.'},
                            image_size: {value: 'md', type: 'select', options: ['s', 'sm', 'md', 'lg'], label: 'Tamaño de la imgen', description: ''}, // Select s, sm, md, lg
                            text: {value: true, label: 'Texto', description: 'Mostrar el texto.'},
                            text_size: {value: 'md', type: 'select', options: ['s', 'sm', 'md', 'lg'], label: 'Tamaño del texto', description: ''}, // Select s, sm, md, lg
                        },
                    },

                    // Barcode
                    barcode: {
                        title: 'Código de barras',
                        values: {
                            show: {value: false, label: 'Mostrar', description: 'Mostrar la búsqueda por código de barras.'},
                        },
                    },

                    // Dining rooms
                    dining_room: {
                        title: 'Comedores',
                        values: {
                            show: {value: false, label: 'Mostrar', description: 'Mostrar los comedores.'},
                        },
                    },
                },
                // Turns
                config_turns: {
                    title: 'Turnos',
                    values: {
                        text_size: { value: 'md', label: 'Tamaño del texto', description: '' }, // Select s, sm, md, lg
                        description: { value: true, label: 'Descripción', description: 'Mostrar la descripción' },
                    },
                },
                // SMTP
                smtp: {
                    title: 'SMTP',
                    values: {
                        host: { value: '', label: 'Servidor', description: 'Url del servidor de correo' },
                        user: { value: '', label: 'Usuario', description: 'Usuario del servidor' },
                        password: { value: '', label: 'Password', description: 'Password del usuario del servidor' },
                        port: { value: '', label: 'Puerto', description: '' },
                        type_encryption: { value: '', label: 'Encriptación', description: '' },
                        email_equal_user: { value: true, label: 'Correo igual a usuario', description: 'El correo tiene el mismo usuario que el del servidor.' },
                        email: { value: '', label: 'Correo electrónico', description: '' },
                        email_password_equal_user: { value: true, label: 'Password del correo igual al password', description: 'El password del correo es igual que el del servidor.' },
                        email_password: { value: '', label: 'Password correo', description: '' },
                    },
                },
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
