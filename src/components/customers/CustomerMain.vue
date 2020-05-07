<template>
<div id="main_customer">
	<v-app id="inspire">
		<v-app-bar
		absolute
		color="white"
		elevate-on-scroll
		scroll-target="#scrolling-techniques-7">
			<v-app-bar-nav-icon></v-app-bar-nav-icon>

			<v-toolbar-title>LIGHTING DELIVERY</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon>
			<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-app-bar>
		<v-sheet
			id="scrolling-techniques-7"
			class="overflow-y-auto"
			max-height="600">
			<v-container style="height: 50px;">

			</v-container>
		</v-sheet>
		<v-card style="height: 900px;">
			<v-card-title>
			<v-text-field
			  v-model="search"
			  append-icon="mdi-magnify"
			  label="Search"
			  single-line
			  hide-details
			></v-text-field>
			</v-card-title>
			<v-data-table
			:headers="headers"
			:items="mock_data"
			:search="search"
			>
			<v-spacer></v-spacer>
			<template v-slot:item.actions="{item}">
	        <v-icon
	          large
	          class="mr-2"
	          @click="view_res_menu(item)"
	        >
	          mdi-menu-right
	        </v-icon>		
		    </template>	

			</v-data-table>		
		</v-card>
	</v-app>    
</div>
</template>


<script>
import axios from "axios";

const back_end_base = "http://localhost:5000"

const options = {
  headers: {
    'Content-Type': 'application/json',
  }
};

export default {
    name: "CustomerMain", 
    data () {
    	return {
			search: '',
			headers: [
				{
				  text: 'Restaurant',
				  align: 'start',
				  filterable: true,
				  value: 'rName',
				},
				{ text: 'Category', value: 'rCategory' },
				{ text: 'Location', value: 'location' },
				{ text: '', value: 'actions', sortable: false, width: 200 },
			],
			mock_data: [
				{
				  rName: 'Frozen',
				  rCategory: 'Western',
				  location: 'SG'
				},
				{
				  rName: 'Mala',
				  rCategory: 'Spicy',
				  location: 'SG'
				},
			],    		    		
		}
	},

    created () {
	    this.initialize()
	},

    methods: {
    	initialize() {
    		this.load_restaurent()
    	},
    	load_restaurent() {
    		var back_end_schema = back_end_base + '/customer/' + this.$route.params.username + '/search-restaurant/restaurant'
    		var data = {
    			rName: '',
    			rCategory: '',
    			location: '',
    			fName: '',
    			fCategory: '',
    		}
      		axios.post(back_end_schema, data, options)
      		.then((response) => {
      			if(response.status == 200) {
      				this.mock_data = response.data.data
      			}
      		}, (error) => {
        		console.log(error);
      		});
    	},
	    view_res_menu(item) {
	    	var schema = "/customers/" + this.$route.params.username + "/" + item.rName + "/menu" 
	    	this.$router.push(schema)
	    }
    }
};
</script>
