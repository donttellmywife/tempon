<template>
<main-layout>
<div class="register-page">
  <h2>Register</h2>

  <form @submit.prevent="register" class="register-form">
    <p v-if="error" class="error">{{ error }}</p>
    <div class="form-group">
      <label>Email address
        <input v-model="email" placeholder="email@example.com" class="form-control" type="email">
      </label><br>
    </div>

    <div class="form-group">
      <label>Password
        <input v-model="pwd" placeholder="password" class="form-control" type="password">
      </label>
    </div>

    <div class="form-group">
      <div class="form-check">
        <label class="form-check-label">
          <input v-model="assistant" class="form-check-input" type="checkbox">
          Assistant
        </label>
      </div>
    </div>

    <button class="btn btn-primary" type="submit">register</button><br>
  </form>
</div>
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
