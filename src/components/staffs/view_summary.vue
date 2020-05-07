<template>
<div id="staff_summary">
  <v-app id="inspire">
 
    <v-card
      class="mx-auto"
      width="1000"
    >
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-img
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        height="300px"
        dark
        ></v-img>
        <v-list-group
          prepend-icon="mdi-format-list-bulleted-type"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>Summary</v-list-item-title>
          </template>
          <v-row justify="center">
             <v-btn color="primary" @click="update">Update selected</v-btn>
             <v-btn color="primary" @click="clear">Clear</v-btn>
          </v-row>
          <v-row justify="center">
           <v-date-picker
              v-model="months_selected"
              type="month"
              multiple
              landscape
              :show-current="false"
            ></v-date-picker>
          </v-row> 

          <v-list-group
            sub-group
            no-action
          >           
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Promotions</v-list-item-title>
              </v-list-item-content>
            </template>
            
            <v-list-item
              v-for="month in promotions"
              :key="month.res_name"
            >
              <v-list-item-title v-text="month.type"></v-list-item-title>            
              <v-list-item-title v-text="month.pid"></v-list-item-title>
              <v-list-item-title v-text="month.startDate"></v-list-item-title>
              <v-list-item-title v-text="month.endDate"></v-list-item-title>
              <v-list-item-title v-text="select_flat_percen(month)"></v-list-item-title>
              <v-list-item-title v-text="select_min_max(month)"></v-list-item-title>
              <v-list-item-title v-text="month.no_orders"></v-list-item-title>
              <v-list-item-title v-text="month.orders_per_day"></v-list-item-title>
              <v-list-item-title v-text="month.total_price"></v-list-item-title>          
            </v-list-item>
          </v-list-group>

          <v-list-group
            sub-group
            no-action
          >           
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Orders</v-list-item-title>
              </v-list-item-content>
            </template>
            
            <v-list-item
              v-for="month in orders"
              :key="month.res_name"
            >
              <v-list-group
                sub-group
                no-action
              >           
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Favouriate foods</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
              v-for="food in month.fav_foods"
              :key="food.name"
              >
                <v-list-item-title v-text="food.name"></v-list-item-title> 
              </v-list-item>
              </v-list-group>            
              <v-list-item-title v-text="month.res_name"></v-list-item-title>            
              <v-list-item-title v-text="month.total_orders"></v-list-item-title>
              <v-list-item-title v-text="month.total_cost"></v-list-item-title>
              <v-list-item-title v-text="month.location"></v-list-item-title>


            </v-list-item>
          </v-list-group>
        
        </v-list-group>
      </v-list>
    </v-card>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'RiderSummary',
  props: {
    listTitle: String
  },
  data: () => ({
      months_selected: '',
      promotions: [
        {
          type: 'None',
          pid: 0,
          startDate: '1-1-2020',
          endDate: '1-1-2020',
          flatAmount: 0,       
          minAmount: 0,
          percentage: 0,
          maxAmount: 0,
          rid: 0,
          no_orders: 0,
          orders_per_day: 0,
          total_price: 0,

        },
      ],
      orders: [
        {
          total_orders: 0,
          total_cost: 0,
          res_name: 'None',
          location: 'Unknown',
          fav_foods: [
            {
              name: 'Unknown'
            }
          ],
        },
      ],
  }),

  created () {
    this.initialize()
  },


  methods: {
    initialize() {
      this.clear();
      var currentdate = new Date();
      this.$data.months_selected = [ (currentdate.getFullYear() + "-" + (currentdate.getMonth()+1)) ];
      this.update();
    },
    home() {
      this.$router.push("/");
    },
    update (){
        //query to back end to update summary here
    },
    clear() {
      this.$data.months_selected = [];
    },
    select_min_max(month) {
      if(month.type == 'percentage promotion') {
        return month.maxAmount
      }
      else if (month.type == 'flat promotion') {
        return month.minAmount
      }
      else {
        return "Unknown promotion type"
      }
    },
    select_flat_percen(month) {
      if(month.type == 'percentage promotion') {
        return month.percentage
      }
      else if (month.type == 'flat promotion') {
        return month.flatAmount
      }
      else {
        return "Unknown promotion type"
      }
    }

  },
}
</script>

