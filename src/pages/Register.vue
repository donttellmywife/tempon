<template>
<main-layout>
<div class="register-page">
<h2>Register</h2>

<form @submit.prevent="register" class="register-form">
  <Err v-if="error" :msg="error" />
  <div class="form-group">
    <label>Name
      <input v-model="name" placeholder="name" class="form-control" type="text" required>
    </label>
  </div>
  <div class="form-group">
    <label>Email address
      <input v-model="email" placeholder="email@example.com" class="form-control" type="email">
    </label>
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
  import { Err } from 'COMPONENT'


  export default {
    data() {
      return {
        email: '',
        pwd: '',
        name: '',
        error: '',
        assistant: false,
      }
    },


    methods: {
      register() {
        const role = this.assistant ? 'assistant' : 'client'
        user.signup({
          email: this.email,
          password: this.pwd,
          name: this.name,
          role,
        })
          .then(user => this.$store.commit('login', user))
          .then(() => this.$router.push('/'))
          .catch(err => {
            this.error = err
          })
      }
    },


    components: {
      MainLayout,
      Err,
    },
  }
</script>
