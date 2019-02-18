<template>
  <main-layout>
    <h2>NEW ORDER</h2>

    <span v-if="loading">loading...</span>

    <p v-if="error" class="error">{{ error }}</p>

    <form v-if="!loading" @submit.prevent="create">
      <label>what's in the box?<br>
        <input v-model="description" placeholder="description" type="text">
      </label>
      <br>

      <label>and how many?<br>
        <input v-model="quantity" placeholder="quantity" type="number">
      </label><br>

      <label>how to find it<br>
        <input v-model="tracking" placeholder="tracking" type="text">
      </label><br>

      <label>labels<br>
        <input v-model="labels" placeholder="link to gdocs" type="text">
      </label><br>

      <button type="submit">let us handle it!</button>
    </form>
  </main-layout>
</template>


<script>
  import { orders } from 'API'
  import { MainLayout } from 'LAYOUT'


  export default {
    data() {
      return {
        description: '',
        quantity: '',
        tracking: '',
        labels: '',
        error: '',
        loading: false,
      }
    },


    methods: {
      create() {
        const order = {
          description: {
            expected: this.description,
          },
          quantity: {
            expected: this.quantity,
            left: this.quantity,
          },
          tracking: this.tracking,
          labels: this.labels,
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
