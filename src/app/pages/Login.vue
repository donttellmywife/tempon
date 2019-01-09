<template>
  <main-layout>
    <h2>Login</h2>

    <form @submit.prevent="login">
      <label><input v-model="email" placeholder="email"></label>
      <label><input v-model="pwd" placeholder="password" type="password"></label><br>
      <button type="submit">login</button><br>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </main-layout>
</template>


<script>
  import { user, store } from 'APP'
  import { MainLayout } from 'LAYOUT'


  export default {
    data() {
      return {
        email: '',
        pwd: '',
        error: '',
      }
    },


    components: {
      MainLayout
    },


    methods: {
      login() {
        user.login(this.email, this.pwd)
          .then(user => this.$store.commit('login', user))
          .catch(err => this.error = err)
      }
    }
  }
</script>
