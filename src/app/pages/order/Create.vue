<template>
  <main-layout>
    <h2>NEW ORDER</h2>

    <span v-if="loading">loading...</span>

    <form v-if="!loading" @submit.prevent="create">
      <label>what's in the box?<input v-model="description" placeholder="description" type="text"></label><br>
      <label>and how many?<input v-model="quantity" placeholder="quantity" type="number"></label><br>
      <label>how to find it<input v-model="tracking" placeholder="tracking" type="text"></label><br>
      <label>labels<input v-model="labels" placeholder="link to gdocs" type="text"></label><br>

      <button type="submit">let us handle it!</button><br>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </main-layout>
</template>


<script>
import { orders } from 'API'
import { MainLayout } from 'LAYOUT'

const approve = {
  status: false,
  at: null,
  by: null,
  actual: ""
}


export default {
  data() {
    return {
      description: '',
      quantity: '',
      tracking: '',
      labels: '',
      error: '',
      loading: false,
      // comment: '',
      // options: '',
      // assistant: false,
    }
  },


  methods: {
    create() {
      const order = {
        author: this.$store.getters.user.id,
        status: 0,
        description: {
          hopes: this.description,
          approve
        },
        quantity: {
          hopes: this.quantity,
          approve,
        },
        tracking: this.tracking,
        labels: this.labels,
        createdAt: new Date(),
        comment: '',
      }

      orders.add(order).then(console.log).catch(err => this.error = err)
    }
  },


  components: {
    MainLayout
  },
}
</script>
