<template>
  <main-layout>
    <h2>ASSIST WITH ORDER</h2>

    <span v-if="loading">loading...</span>

    <p v-if="error" class="error">{{ error }}</p>

    <form v-if="!(loading && error)" @submit.prevent="update">
      <div>
        IS IN: <span>{{ order.description.hopes }}</span><br>
        <label>YES! <input type="checkbox" v-model="order.description.status"></label>
        <label v-if="!order.description.status">
          Tell client more whats up <input type="text" v-model="order.description.actual" placeholder="what's in there?">
        </label>
      </div>

      <div>
        THIS MANY: {{ order.quantity.hopes }}<br>
        <label>YES! <input v-model="order.quantity.status" type="checkbox"></label>
        <label v-if="!order.quantity.status">
          Tell client more whats up <input v-model="order.quantity.actual" placeholder="amount" type="number">
        </label>
      </div>

      <div>how to find it {{ order.tracking }}</div>
      <div>labels {{ order.labels }}</div>

      <button type="submit">soon we will see something fresh</button>
    </form>
  </main-layout>
</template>


<script>
import { orders } from 'API'
import { MainLayout } from 'LAYOUT'


export default {
  data() {
    return {
      order: {
        description: {
          expected: '',
          actual: '',
        },
        quantity: {
          expected: '',
          actual: '',
        },
        tracking: '',
        labels: '',
      },
      error: '',
      loading: false,
    }
  },


  created() {
    this.fetchData()
  },


  methods: {
    update() {
      this.isLoading = true
      this.error = ''

      orders.update(this.order)
        .then(order => this.order = order)
        .catch(err => this.error = err)
        .then(() => this.isLoading = false)
    },


    fetchData() {
      this.isLoading = true
      this.error = ''

      orders.get(this.$route.params.oid)
        .then(order => this.order = order)
        .catch(err => this.error = err)
        .then(() => this.isLoading = false)
    }
  },


  components: {
    MainLayout
  },
}
</script>
