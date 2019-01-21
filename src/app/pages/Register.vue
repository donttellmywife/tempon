<template>
  <main-layout>
    <h2>Register</h2>

    <form @submit.prevent="register">
      <label><input v-model="email" placeholder="email" type="email"></label>
      <label><input v-model="pwd" placeholder="password" type="password">(hint: not everyday password)</label><br>
      <label>assistant<input v-model="assistant" type="checkbox"></label><br>
      <button type="submit">register</button><br>
      <p v-if="error" class="error">{{ error }}</p>
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
        user.register(this.email, this.pwd, role)
          .then(user => this.$store.commit('login', user))
          .catch(err => {
            console.log(err)
            this.error = err
          })
      }
    },


    components: {
      MainLayout
    },
  }
</script>
