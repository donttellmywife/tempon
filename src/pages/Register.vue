<template>
<main-layout>
  <h2>Register</h2>

  <form @submit.prevent="register">
    <p v-if="error" class="error">{{ error }}</p>
    <label><input v-model="email" placeholder="email" type="email"></label><br>
    <label><input v-model="pwd" placeholder="password" type="password">(hint: not everyday password)</label><br>
    <label>assistant<input v-model="assistant" type="checkbox"></label><br>
    <button type="submit">register</button><br>
  </form>
</main-layout>
</template>


<script>
  import { user } from 'API'
  import { MainLayout } from 'LAYOUT'


  export default {
    data() {
      return {
        email: '',
        pwd: '',
        error: '',
        assistant: false,
      }
    },


    methods: {
      register() {
        const role = this.assistant ? 'assistant' : 'client'
        user.signup(this.email, this.pwd, role)
          .then(user => this.$store.commit('login', user))
          .then(() => this.$router.push('/'))
          .catch(err => {
            this.error = err
          })
      }
    },


    components: {
      MainLayout
    },
  }
</script>
