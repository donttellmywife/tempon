<template>
<main-layout>
  <h2>NEW FBA SHIPMENT</h2>
  <Loading v-if="isLoading" />
  <p v-if="error" class="error">{{ error }}</p>


  <div class="two-sides">
    <main class="clm">
      <label>fnsku: <br>
        <input type="text" v-model="fnsku">
      </label><br>

      <label>what's in the box?<br>
        <input v-model="description" placeholder="description" type="text">
      </label><br>

      <div v-if="cargos.length">
        <hr>
        <div v-for="ord in cargos">
          <div>{{ ord.description.expected }}</div>

          <label>and how many?<br>
            <input placeholder="quantity" type="number" v-model="ord.quantity.left">
          </label>
        </div>
      </div>

      <button v-on:click="create">let us handle it!</button><br>
    </main>


    <aside v-if="orders.length" class="clm">
      Choose orders:

      <label v-for="ord in orders">
        <input type="checkbox" :value="ord" v-model="cargos">
        {{ ord.description.expected }}
      </label><br>
    </aside>
  </div>
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

        fba.add(shipment)
          .then(({ data }) => this.$router.push({ name: 'viewFBA', params: { sid: data._id }}))
          .catch(err => this.error = err)
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
