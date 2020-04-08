<template>
<div id="main_customer">

	<v-app id="inspire">
		<v-app-bar
		absolute
		color="white"
		elevate-on-scroll
		scroll-target="#scrolling-techniques-7">
			<v-app-bar-nav-icon></v-app-bar-nav-icon>

			<v-toolbar-title >LIGHTING DELIVERY</v-toolbar-title>

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
			    <template v-slot:item.actions="">
		        <v-icon
		          large
		          class="mr-2"
		          @click="view_res_menu()"
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
				  value: 'name',
				},
				{ text: 'Category', value: 'category' },
				{ text: 'Location', value: 'location' },
				{ text: '', value: 'actions', sortable: false, width: 200 },
			],
			mock_data: [
				{
				  name: 'Frozen',
				  category: 'Western',
				  location: 'SG'
				},
				{
				  name: 'Mala',
				  category: 'Spicy',
				  location: 'SG'
				},
				{
				  name: 'Eclair shop',
				  category: 'Desserts',
				  location: 'SG'
				}
			],
			res_data: ''    		    		
		}
	},
    methods: {
    	load_restaurent() {
		this.$store.dispatch("MENU")
	      .then(data => {
	        this.res_data = data;
	        console.log("success");
	      })
	      .catch(error => {
	        this.error = true;
	        console.log(error);
	      })    		
    	},
	    view_res_menu() {
	    	this.$router.push("/menu")
	    }
    }
};
</script>
