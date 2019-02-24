<template>
<main-layout>
  <form @submit.prevent="login">
    <fieldset>
      <legend>LOGIN</legend>
      <div class="form-group">
        <!-- TODO: type email after dev done -->
        <label>Email address<input v-model="email" class="form-control" placeholder="email" type="text" aria-describedby="emailHelp"></label>
      </div>
      <div class="form-group">
        <label>Password<input v-model="pwd" placeholder="password" type="password" class="form-control"></label><br>
      </div>
      <button type="submit" class="btn btn-primary">ENTER</button>
      <p v-if="error" class="text-danger">{{ error }}</p>
    </fieldset>
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
      }
    },


    methods: {
      login() {
        user.signin(this.email, this.pwd)
          .then(res => {
            if (res.message) return Promise.reject(res)
            return res
          })
          .then(user => this.$store.commit('login', user))
          .catch(err => this.error = err)
      }
    },


    components: {
      MainLayout
    },
  }
</script>
