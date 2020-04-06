<template>
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
                icon="warning"
              >This user already exists, try a different set of data.</v-alert>

              <v-text-field
                prepend-icon="person"
                name="login"
                v-model="username"
                label="Login"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                prepend-icon="phone"
                name="phone"
                v-model="phone"
                label="phone"
                :rules="[rules.required, rules.phone]"
              ></v-text-field>

              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                :rules="[rules.required]"
                type="password"
                v-model="password"
              ></v-text-field>

              <v-text-field
                prepend-icon="lock"
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
            <v-btn to="/login" round color="black" dark>Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn round color="success" @click.prevent="register()">
              Register
              <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "register",
  data: () => ({
    userExists: false,
    username: '', 
    phone: '',
    password: "",
    confirm_password: "",
    rules: {
      required: value => !!value || "Required",
      phone: value => {
        const pattern = [0-9]{8};
        return pattern.test(value) || "Invalid phone number.";
      }
    }
  }),
  methods: {
    register() {
      if (this.valid()) {
        this.$store.dispatch('REGISTER', {
          username: this.username,
          phone: this.phone,
          password: this.password
        })
        .then(({ status }) => {
          this.$store.commit("SET_NOTIFICATION", {
            display: true,
            text: 'Your account has been successfully created! you can now login.',
            alertClass: "danger"
          });

          this.$router.push('/login')
        })
        .catch (error => {
          this.userExists = true;
        })
      }
    },
    valid() {
      return this.password === this.confirm_password;
    }
  }
};
</script>
