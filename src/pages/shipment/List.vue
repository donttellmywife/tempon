<template>
<main-layout>
<h2>SHIPMENTS</h2>

<div>
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

  <div>
    <Loading v-if="fbaLoader" />
    <Err v-if="fbaError" :msg="fbaError" />

    <ul v-if="fbaShow">
      FBAS:
      <fba-client v-for="ship in fbas" v-if="!activeStatus || ship.status === activeStatus" :key="ship._id" :shipment="ship" />
    </ul>
  </div>

  <div>
    <Loading v-if="fbmLoader" />
    <Err v-if="fbmError" :msg="fbmError" />

    <ul v-if="fbmShow">
      FBMS:
      <fbm-client v-for="ship in fbms" v-if="!activeStatus || ship.status === activeStatus" :key="ship._id" :shipment="ship" />
    </ul>
  </div>
</div>
</main-layout>
</template>


<script>
  import { MainLayout } from 'LAYOUT'
  import { Loading, FbaClient, FbmClient, Err } from 'COMPONENT'
  import { fba, fbm, shipment } from 'API'


  export default {
    data() {
      return {
        activeType: '',
        activeStatus: '',
      }
    },


    computed: {
      fbas() {
        return this.$store.getters.fbas
      },
      fbaShow() {
        return this.$store.getters.fbas.length && (!this.activeType || this.activeType === 'fbas')
      },
      fbaError() {
        return this.$store.getters.ui_fbasError
      },
      fbaLoader() {
        return this.$store.getters.ui_ordersLoading
      },


      fbms() {
        return this.$store.getters.fbms
      },
      fbmShow() {
        return this.$store.getters.fbms.length && (!this.activeType || this.activeType === 'fbms')
      },
      fbmError() {
        return this.$store.getters.ui_fbmsError
      },
      fbmLoader() {
        return this.$store.getters.ui_fbmsLoader
      },

      isClient() {
        return this.$store.getters.user.role === 'client'
      },
    },


    mounted() {
      this.$store.dispatch('loadFBAS')
      this.$store.dispatch('loadFBMS')
    },


    methods: {
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
      Err,
    },
  }
</script>
