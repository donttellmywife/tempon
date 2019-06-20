<template>
<main-layout>
<h2>ORDERS</h2>


<div>
  <ul class="nav nav-pills nav--close">
    <li class="nav-item">
      <div @click="(e) => chooseTab('')" :class="{ active: activeTab === ''}" class="nav-link">ALL</div>
    </li>
    <li class="nav-item">
      <div @click="(e) => chooseTab('todo')" :class="{ active: activeTab === 'todo'}" class="nav-link">TODO</div>
    </li>
    <li class="nav-item">
      <div @click="(e) => chooseTab('done')" :class="{ active: activeTab === 'done'}" class="nav-link">DONE</div>
    </li>
    <li class="nav-item">
      <div @click="(e) => chooseTab('fail')" :class="{ active: activeTab === 'fail'}" class="nav-link">FAIL</div>
    </li>
  </ul>
  <br>

  <Loading v-if="showLoader" />
  <Err v-if="showError" :msg="showError" />

  <ul v-if="showOrders">
    <cargo-client v-for="ord in orders" v-if="!activeTab || ord.status === activeTab" :key="ord._id" :cargo="ord" />
  </ul>
</div>
</main-layout>
</template>


<script>
  import { MainLayout } from 'LAYOUT'
  import { Loading, CargoClient, Err } from 'COMPONENT'
  import { orders } from 'API'
  const { list } = orders


  export default {
    mounted() {
      if (!this.$store.getters.orders.length) this.$store.dispatch('loadOrders')
    },


    computed: {
      activeTab() {
        return this.$store.getters.ui_ordersStatus
      },
      showError() {
        return this.$store.getters.ui_ordersError
      },
      showLoader() {
        return this.$store.getters.ui_ordersLoading
      },
      showOrders() {
        return this.$store.getters.orders.length && !this.$store.getters.ui_ordersLoading && !this.$store.getters.ui_ordersError
      },
      orders() {
        return this.$store.getters.orders
      },
    },


    methods: {
      chooseTab(tabName) {
        this.$store.commit('filterOrdersByStatus', tabName)
      }
    },


    components: {
      MainLayout,
      Loading,
      CargoClient,
      Err,
    },
  }
</script>
