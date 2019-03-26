<template>
<main-layout>
  <h2>SHIPMENTS</h2>

  <Loading v-if="isLoading" />

  <div v-if="!isLoading">
    <div v-if="error">{{ error }}</div>


    <ul class="nav nav-pills nav--close">
      <li class="nav-item">
        <div @click="(e) => chooseTab('')" :class="{ active: activeTab === ''}" class="nav-link">ALL</div>
      </li>
      <li class="nav-item">
        <div @click="(e) => chooseTab('fbas')" :class="{ active: activeTab === 'fbas'}" class="nav-link">TO AMAZON</div>
      </li>
      <li class="nav-item">
        <div @click="(e) => chooseTab('fbms')" :class="{ active: activeTab === 'fbms'}" class="nav-link">TO CLIENT</div>
      </li>
    </ul>
    <br>


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
