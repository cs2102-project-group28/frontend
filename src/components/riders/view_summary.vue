<template>
<div id="rider_summary">
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
            sub-group
            no-action
          >
            
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Details</v-list-item-title>
              </v-list-item-content>
            </template>
            
            <v-list-item
              v-for="month in months"
              :key="month.uid"
            >
              <v-list-item-title v-text="month.uid"></v-list-item-title>
              <v-list-item-title v-text="month.type"></v-list-item-title>
              <v-list-item-title v-text="month.no_rating"></v-list-item-title>
              <v-list-item-title v-text="month.salary"></v-list-item-title>
              <v-list-item-title v-text="month.total_time"></v-list-item-title>
              <v-list-item-title v-text="month.ave_deliver_time"></v-list-item-title>              
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
      months: [
        {
          type: 'None',
          uid: 0,
          no_rating: 0,
          salary: 0,
          total_time: 0,
          ave_deliver_time: 0,
        }
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

