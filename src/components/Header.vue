<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">
      TEMP<span v-if="isGuest" class="text-danger">OFF</span><span v-if="!isGuest" class="text-success">ON</span>
    </router-link>

    <span>
      <span>FOR DEV:&nbsp;</span>
      <span v-if="isGuest">GUEST MODE</span>
      <span v-if="isClient">CLIENT MODE</span>
      <span v-if="isAssistant">ASSISTANT MODE</span>
    </span>

    <ul v-if="isGuest" class="navbar-nav navbar-nav--row">
      <li class="nav-item"><router-link to="/login">/login</router-link></li>
      <li class="nav-item"><router-link to="/register">/register</router-link></li>
    </ul>

    <ul v-if="!isGuest" class="navbar-nav navbar-nav--row">
      <li class="nav-item"><router-link to="/orders/new">/new order</router-link></li>
      <li class="nav-item"><router-link to="/shipment/fba/new">/new shipment</router-link></li>
      <li class="nav-item"><router-link to="/shipment/fba">/shipments</router-link></li>
      <li class="nav-item"><a href='/' @click.prevent="logout">/logout</a></li>
    </ul>
  </nav>
</template>


<script>
  export default {
    computed: {
      isGuest() {
        return this.$store.getters.user.role === 'guest'
      },
      isClient() {
        return this.$store.getters.user.role === 'client'
      },
      isAssistant() {
        return this.$store.getters.user.role === 'assistant'
      }
    },


    methods: {
      logout() {
        this.$store.commit('logout')
      }
    }
  }
</script>
