<template>
  <main-layout>
    <p>Welcome home</p>

    <Loading v-if="isLoading" />

    <div v-if="!isLoading">
      <div v-if="error">{{ error }}</div>

      <div>
        TABS IN A WAY:
        <div @click="(e) => chooseTab('')">ALL</div>
        <div @click="(e) => chooseTab('todo')">TODO</div>
        <div @click="(e) => chooseTab('done')">DONE</div>
        <div @click="(e) => chooseTab('fail')">FAIL</div>
      </div>

      <ul v-if="items.length && !error">
        SHOWING ONLY: {{ activeTab.toUpperCase() || 'ALL' }}
        <cargo-client v-for="ord in items" v-if="!activeTab || ord.status === activeTab" :key="ord._id" :cargo="ord" />
      </ul>
    </div>
  </main-layout>
</template>


<script>
  import { MainLayout } from 'LAYOUT'
  import { Loading, CargoClient, CargoAssist } from 'COMPONENT'
  import { orders } from 'API'
  const { list } = orders


  function makeValueObject(value) {
    return { value }
  }

  function parse(order) {
    return {
      ...order,
      tracking: order.tracking.map(makeValueObject),
    }
  }

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
          .then(items => items.map(parse))
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
