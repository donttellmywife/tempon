<template>
<header>
  <div class="header-top">
    <router-link to="/" class="navbar-brand">
      TEMP<span v-if="isGuest" class="text-danger">OFF</span><span v-if="!isGuest" class="text-success">ON</span>
    </router-link>

    <span>
      <span>FOR DEV:&nbsp;</span>
      <span v-if="isGuest">GUEST MODE</span>
      <span v-if="isClient">CLIENT MODE</span>
      <span v-if="isAssistant">ASSISTANT MODE</span>
    </span>
  </div>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <ul v-if="isGuest" class="navbar-nav navbar-nav--row">
      <li class="nav-item" :class="{ active: $route.path == '/login'}"><router-link to="/login" class="nav-link">/login</router-link></li>
      <li class="nav-item" :class="{ active: $route.path == '/register'}"><router-link to="/register" class="nav-link">/register</router-link></li>
    </ul>

    <ul v-if="!isGuest" class="navbar-nav navbar-nav--row">
      <li :class="{ active: $route.path == '/orders' || $route.path == '/'}" class="nav-item"><router-link to="/orders" class="nav-link">/ALL orders</router-link></li>
      <li v-if="isClient" class="nav-item" :class="{ active: $route.path == '/orders/new'}"><router-link to="/orders/new" class="nav-link">/new order</router-link></li>
      <li :class="{ active: $route.path == '/shipments'}" class="nav-item"><router-link to="/shipments" class="nav-link">/ALL shipments</router-link></li>
      <li v-if="isClient" :class="{ active: $route.path == '/shipments/fba/new'}" class="nav-item"><router-link to="/shipments/fba/new" class="nav-link">/new FBA shipment</router-link></li>
      <li v-if="isClient" :class="{ active: $route.path == '/shipments/fbm/new'}" class="nav-item"><router-link to="/shipments/fbm/new" class="nav-link">/new FBM shipment</router-link></li>

      <li class="nav-item"><a href='/' @click.prevent="logout" class="nav-link">/logout</a></li>
    </ul>
  </nav>
</header>
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
      },
      currentUrl() {
        return this.$route.path
      }
    },


    methods: {
      logout() {
        this.$store.commit('logout')
        this.$router.push('/login')
      }
    }
  }
</script>
