<template>
<div id="manager_summary">
  <v-app id="inspire">
 
    <v-card
      class="mx-auto"
      width="1000"
    >
      <v-list>
        <v-list-item @click="home">
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
            no-action
            sub-group
            value="true"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Month summary</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="month in months"
              :key="month.new_user"
              link
            >
              <v-list-group
                no-action
                sub-group
                value="true"
              >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Users</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
              v-for="user in month.users"
              :key="user.cid"
              link
              >
                <v-list-item-title v-text="user.cid"></v-list-item-title>
                <v-list-item-title v-text="user.no_order"></v-list-item-title>
                <v-list-item-title v-text="user.total_price"></v-list-item-title>
              </v-list-item>              
              </v-list-group>

              <v-list-item-title v-text="month.new_user"></v-list-item-title>
              <v-list-item-title v-text="month.no_order"></v-list-item-title>
              <v-list-item-title v-text="month.total_price"></v-list-item-title>

            </v-list-item>
          </v-list-group>

          <v-list-group
            no-action
            sub-group
            value="true"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Orders summary</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="order in orders"
              :key="order.no_order"
              link
            >
              <v-list-item-title v-text="order.no_order"></v-list-item-title>
              <v-list-item
              v-for="single_order in order.order_list"
              :key="single_order.restaurant"
              link
              >
                <v-list-item-title v-text="single_order.restaurant"></v-list-item-title>
                <v-list-item-title v-text="single_order.order_time"></v-list-item-title>
                <v-list-item-title v-text="single_order.price"></v-list-item-title>
                <v-list-item-title v-text="single_order.review"></v-list-item-title>
              </v-list-item>
            </v-list-item>
          </v-list-group>

          <v-list-group
            sub-group
            no-action
          >
            
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Rider summary</v-list-item-title>
              </v-list-item-content>
            </template>
            

            <v-list-group
            sub-group
            no-action
            >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Part time</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="rider in riders.part_time"
              :key="rider.uid"
            >
              <v-list-item-title v-text="rider.uid"></v-list-item-title>
              <v-list-item-title v-text="rider.no_rating"></v-list-item-title>
              <v-list-item-title v-text="rider.ave_rating"></v-list-item-title>
              <v-list-item-title v-text="rider.no_order"></v-list-item-title>
              <v-list-item-title v-text="rider.total_time"></v-list-item-title>
              <v-list-item-title v-text="rider.ave_deliver_time"></v-list-item-title>              
            </v-list-item>
            </v-list-group>

            <v-list-group
            sub-group
            no-action
            >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Full time</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="rider in riders.full_time"
              :key="rider.uid"
            >
              <v-list-item-title v-text="rider.uid"></v-list-item-title>
              <v-list-item-title v-text="rider.no_rating"></v-list-item-title>
              <v-list-item-title v-text="rider.ave_rating"></v-list-item-title>
              <v-list-item-title v-text="rider.no_order"></v-list-item-title>
              <v-list-item-title v-text="rider.total_time"></v-list-item-title>
              <v-list-item-title v-text="rider.ave_deliver_time"></v-list-item-title>              
            </v-list-item>
            </v-list-group>



          </v-list-group>
        </v-list-group>
      </v-list>
    </v-card>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'ManagerSummary',
  props: {
    listTitle: String
  },
  data: () => ({
      months_selected: '',
      months: [
        {
          new_user: 0,
          no_order:0,
          total_price: 0,
          users: [
            {
              cid: 0,
              no_order: 0,
              total_price: 0,
            }
          ]
        }
      ],
      orders:[
        {
          no_order: 0,
          order_list: [],
        },
      ],
      riders: [
        {
          part_time: [],
          full_time: [],
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
  },
}
</script>

