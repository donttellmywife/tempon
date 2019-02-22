<template>
  <main-layout>
    <p>Welcome home</p>

    <Loading v-if="isLoading" />

    <div v-if="!isLoading">
      <div v-if="error">{{ error }}</div>

      <ul v-if="items.length">
        <fba-client v-if="isClient" v-for="ship in items" :key="ship._id" :shipment="ship" />

        <fba-assist v-if="!isClient" v-for="ship in items" :key="ship._id" :shipment="ship" />
      </ul>
    </div>
  </main-layout>
</template>


<script>
  import { MainLayout } from 'LAYOUT'
  import { Loading, FbaClient, FbaAssist } from 'COMPONENT'
  import { fba } from 'API'


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

        fba.list()
          .then(res => res.data)
          .then(items => this.items = items)
          .catch(err => this.error = err.toString())
          .then(() => this.isLoading = false)
      }
    },


    components: {
      MainLayout,
      Loading,
      FbaClient,
      FbaAssist
    },
  }
</script>
