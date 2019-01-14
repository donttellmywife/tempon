<template>
  <main-layout>
    <p>Welcome home</p>

    <span v-if="id">For client: list of his orders</span>
    <span v-if="!id">For assistant: list of all orders</span>

    <Orders :client-id="id" />
  </main-layout>
</template>


<script>
  import { MainLayout } from 'LAYOUT'
  import { Orders } from 'COMPONENT'


  export default {
    computed: {
      id() {
        // show either client list either all list
        return this.$store.getters.user.role === 'client'
          ? this.$store.getters.user.id
          : ''
      }
    },


    components: {
      MainLayout,
      Orders
    }
  }
</script>
