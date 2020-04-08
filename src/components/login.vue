<template>
  <v-app>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-form>
          <v-card class="elevation-12">
            <v-toolbar dark color="blue">
              <v-toolbar-title>Login form</v-toolbar-title>
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
export default {
  name: "Login",
  data: () => ({
    username: '',
    password: '',
    error: false
  }),
  methods: {
    login() {
      this.$router.push("/customers");
      this.$store.dispatch("LOGIN", {
        username: this.username,
        password: this.password
      })
      .then(success => {
        this.$router.push("/customers/" + this.username);
        console.log(success);
      })
      .catch(error => {
        this.error = true;
        console.log(error);
      })
    }
  }
};
</script>
