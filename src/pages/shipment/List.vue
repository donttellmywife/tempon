<template>
  <main-layout>
    <p>Welcome home</p>

    <Loading v-if="isLoading" />

    <div v-if="!isLoading">
      <div v-if="error">{{ error }}</div>

      <ul v-if="fbas.length">
        FBAS:
        <fba-client v-if="isClient" v-for="ship in fbas" :key="ship._id" :shipment="ship" />

        <fba-assist v-if="!isClient" v-for="ship in fbas" :key="ship._id" :shipment="ship" />
      </ul>

      <hr />

      <ul v-if="fbms.length">
        FBMS:
        <fbm-client v-if="isClient" v-for="ship in fbms" :key="ship._id" :shipment="ship" />

        <fbm-assist v-if="!isClient" v-for="ship in fbms" :key="ship._id" :shipment="ship" />
      </ul>
    </div>
  </main-layout>
</template>


<script>
  import { MainLayout } from 'LAYOUT'
  import { Loading, FbaClient, FbaAssist, FbmClient, FbmAssist } from 'COMPONENT'
  import { fba, fbm, shipment } from 'API'


  export default {
    data() {
      return {
        isLoading: true,
        fbas: [],
        fbms: [],
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
          .then(items => this.fbas = items)
          .catch(err => this.error = err.toString())
          .then(() => this.isLoading = false)

        fbm.list()
          .then(res => res.data)
          .then(items => this.fbms = items)
          .catch(err => this.error = err.toString())
          .then(() => this.isLoading = false)
      }
    },


    components: {
      MainLayout,
      Loading,
      FbaClient,
      FbaAssist,
      FbmClient,
      FbmAssist,
    },
  }
</script>
