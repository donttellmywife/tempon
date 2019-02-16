<template>
  <main-layout>
    <h2>NEW SHIPMENT</h2>

    <Loading v-if="isLoading" />

    <p v-if="error" class="error">{{ error }}</p>


    <aside v-if="orders.length">
      SIDE BAR WITH POSSIBLE ORDERS

      <label v-for="ord in orders">
        {{ ord._id }}
        <input type="checkbox" :value="ord" v-model="cargos">
      </label>
    </aside>


    <main>
      <label>fnsku: <input type="text" v-model="fnsku"></label>
      <label>what's in the box?<input v-model="description" placeholder="description" type="text"></label><br>

      <div v-if="cargos.length">
        <div v-for="ord in cargos">
          <div>{{ ord.description.expected }}</div>
          <label>and how many?<input placeholder="quantity" type="number" v-model="ord.quantity.left"></label><br>
        </div>
      </div>

      <button v-on:click="create">let us handle it!</button><br>
    </main>

    <!-- <form v-if="!loading" @submit.prevent="create">
      <label>what's in the box?<input v-model="description" placeholder="description" type="text"></label><br>
      <label>and how many?<input v-model="quantity" placeholder="quantity" type="number"></label><br>
      <label>how to find it<input v-model="tracking" placeholder="tracking" type="text"></label><br>
      <label>labels<input v-model="labels" placeholder="link to gdocs" type="text"></label><br>
    </form> -->
  </main-layout>
</template>


<script>
  import { orders, fba } from 'API'
  import { MainLayout } from 'LAYOUT'
  import { Loading } from 'COMPONENT'


  export default {
    data() {
      return {
        description: '',
        // labels: '',
        orders: [],
        cargos: [],
        fnsku: '',

        error: '',
        isLoading: false,
      }
    },


    mounted() {
      this.fetchData()
    },


    methods: {
      create() {
        const cargos = this.cargos.map(c => ({ _id: c._id, quantity: c.quantity.left }))

        const shipment = {
          description: this.description,
          fnsku: this.fnsku,
          cargos,
        }

        // console.log(shipment);
        fba.add(shipment).then(console.log).catch(err => this.error = err)
      },


      fetchData() {
        this.isLoading = true
        this.error = ''

        orders.list()
          .then(res => res.data)
          .then(orders => {
            this.orders = orders.filter(order => order.status === 'done')
          })
          .catch(err => this.error = err.toString())
          .then(() => this.isLoading = false)
      },
    },


    components: {
      MainLayout,
      Loading,
    },
  }
</script>
