<template>
<main-layout>
<div class="login-page">
<h2>LOGIN</h2>

<form @submit.prevent="login" class="register-form">
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

  <button class="btn btn-primary" type="submit">LOGIN</button><br>
</form>
</div>
</main-layout>
</template>


<script>
  import { user } from 'API'
  import { MainLayout } from 'LAYOUT'

  function emailValidation(email) {
    // any chras till @ any chars till dot any chars after
    return /^.+[@].+\..+$/.test(email)
  }


  export default {
    data() {
      return {
        email: '',
        pwd: '',
        error: '',
      }
    },


    methods: {
      login() {
        if (!emailValidation(this.email)) {
          this.error = 'Please enter correct email'
          return
        }

        user.signin(this.email, this.pwd)
          .then(res => {
            if (res.message) return Promise.reject(res)
            return res
          })
          .then(user => this.$store.commit('login', user))
          .then(() => {
            this.$router.push('/')
          })
          .catch(err => this.error = err)
      }
    },


    components: {
      MainLayout
    },
  }
</script>
