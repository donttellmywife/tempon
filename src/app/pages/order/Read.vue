<template>
  <main-layout>
    <h2>JUST OBSERVE ORDER</h2>

    <span v-if="isLoading">loading...</span>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="!(isLoading && error)">
      {{ order.status }}

      <div v-bind:class="{
        success: order.description.status,
        fail: !order.description.status && order.description.actual,
      }">

        You expecting:
        <span>{{ order.description.hopes }}</span>
        <span v-if="!order.description.status && order.description.actual">
          you know, actualy we've found there {{ order.description.actual }}
        </span>
      </div>

      <div v-bind:class="{
        success: order.quantity.status,
        fail: !order.quantity.status && order.quantity.actual,
      }">

        In amount of:
        <b>{{ order.quantity.hopes }}</b>
        <span v-if="!order.quantity.status && order.quantity.actual">
          but actualy we've found there <b>{{ order.quantity.actual }}</b>
        </span>
      </div>

      with tracking: {{ order.tracking }}<br>
      and labels: {{ order.labels }}<br>

      <button type="edit">update</button><br>
    </div>
  </main-layout>
</template>


<script>
  import { orders } from 'API'
  import { MainLayout } from 'LAYOUT'


  export default {
    data() {
      return {
        order: {
          status: '',
          description: {
            hopes: '',
            status: false,
            actual: '',
          },
          quantity: {
            hopes: '',
            status: false,
            actual: '',
          },
          tracking: '',
          labels: '',
        },
        error: '',
        isLoading: true,
      }
    },


    created() {
      this.fetch()
    },


    methods: {
      fetch() {
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
