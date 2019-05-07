<template>
<main-layout>
  <h2>ORDERS</h2>

  <Loading v-if="isLoading" />

  <div v-if="!isLoading">
    <div v-if="error">{{ error }}</div>

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

    <ul v-if="items.length && !error">
      <cargo-client v-for="ord in items" v-if="!activeTab || ord.status === activeTab" :key="ord._id" :cargo="ord" />
    </ul>
  </div>
</main-layout>
</template>


<script>
  import { MainLayout } from 'LAYOUT'
  import { Loading, CargoClient } from 'COMPONENT'
  import { orders } from 'API'
  const { list } = orders


  export default {
    data() {
      return {
        items: [],

        activeTab: '',
        error: '',
        isLoading: true,
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
          .then(items => this.items = items)
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
      CargoClient,
    },
  }
</script>
