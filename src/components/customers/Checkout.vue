<template>
<div id="checkout">
  <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Order Summary</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Edit no.order</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.number_order" label="No.order"></v-text-field>

                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
           	  <v-alert
		        v-model="alert"
		        dismissible
		        color="cyan"
		        border="left"
		        elevation="2"
		        colored-border
		      >
		        Number of order must be within item limit.
		      </v-alert>	
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          @click="editItem(item)">
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
	<v-alert	
	color="#2A3B4D"
	dark
	icon="mdi-wallet"
	dense
	>TOTAL DUE: {{ compute_total()}} (S$)
	</v-alert>
	<v-divider
	class="mx-4"
	inset
	vertical
	></v-divider>
	<v-btn
	dark
	rounded
	large
	color="green"
	@click="checkout"
	>Check Out
	</v-btn>
	<v-spacer></v-spacer>
	<v-btn
	dark
	rounded
	large
	color="gray"
	@click="back"
	>Back
	</v-btn>
	 <v-divider
	class="mx-4"
	inset
	vertical
	></v-divider>
  </v-app>
</div>
</template>

<script>
    export default {
      name: 'Checkout',
	  data: () => ({
	    dialog: false,
	    alert: false,
	    headers: [
	      {
	        text: 'Name',
	        align: 'start',
	        sortable: false,
	        value: 'name',
	      },
	      { text: 'No. order', value: 'number_order' },
	      { text: 'Price per Item', value: 'price' },
	      { text: 'Limit', value: 'limit'},
	      { text: '', value: 'actions', sortable: false },
	    ],
	    items: [
		        {
		          name: 'Frozen Yogurt',
		          number_order: 2,
		          price: 1.5,
		          limit: 10
		        },
		        {
		          name: 'Ice cream sandwich',
		          number_order: 2,
		          price: 1.2,
		          limit: 10
		        },
		        {
		          name: 'Eclair',
		          number_order: 2,
		          price: 1.5,
		          limit: 10
		        },
		        {
		          name: 'Cupcake',
		          number_order: 2,
		          price: 1.5,
		          limit: 10
		        },
		        {
		          name: 'Gingerbread',
		          number_order: 2,
		          price: 1.5,
		          limit: 10
		        },
		        {
		          name: 'Jelly bean',
		          number_order: 2,
		          price: 1.5,
		          limit: 10
		        },
		        {
		          name: 'Lollipop',
		          number_order: 2,
		          price: 1.5,
		          limit: 10
		        },
		        {
		          name: 'Honeycomb',
		          number_order: 2,
		          price: 1.5,
		          limit: 10
		        },
		        {
		          name: 'Donut',
		          number_order: 2,
		          price: 1.4,
		          limit: 10
		        },
		        {
		          name: 'KitKat',
		          number_order: 2,
		          price: 1.0,
		          limit: 10
		        },
		      ],
	    editedIndex: -1,
	    editedItem: {
	      number_order: 0,
	    },
	    defaultItem: {
	      name: '',
	      number_order: 0,
	      price: 0,
	    },
	  }),

	  watch: {
	    dialog (val) {
	      val || this.close()
	    },
	  },

	  methods: {
		    editItem (item) {
		      this.editedIndex = this.items.indexOf(item)
		      this.editedItem = Object.assign({}, item)
		      this.dialog = true
		    },

		    close () {
		      this.dialog = false
		      setTimeout(() => {
		        this.editedItem = Object.assign({}, this.defaultItem)
		        this.editedIndex = -1
		      }, 300)
		    },

		    save () {
		      if (this.editedIndex > -1 && !isNaN(parseInt(this.editedItem.number_order, 10)) ) {
		      	if(parseInt(this.editedItem.number_order, 10) < 0 || parseInt(this.editedItem.number_order, 10) > this.items[this.editedIndex].limit) { 	
				  	this.alert = true
				} else {
  			        this.items[this.editedIndex].number_order = parseInt(this.editedItem.number_order, 10)
    		        this.close()
				}
		      } 
		    },

		    compute_total() {
		    	//bug here, some how value is not comparable
		    	var total = 0;
	
		    	for(var i = 0; i < this.items.length; i += 1) {
		    		var item = Object.assign({}, this.items[i])
		    		total += item.number_order * item.price;
		    	}
		    	return total;
		    },
		    checkout() {
		    	this.$router.push("/customers");
		    },
		    back() {
		    	this.$router.go(-1);
		    },
	  	},
    }
</script>
