<template>
<main-layout>
  <h2>SHIPMENTS</h2>

  <Loading v-if="isLoading" />

  <div v-if="!isLoading">
    <div v-if="error">{{ error }}</div>


    <ul class="nav nav-pills nav--close">
      type:
      <li class="nav-item">
        <div @click="(e) => chooseType('')" :class="{ active: activeType === ''}" class="nav-link">ALL</div>
      </li>
      <li class="nav-item">
        <div @click="(e) => chooseType('fbas')" :class="{ active: activeType === 'fbas'}" class="nav-link">FBA shipments</div>
      </li>
      <li class="nav-item">
        <div @click="(e) => chooseType('fbms')" :class="{ active: activeType === 'fbms'}" class="nav-link">FBM shipments</div>
      </li>

      &nbsp; &nbsp; &nbsp; status:
      <li class="nav-item">
        <div @click="(e) => chooseStatus('')" :class="{ active: activeStatus === ''}" class="nav-link">ALL</div>
      </li>
      <li class="nav-item">
        <div @click="(e) => chooseStatus('todo')" :class="{ active: activeStatus === 'todo'}" class="nav-link">todo</div>
      </li>
      <li class="nav-item">
        <div @click="(e) => chooseStatus('in progress')" :class="{ active: activeStatus === 'in progress'}" class="nav-link">in progress</div>
      </li>
      <li class="nav-item">
        <div @click="(e) => chooseStatus('ready')" :class="{ active: activeStatus === 'ready'}" class="nav-link">ready</div>
      </li>
      <li class="nav-item">
        <div @click="(e) => chooseStatus('shipped')" :class="{ active: activeStatus === 'shipped'}" class="nav-link">shipped</div>
      </li>
    </ul>
    <br>


    <ul v-if="fbas.length && (!activeType || activeType === 'fbas')">
      FBAS:
      <fba-client v-for="ship in fbas" v-if="!activeStatus || ship.status === activeStatus" :key="ship._id" :shipment="ship" />
    </ul>

    <hr>

    <ul v-if="fbms.length && (!activeType || activeType === 'fbms')">
      FBMS:
      <fbm-client v-for="ship in fbms" v-if="!activeStatus || ship.status === activeStatus" :key="ship._id" :shipment="ship" />
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

        activeType: '',
        activeStatus: '',

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


      chooseType(tabName) {
        this.activeType = tabName
      },

      chooseStatus(statusName) {
        this.activeStatus = statusName
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
