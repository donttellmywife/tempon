<template>
  <main-layout>
    <h2>Register</h2>

    <form @submit.prevent="register">
      <label><input v-model="email" placeholder="email"></label>
      <label><input v-model="pwd" placeholder="password" type="password"></label>(hint: not everyday password)<br>
      <label>assistant: <input v-model="pwd" placeholder="password" type="checkbox"></label><br>
      <button type="submit">register</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </main-layout>
</template>


<script>
  import {MainLayout} from 'LAYOUT'
  import store from '../store.js'
  import user from '../user.js'


  export default {
    data() {
      return {
        email: '',
        pwd: '',
        error: '',
        role: 'client'
      }
    },
    components: {
      MainLayout
    },
    methods: {
      register() {
        user.register(this.email, this.pwd, this.role)
          .then(user => this.$store.commit('login', user))
          .catch(err => this.error = err)
      }
    }
  }
</script>
