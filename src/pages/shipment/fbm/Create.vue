<template>
<main-layout>
  <h2>NEW FBM SHIPMENT</h2>

  <Loading v-if="isLoading" />

  <p v-if="error" class="error">{{ error }}</p>


  <aside v-if="orders.length">
    SIDE BAR WITH POSSIBLE ORDERS

    <label v-for="ord in orders">
      {{ ord.description.expected }}
      <input type="checkbox" :value="ord" v-model="cargos">
    </label>
  </aside>


  <main>
    <label>Where to? <br>
      <input type="text" v-model="address">
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


    <div>
      <span>Any additional packing? {{ packing }}</span>
      <label>
        <input type="checkbox" value="box" v-model="packing">
      box</label>
      <label>
        <input type="checkbox" value="A4 envelope" v-model="packing">
      A4 envelope</label>
      <label>
        <input type="checkbox" value="bubble wrap" v-model="packing">
      bubble wrap</label>
      <br>
    </div>


    <div>
      <span>Select courier! {{ courier }}</span><br>
      <label>
        <input type="radio" value="DHL" v-model="courier">
      DHL</label>
      <br>

      <label>
        <input type="radio" value="USPS" v-model="courier">
      USPS</label>

      <label>
        <input type="radio" value="FEDEX" v-model="courier">
      FEDEX</label>
      <br>
      <!-- Others -->
      <label>
        <input type="radio" value="OTHER" v-model="courier">
      OTHER</label>
      <br>
      <label v-if="showCustomCourier">custom courier:
        <input v-model="customCourier" placeholder="input your courier" />
      </label>
    </div>

    <button @click="create">create new shipment</button><br>
  </main>
</main-layout>
</template>


<script>
  import { orders, fbm } from 'API'
  import { MainLayout } from 'LAYOUT'
  import { Loading } from 'COMPONENT'

  // ["DHL", "USPS", "FEDEX", "OTHER"]


  export default {
    data() {
      return {
        description: '',
        orders: [],
        cargos: [],
        address: '',
        packing: [],
        courier: '',
        customCourier: '',

        error: '',
        isLoading: false,
      }
    },


    mounted() {
      this.fetchData()
    },


    computed: {
      showCustomCourier: function() {
        return this.courier === 'OTHER'
      }
    },


    methods: {
      create() {
        const cargos = this.cargos.map(c => ({ _id: c._id, quantity: c.quantity.left }))

        const shipment = {
          description: this.description,
          address: this.address,
          wrap: this.wrap,
          courier: this.customCourier || this.courier,
          cargos,
        }

        fbm.add(shipment)
          .then(({ data }) => this.$router.push({ name: 'viewFBM', params: { sid: data._id }}))
          .catch(err => this.error = err)
      },


      fetchData() {
        this.isLoading = true
        this.error = ''

        orders.list()
          .then(res => res.data)
          .then(orders => {
            this.orders = orders.filter(order => order.status === 'done').filter(order => order.quantity.left > 0)
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
