export const state = () => ({
  is_container_needed: '',
  config: {
    initialized: false,

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

    // Default config data. Updated by stored file config
    config_tpv: {
      // Actions
      action: {
        maximize: true,
        open_money: false,
        exit: true,
        refresh: true,
        alerts: true,
      },

      // Ticket List
      ticket: {
        show_closed: true,
        closed_number: 10,
        name: false,
        check: false,
        collect: true,
        collect_direct: true,
        send_custom: true,
        delete: true,
      },

      // Ticket Opened
      ticket_opened: {
        save: false,
        close: false,
        save_close: true,
        total_price: true,
        send: true,
        delete: true,
      },

      // Ticket Opened - Customer
      ticket_opened_customer: {
        unfolded: false,
        link: true,
        update: true,
        temporary_discount_product: true,
        temporary_discount_pay_soon: true,
        temporary_discount_customer: true,
        temporary_apply_zone_tax: false,
        temporary_apply_equivalence_surcharge: false,
        temporary_apply_irpf: false,
        temporary_apply_rate: '1',
        temporary_save: true,
      },

      // Ticket - Lines
      ticket_line: {
        discount: true,
        unit_price: true,
        unit: true,
        total_price: true,
        complements: true,
        delete: true,
        send: false,
      },

      // Families
      family: {
        image: true,
        image_size: 'md',
        text: true,
        text_size: 'md',
      },

      // Feature
      feature: {
          text_size: 'md',
      },

      // Quantities
      quantities: {
        unfolded: false,
        linear: true,
      },

      // Search
      search: {
        show: true,
      },

      // Product List
      product: {
        show_price: false,
        image: true,
        image_size: 'md',
        text: true,
        text_size: 'md',
      },

      // Barcode
      barcode: {
        show: false,
      },

      // Dining rooms
      dining_room: {
        show: false,
      }
    },

    // Turns
    config_turns: {
      text_size: 'md',
      description: true,
    },

    // SMTP
    smtp: {
        host: '',
        user: '',
        password: '',
        port: '587',
        type_encryption: 'TLS',
        email_equal_user: true,
        email: '',
        email_password_equal_user: true,
        email_password: '',
    },

    // Directories
    data_dir: { name: 'data', path: 'app://data' }, // default -> { name: 'data', path: 'app://./data' }
    import_dir: { name: 'import_data', path: 'app://import_data' }, // default -> { name: 'import_data', path: 'app://./import_data' }

    // Import
    import: {
      type: 'csv', // Currently only support csv. Api support soon.

      domain: {
        product: {
          fields: [
            {
              name: 'id',
              type: 'int',
            },
            {
              name: 'id_taxonomy',
              type: 'int',
            },
            {
              name: 'iva',
              type: 'float',
            },
            {
              name: 'ids_send_to',
              type: 'array',
            },
            {
              name: 'name',
              type: 'string',
            },
            {
              name: 'cost',
              type: 'float',
            },
            {
              name: 'base',
              type: 'float',
            },
            {
              name: 'total',
              type: 'float',
            },
            {
              name: 'reference',
              type: 'string',
            },
            {
              name: 'img',
              type: 'string',
            },
            {
              name: 'text_tpv',
              type: 'string',
            },
          ],

          columns: [
            'Codigo',
            'Codigo familia',
            'IVA',
            'Enviar a',
            'Descripcion',
            'Coste',
            'Base',
            'PVP',
            'Referencia',
            'Imagen',
            'Texto boton TPV',
          ],

          fields_columns: {
            id: 'Codigo',
            id_taxonomy: 'Codigo familia',
            iva: 'IVA',
            ids_send_to: 'Enviar a',
            name: 'Descripcion',
            cost: 'Coste',
            base: 'Base',
            total: 'PVP',
            reference: 'Referencia',
            img: 'Imagen',
            text_tpv: 'Texto boton TPV',
          },
        },

        family: {
          fields: [
            {
              name: 'id',
              type: 'int',
            },
            {
              name: 'img',
              type: 'string',
            },
            {
              name: 'text_tpv',
              type: 'string',
            },
          ],

          columns: [
            'id_familia',
            'descripcio',
            'de',
            'foto',
            'mostrar_text',
            'cos',
            'orden',
            'color_fons',
            'color_lletra',
            'borde_gruix',
            'borde_tipus',
            'border_color',
            'borde_radius',
          ],

          fields_columns: {
            id: 'id_familia',
            img: 'foto',
            text_tpv: 'descripcio',
          },
        },

        ticket: {

          fields: [
            {name: "id", type: 'int'},
            {name: "id_customer", type: 'int'},
            {name: "id_user", type: 'int'},
            {name: "id_terminal", type: 'int'},
            {name: "id_turn", type: 'int'},

            // Payment parameters
            {name: "number", type: 'int'},
            {name: "irpf", type: 'float'},
            {name: "method_payment", type: 'string'},
            {name: "discount_prompt_payment", type: 'float'},
            {name: "discount_customer", type: 'float'},
            {name: "total", type: 'float'},

            // Number of customers related with ticket
            {name: "diners", type: 'int'},

            // pending, paid_check, paid
            {name: "state", type: 'string'},

            {name: "create_date", type: 'Date'},
            {name: "update_date", type: 'Date'},
          ],

          columns: [
            'id',
            'client',
            'fecha',
            'numero_document',
            'irpf',
            'forma_pagament',
            'total',
            'descompte_pp',
            'descompte_client',
            'estat',
            'usuari',
            'comensales',
            'hora',
            'id_terminal',
            'id_turno',
          ],

          fields_columns: {
            id: 'id',
            id_customer: 'client',
            id_user: 'usuari',
            id_terminal: 'id_terminal',
            id_turn: 'id_turno',

            // Payment parameters
            number: 'numero_document',
            irpf: 'irpf',
            method_payment: 'forma_pagament',
            discount_prompt_payment: 'descompte_pp',
            discount_customer: 'descompte_client',
            total: 'total',

            // Number of customers related with ticket
            diners: 'comensales',

            // pending, paid_check, paid
            state: 'estat',

            create_date: 'fecha',
            update_date: null,
          },
        },

        ticket_line: {
          fields: [
            {name: "id_ticket", type: 'int'},
            {name: "id_line", type: 'int'},
            {name: "id_attribute", type: 'int'},
            {name: "id_user", type: 'int'},

            // Used to determine with fields and how show
            {name: "type", type: 'string'},

            {name: "description", type: 'string'},
            {name: "quantity", type: 'float'},
            {name: "serial_number", type: 'string'}, // Technological identifier
            {name: "lot", type: 'string'}, // Nutrition identifier
            {name: "expiration", type: 'string'}, // It's a informative date
            {name: "cost", type: 'float'},
            {name: "price", type: 'float'},
            {name: "iva", type: 'float'},
            {name: "surcharge", type: 'float'},
            {name: "discount", type: 'float'},

            {name: "reference", type: 'string'},
            {name: "reference_customer", type: 'string'},

            {name: "create_date", type: 'Date'},
            {name: "update_date", type: 'Date'},
          ],

          columns: [
            'id_document',
            'descripcio_article',
            'grup',
            'element',
            'quantitat',
            'numero_serie',
            'lot',
            'caducitat',
            'preu',
            'descompte',
            'tipo_article',
            'preu_fixe',
            'referencia_article',
            'referencia_client',
            'formato',
            'iva',
            'ordre_entrada',
            'recarrec',
            'fecha',
            'usuari',
            'venedor',
            'compta',
          ],

          fields_columns: {
            id_ticket: 'id_document',

            id_line: null,
            id_attribute: null,
            id_user: 'usuari',

            // Used to determine with fields and how show
            type: 'tipo_article',

            description: 'descripcio_article',
            quantity: 'quantitat',
            serial_number: 'numero_serie', // Technological identifier
            lot: 'lot', // Nutrition identifier
            expiration: 'caducitat', // It's a informative date
            cost: 'preu_fixe',
            price: 'preu',
            iva: 'iva',
            surcharge: 'recarrec',
            discount: 'descompte',

            reference: 'referencia_article',
            reference_customer: 'referencia_client',

            create_date: 'fecha',
            update_date: null,
          },
        },

        ticket_complement: {
          fields: [
            {name: "id_ticket_line", type: 'int'},

            {name: "id_complement", type: 'int'},

            // Same structure as ticket_line
            {name: "description", type: 'string'},
            {name: "quantity", type: 'float'},
            {name: "serial_number", type: 'string'}, // Technological identifier
            {name: "lot", type: 'string'}, // Nutrition identifier
            {name: "expiration", type: 'string'}, // It's a informative date
            {name: "cost", type: 'float'},
            {name: "price", type: 'float'},
            {name: "iva", type: 'float'},
            {name: "surcharge", type: 'float'},
            {name: "discount", type: 'float'},

            {name: "reference", type: 'string'},
            {name: "reference_customer", type: 'string'},

            {name: "create_date", type: 'Date'},
            {name: "update_date", type: 'Date'},
          ],

          columns: [
            'id',
            'id_linea',
            'quantitat',
            'complemento',
            'iva',
            'import',
          ],

          fields_columns: {
            id_ticket_line: 'id_linea',

            id_complement: 'id',

            // Same structure as ticket_line
            description: 'complemento',
            quantity: 'quantitat',
            serial_number: null, // Technological identifier
            lot: null, // Nutrition identifier
            expiration: null, // It's a informative date
            cost: null,
            price: 'import',
            iva: 'iva',
            surcharge: null,
            discount: null,

            reference: null,
            reference_customer: null,

            create_date: 'fecha',
            update_date: null,
          },
        },

        ticket_receipt: {
          fields: [
            {name: "id_ticket", type: 'int'},

            // receipt
            {name: "id", type: 'int'},
            {name: "id_invoice", type: 'int'},
            {name: "id_user", type: 'int'},
            {name: "id_income_account", type: 'int'},

            {name: "number", type: 'int'},
            {name: "collection_method", type: 'string'}, // cash, card, transfer, paypal, bizum, other
            {name: "paid", type: 'float'}, // Float/Boolean
            {name: "total", type: 'float'},

            {name: "paid_date", type: 'Date'},
            {name: "expiration_date", type: 'Date'},
            {name: "create_date", type: 'Date'},
            {name: "update_date", type: 'Date'},
          ],

          columns: [
            'codi',
            'codi_factura',
            'empresa',
            'import',
            'fecha',
            'venciment',
            'client',
            'cobrat',
            'fecha_cobro',
            'codi_compte_ingres',
            'modalitat_cobro',
            'numero_efecte',
            'usuari',
            'tancat',
            'caixa',
            'id_torn',
          ],

          fields_columns: {
            id_ticket: 'codi_factura',

            id: 'codi',
            id_invoice: 'codi_factura',
            id_user: 'usuari',
            id_income_account: 'codi_compte_ingres',

            number: 'numero_efecte',
            collection_method: 'modalitat_cobro', // cash, card, transfer, paypal, bizum, other
            paid: 'cobrat', // Float/Boolean
            total: 'import',

            paid_date: 'fecha_cobro',
            expiration_date: 'venciment',
            create_date: 'fecha',
            update_date: null,
          },
        },
      },
    },
  },
})

export const actions = {
  setIsContainerNeeded(state, is_container_needed) {
    state.commit('updateIsContainerNeeded', is_container_needed)
  },
  setConfig(state, payload) {
    state.commit('updateConfigValue', payload)
  },
  setConfigComplete(state, payload) {
    state.commit('updateConfigComplete', payload)
  },
}

export const mutations = {
  updateIsContainerNeeded (state, is_container_needed) {
    state.is_container_needed = is_container_needed
  },
  updateConfigComplete (state, config) {
    state.config = config
  },

  updateConfigValue (state, { path, value }) {
    let pathStack = path.split('>')
    let stateConfig = state.config

    while (pathStack.length>1) {
      stateConfig = stateConfig[pathStack.shift()]
    }

    let elementToUpdate = pathStack.shift()
    stateConfig[elementToUpdate] = value
  },
}
