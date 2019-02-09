<template>
  <main-layout>
    <p>Welcome home</p>

    <Loading v-if="isLoading" />

    <div v-if="!isLoading">
      <div v-if="error">{{ error }}</div>

      <ul v-if="items.length">
        <cargo-client v-if="isClient" v-for="ord in items" :key="ord._id" :cargo="ord" />

        <cargo-assist v-if="!isClient" v-for="ord in items" :key="ord._id" :cargo="ord" />
      </ul>
    </div>
  </main-layout>
</template>


<script>
  import { MainLayout } from 'LAYOUT'
  import { Loading, CargoClient, CargoAssist } from 'COMPONENT'
  import { orders } from 'API'
  const { list } = orders

  export default {
    data() {
      return {
        isLoading: true,
        items: [],
        error: '',
        isClient: this.$store.getters.user.role === 'client',
      }
    },


    mounted() {
      this.fetchData()
    },


    methods: {
      fetchData() {
        this.isLoading = true
        this.error = ''

        list()
          .then(res => res.data)
          .then(items => {
            this.$store.commit('setOrders', items)
            this.items = items
          })
          .catch(err => this.error = err.toString())
          .then(() => this.isLoading = false)
      }
    },


    components: {
      MainLayout,
      Loading,
      CargoClient,
      CargoAssist
    },
  }
</script>
