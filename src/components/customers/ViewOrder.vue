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
	      { text: 'Ordered time', value: "20:00" },
	      { text: '', value: 'data-table-expand' },
	    ],
	    orders:[
	    	{
	    	restaurant: "Delight dessert",
	    	total: 20,
		    items: [
			        {
			          name: 'Frozen Yogurt',
			          number_order: 8,
			          price: 1.5 
			        },
			        {
			          name: 'Ice cream sandwich',
			          number_order: 8,
			          price: 1.2
			        },
			        {
			          name: 'Eclair',
			          number_order: 8,
			          price: 1.5
			        },
			        {
			          name: 'Cupcake',
			          number_order: 8,
			          price: 1.5
			        },
			        {
			          name: 'Gingerbread',
			          number_order: 8,
			          price: 1.5
			        },
			        {
			          name: 'Jelly bean',
			          number_order: 8,
			          price: 1.5
			        },
			        {
			          name: 'Lollipop',
			          number_order: 8,
			          price: 1.5
			        },
			        {
			          name: 'Honeycomb',
			          number_order: 8,
			          price: 1.5
			        },
			        {
			          name: 'Donut',
			          number_order: 8,
			          price: 1.3
			        },
			        {
			          name: 'KitKat',
			          number_order: 8,
			          price: 1.0
			        },
			      ],
			},
	    ],	
	  }),

	  methods: {
	  	//add cancel here
	  	},
    }
</script>
