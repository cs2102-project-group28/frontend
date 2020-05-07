<template>
<div id="view_order">
  <v-app id="inspire">
  	<v-data-table
      :headers="headers"
      :items="this.orders"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      class="elevation-1"
    >
    <template v-slot:item.actions="{ item }">
        <v-icon
          small
          @click="cancel_order(item)"
          :disabled=item.not_cancelable
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Current Orders</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <v-simple-table dark>
	      <template v-slot:default>
	        <thead>
	          <tr>
	            <th :colspan="headers.length" class="text-left">Name</th>
	            <th :colspan="headers.length" class="text-left">Number</th>
	            <th :colspan="headers.length" class="text-left">Price</th>
	          </tr>
	        </thead>
	        <tbody>
	        <tr v-for="food in item.items" v-bind:key="food.name">
	            <td :colspan="headers.length">{{ food.name }}</td>
	            <td :colspan="headers.length">{{ food.number_order }}</td>
	            <td :colspan="headers.length">{{ food.price }}</td>
	        </tr>
	        </tbody>
	      </template>
	    </v-simple-table>
      </template>

    </v-data-table>
  </v-app>
</div>
</template>

<script>
    export default {
      name: 'ViewOrder',
	  data: () => ({	
	    expanded: [],
      	singleExpand: true,
	    dialog: false,
	    headers: [
	      {
	        text: 'Restaurant',
	        align: 'start',
	        sortable: false,
	        value: 'restaurant',
	      },
	      { text: 'Total', value: 'total' },
	      { text: 'Ordered time', value: 'start_time' },
	      { text: '', value: 'data-table-expand' },
	      { text: '', value: 'actions', sortable: false },
	    ],
	    orders:[
	    ],	
	  }),

	  methods: {
	  	cancel_order(item) {
	  		//this.$store.dispatch(CANCEL_ORDER)
	  		if(Date.now() - Date.parse(item.start_time) <= 600000) {
	        	const index = this.orders.indexOf(item)
	        	confirm('Are you sure you want to cancel this order?') && this.orders.splice(index, 1)
	  		} else {
	  			item.not_cancelable = true
	  		}
	  	}
	  	},
    }
</script>
