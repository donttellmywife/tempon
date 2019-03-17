<template>
  <main-layout>
    <p>Welcome home</p>

    <Loading v-if="isLoading" />

    <div v-if="!isLoading">
      <div v-if="error">{{ error }}</div>

      <ul v-if="items.length && !error">
        <cargo-client v-for="ord in items" :key="ord._id" :cargo="ord" />
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
      }
    },


    components: {
      MainLayout,
      Loading,
      CargoClient,
    },
  }
</script>
