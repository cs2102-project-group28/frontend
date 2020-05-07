<!-- /* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */ -->
<template>
  <v-app>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue">
            <v-toolbar-title>Signup</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-alert
                :value="userExists"
                color="error"
                icon="mdi-fire"
              >This user already exists, try a different set of data.</v-alert>
              
              <v-alert
                :value="notMatchConfirmPassword"
                color="error"
                icon="mdi-fire"
              >Password and confirmed password does not match.</v-alert>

              <v-text-field
                name="login"
                v-model="username"
                label="Login"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                name="phone"
                v-model="phone"
                label="phone"
                :rules="[rules.required, rules.phone]"
              ></v-text-field>

              <v-text-field
                name="password"
                label="Password"
                :rules="[rules.required]"
                type="password"
                v-model="password"
              ></v-text-field>

              <v-text-field
                name="password"
                label="Confirm Password"
                :rules="[rules.required]"
                type="password"
                v-model="confirm_password"
                :error="!valid()"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider light></v-divider>
          <v-radio-group v-model="radioGroup">
            <v-radio
              v-for="n in 5"
              :key="n"
              :label="`${user_type[n - 1]}`"
              :value="n-1"
            ></v-radio>
          </v-radio-group>  
          <v-divider light></v-divider>

          <v-card-actions>
            <v-btn to="/login" rounded color="black" dark>Back</v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded color="black" dark @click  ="register()">
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</v-app>
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
  name: "Register",
  data: () => ({
    radioGroup: 0,
    user_type: [ 'customer', 'manager', 'staff', 'full-time rider', 'part-time rider'],
    user_type_backend: [ 'customer', 'manager', 'staff', 'rider'],
    userExists: false,
    username: '', 
    phone: '',
    password: "",
    confirm_password: '',
    notMatchConfirmPassword: false,
    status: 200,
    rules: {
      required: value => !!value || "Required",
      phone: value => {
        const pattern = /[6|8|9]\d{7}/g;
        return pattern.test(value) || "Invalid phone number.";
      }
    }
  }),
  methods: {
    register() {
      if (this.valid()) {
        var back_end_schema = back_end_base + '/register';

        axios.post(back_end_schema, { 
          username: this.username,
          password: this.password, 
          phone: this.phone, 
          userType: this.user_type_backend[this.user_type_select(this.radioGroup)], 
          riderType: this.rider_type(this.user_type)}, options)
        .then((response) => {
        if(response.status == 200) {
          this.$router.push('/login')
        }
        else 
          console.log(response)  
      }, (error) => {
        console.log(error);
      });
      }
      else {
        this.notMatchConfirmPassword = true;
      }
    },
    valid() {
      return this.password === this.confirm_password;
    },
    rider_type(rider) {
      if(rider == 'full-time rider')
        return 'fullTime'
      else if(rider == 'part-time rider')
        return 'partTime'
      else
        return ''
    },
    user_type_select(value) {
      if(value == 3 || value == 4)
        return 3
      else
        return value
    },
  }
};
</script>
