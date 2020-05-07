<template>
<div id="view_account">
  <v-app id="inspire">
    <v-card class="mx-auto" max-width="800">
    <v-img
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        height="300px"
        dark
      >
    <v-row class="fill-height" >
      <v-card-title>
        <v-btn dark icon @click="back">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn dark icon class="mr-4" @click="edit">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Update</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="update.password" label="password"></v-text-field>
                      <v-text-field v-model="update.phone" label="phone"></v-text-field>
                      <v-text-field v-model="update.creditcard_number" label="credit card number"></v-text-field>
                      <v-text-field v-model="update.ccv" label="ccv"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>	
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

      </v-card-title>

      <v-spacer></v-spacer>

      <v-card-title class="white--text pl-12 pt-12">
        <div class="display-1 pl-12 pt-12">  {{ this.$data.details.user_name }}</div>
      </v-card-title>
    </v-row>
  </v-img>
  
      <v-list two-line>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-onepassword</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>{{ this.$data.details.password }}</v-list-item-title>
            <v-list-item-subtitle>Password</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
  
        <v-divider inset></v-divider>


        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-phone</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>{{ this.$data.details.phone }}</v-list-item-title>
            <v-list-item-subtitle>Mobile Phone</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
  
        <v-divider inset></v-divider>
        


        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-card-account-details</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title >{{ this.$data.details.creditcard_number }}</v-list-item-title>
            <v-list-item-subtitle>Credit Card Number</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item> 

        <v-divider inset></v-divider>
        
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"></v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>{{ this.$data.details.ccv }}</v-list-item-title>
            <v-list-item-subtitle>CCV </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>   

        <v-divider inset></v-divider>
  
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-gift-outline</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>{{ this.$data.details.reward_points }}</v-list-item-title>
            <v-list-item-subtitle>Reward points</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>


      </v-list>
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
  name: 'Account',
  data: () => ({
    dialog: false,
    details: '',
    update: {
          password: '',
          phone: 0,
          creditcard_number: 0,
          ccv: 0,
    },
    default: {
          password: '',
          phone: 0,
          creditcard_number: 0,
          ccv: 0,
    },
  }),

  created () {
    this.initialize()
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },


  methods: {
    initialize () {
    var back_end_schema = back_end_base + this.$route.params.username + '/profile'
    var data = {}
    axios.post(back_end_schema, data, options)  
    .then((response) => {
      if(response.status == 200) {
        console.log(response.data.data)
        this.details = response.data.data
      }
    }, (error) => {
      console.log(error);
    });
    },
      back() {
  			this.$router.go(-1);
		},
    edit () {
      this.dialog = true
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.update = Object.assign({}, this.default)
      }, 300)
    },

    save () {
    	//Send edit here, check valid then update this
        this.details.password = this.update.password
        this.details.phone = this.update.phone
        this.details.creditcard_number = this.update.creditcard_number
        this.details.ccv = this.update.ccv
        this.close()
    },
    }        
}
</script>
