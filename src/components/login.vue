<template>
  <v-app>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-form>
          <v-card class="elevation-12">
            <v-toolbar dark color="blue">
              <v-toolbar-title>Delivery login</v-toolbar-title>
            </v-toolbar>
            <v-alert
              color="error"
              :value="error"
              icon="close"
            >
              The username or the password are incorrect.
            </v-alert>
            <v-card-text>
              <v-text-field v-model="username" name="login" label="Login" type="text"></v-text-field>

              <v-text-field v-model="password" name="password" label="Password" type="password"></v-text-field>
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-btn to="/register" rounded color="indigo" dark>Register</v-btn>
              <v-spacer></v-spacer>
              <v-btn rounded color="primary" dark @click.prevent="login()">
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</v-app>
</template>

<script>
import axios from "axios";

const back_end_base = "http://localhost:5000"

export default {
  name: "Login",
  data: () => ({
    username: '',
    password: '',
    error: false
  }),
  methods: {
    login() {
      var back_end_schema = back_end_base + '/login'

      axios.post(back_end_schema, { username: this.username, password: this.password})
      .then((response) => {
        if(response.status == 200) {
          console.log(response.data)
          if(response.data.position == 'customer')
            this.$router.push(back_end_base + '/customers/' + this.username)
          else if(response.data.position == 'staffs') 
            this.$router.push(back_end_base + '/staffs/' + this.username)
          else if(response.data.position == 'manager') 
            this.$router.push(back_end_base + '/managers/' + this.username)
          else 
            this.$router.push(back_end_base + '/riders/' + this.username)
        }  
      }, (error) => {
        console.log(error);
      });
      
    }
  }
};
</script>
