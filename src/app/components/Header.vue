<template>
  <header class="navbar navbar-light" v-bind:class="{
    guest: isGuest,
    client: isClient,
    assistant: isAssistant
  }">
    <router-link to="/" class="navbar-brand">/LOGO</router-link>

    <span v-if="isGuest">GUEST MODE</span>
    <span v-if="isClient">CLIENT MODE</span>
    <span v-if="isAssistant">ASSISTANT MODE</span>

    <nav class="nav navbar-nav pull-xs-right">
      <ul v-if="isGuest">
        <router-link to="/login">/login</router-link>
        <router-link to="/register">/register</router-link>
      </ul>

      <ul v-if="!isGuest">
        <router-link to="/orders/new">/new</router-link>
        <a href='/' @click.prevent="logout">/logout</a>
      </ul>
    </nav>
  </header>
</template>


<script>
  export default {
    computed: {
      isGuest() {
        return this.$store.state.user.role === 'guest'
      },
      isClient() {
        return this.$store.state.user.role === 'client'
      },
      isAssistant() {
        return this.$store.state.user.role === 'assistant'
      }
    },
    methods: {
      logout() {
        this.$store.commit('logout')
      }
    }
  }
</script>


<style scoped>
  .guest {
    color: green;
  }

  .client {
    color: red;
  }

  .assistant {
    color: blue;
  }
</style>
