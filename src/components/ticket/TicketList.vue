<template>
  <!-- LIST -->
  <CtCard :type="stored_config.branding.style.card" fluid title="Tíquets" dense>
    <v-card-text class="pr-0 pl-0">
      <v-row class="pt-0 pb-2">
        <!-- CUSTOMER TYPES TO INIT NEW TICKET -->
        <v-col
                v-for="customerType in customerTypes"
                :key="customerType.label"
                cols="12"
                lg="6"
                class="text-center pt-0 pb-0"
                @click="executeCustomerType(customerType.action)"
        >
          <CtBtn :type="stored_config.branding.style.button" block :color="stored_config.branding.color_palette.primary">
            {{ customerType.label }}
          </CtBtn>
        </v-col>
      </v-row>

      <v-divider />

      <div class="ct-card-content-ticket-list">
        <!-- TICKET LIST -->
        <v-data-table
                v-model="selectedTickets"
                :headers="headers"
                :items="tickets"
                :single-select="false"
                item-key="id"
                show-select
                hide-default-footer
                :items-per-page="20"
                class="elevation-1">
          <template v-slot:header="{ headers }">
            <span v-html="header.text + ' | '" v-for="header in headers" :key="header.text + ' | '" />
          </template>
          <template v-slot:item="{ item }">
            <v-row dense>
              <span v-html="item.id_customer" />
            </v-row>
          </template>
        </v-data-table>
      </div>
    </v-card-text>
  </CtCard>
</template>

<script type="application/javascript">
export default {
  name: "TicketList",
  data: () => {
    return {
      customerTypes: [
        {
          label: 'Ventas contado',
          action: 'cashSales', // Method included in this component
        },
        {
          label: 'Clientes',
          action: 'customers', // Method included in this component
        },
      ],

      selectedTickets: [],
      headers: [
        {
          text: 'Cliente',
          align: 'start',
          sortable: false,
          value: 'id_customer',
        },
        { text: 'Cobrado', sortable: false, value: 'receipt.paid' },
        { text: 'Pagado', sortable: false, value: 'total - receipt.paid' },
        { text: 'Total', sortable: false, value: 'total' },
        { text: '', sortable: false, value: 'id' },
      ],
    }
  },

  computed: {
    stored_config () {
      return this.$store.state.global.config
    },
    tickets () {
      return this.$store.state.ticket.tickets
    },
  },

  mounted() {
    if (this.$vuetify.breakpoint.smAndDown) {
      document.getElementsByClassName('ct-card-content-ticket-list')[0].style.height = '52vh'
      document.getElementsByClassName('ct-card-content')[0].style.maxHeight = '72vh'
    } else {
      document.getElementsByClassName('ct-card-content-ticket-list')[0].style.height = '74vh'
      document.getElementsByClassName('ct-card-content')[0].style.maxHeight = '85vh'
    }
  },

  methods: {
    executeCustomerType(action) {
      this[action]()
    },
    cashSales() {
      console.log('cash sales: test')
    },
    customers() {
      console.log('customers: test')
    },
  },
}
</script>
<style>
  .ct-card-content {
    overflow-x: hidden !important;
  }
  .ct-card-content-ticket-list {
    overflow-x: hidden;
  }
</style>
