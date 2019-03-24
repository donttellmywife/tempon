<template>
<main-layout>
  <p>Welcome home</p>

  <Loading v-if="isLoading" />

  <div v-if="!isLoading">
    <div v-if="error">{{ error }}</div>

    <div>
      SHOWING ONLY: {{ activeTab.toUpperCase() || 'ALL' }}
      <div @click="(e) => chooseTab('')">ALL</div>
      <div @click="(e) => chooseTab('fbas')">TO AMAZON</div>
      <div @click="(e) => chooseTab('fbms')">TO CLIENT</div>
    </div>

    <ul v-if="fbas.length && (!activeTab || activeTab === 'fbas')">
      FBAS:
      <fba-client v-for="ship in fbas" :key="ship._id" :shipment="ship" />
    </ul>

    <hr>

    <ul v-if="fbms.length && (!activeTab || activeTab === 'fbms')">
      FBMS:
      <fbm-client v-for="ship in fbms" :key="ship._id" :shipment="ship" />
    </ul>
  </div>
</main-layout>
</template>


<script>
  import { MainLayout } from 'LAYOUT'
  import { Loading, FbaClient, FbmClient } from 'COMPONENT'
  import { fba, fbm, shipment } from 'API'


  export default {
    data() {
      return {
        fbas: [],
        fbms: [],

        activeTab: '',

        error: '',
        isLoading: true,
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
      },


      chooseTab(tabName) {
        this.activeTab = tabName
      }
    },


    components: {
      MainLayout,
      Loading,
      FbaClient,
      FbmClient,
    },
  }
</script>
