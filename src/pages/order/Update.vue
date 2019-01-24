<template>
  <main-layout>
    <h2>UPDATE ORDER</h2>

    <span v-if="loading">loading...</span>

    <p v-if="error" class="error">{{ error }}</p>

    <form v-if="!(loading && error)" @submit.prevent="update">
      <label>what's in the box?<input v-model="order.description.hopes" placeholder="description" type="text"></label><br>
      <label>and how many?<input v-model="order.quantity.hopes" placeholder="quantity" type="number"></label><br>
      <label>how to find it<input v-model="order.tracking" placeholder="tracking" type="text"></label><br>
      <label>labels<input v-model="order.labels" placeholder="link to gdocs" type="text"></label><br>

      <button type="submit">soon we will see something fresh</button><br>
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
          hopes: '',
          status: false,
          at: null,
          by: null,
          actual: '',
        },
        quantity: {
          hopes: '',
          status: false,
          at: null,
          by: null,
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
