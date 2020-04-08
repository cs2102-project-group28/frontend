<!-- /* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */ -->
<template>
  <v-app>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue">
            <v-toolbar-title>Signup form</v-toolbar-title>
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
          <v-card-actions>
            <v-btn to="/login" rounded color="black" dark>Back</v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded color="black" dark @click.prevent="register()">
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
export default {
  name: "Register",
  data: () => ({
    userExists: false,
    username: '', 
    phone: '',
    password: "",
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
        this.$router.push('/login');
        this.$store.dispatch('REGISTER', {
          username: this.username,
          phone: this.phone,
          password: this.password
        })
        .then( 
          ({ status }) => { 
          if (status == 200) {
            this.$store.commit("SET_NOTIFICATION", {
            display: true,
            text: 'Your account has been successfully created! you can now login.',
            alertClass: "danger"
            });
            console.log(status);
            this.$router.push('/login');
          }
          else {
            console.log("API error, response code is not valid");
          }
        })
        .catch (error => {
          this.userExists = true;
          console.log(error);
        })
      }
      else {
        this.notMatchConfirmPassword = true;
      }
    },
    valid() {
      return this.password === this.confirm_password;
    }
  }
};
</script>
