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
      },
    },
  }
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
