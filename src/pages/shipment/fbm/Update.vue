<template>
<main-layout>
  <h2>NEW SHIPMENT</h2>

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
      <input type="text" v-model="shipment.address">
    </label><br>

    <label>what's in the box?<br>
      <input v-model="shipment.description" placeholder="description" type="text">
    </label><br>

    <div v-if="shipment.cargos.length">
      <hr>
      <div v-for="ord in cargos">
        <div>{{ ord.description.expected }}</div>

        <label>and how many?<br>
          <input placeholder="quantity" type="number" v-model="ord.quantity.left">
        </label>
      </div>
    </div>


    <div>
      <span>Any additional packing? {{ shipment.packing }}</span>
      <label>
        <input type="checkbox" value="box" v-model="shipment.packing">
      box</label>
      <label>
        <input type="checkbox" value="A4 envelope" v-model="shipment.packing">
      A4 envelope</label>
      <label>
        <input type="checkbox" value="bubble wrap" v-model="shipment.packing">
      bubble wrap</label>
      <br>
    </div>


    <div>
      <span>Select courier! {{ courier }}</span><br>
      <label>
        <input type="radio" value="DHL" v-model="shipment.courier">
      DHL</label>
      <br>

      <label>
        <input type="radio" value="USPS" v-model="shipment.courier">
      USPS</label>

      <label>
        <input type="radio" value="FEDEX" v-model="shipment.courier">
      FEDEX</label>
      <br>
      <!-- Others -->
      <!-- <label>
        <input type="radio" value="OTHER" v-model="shipment.courier">
      OTHER</label> -->
      <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="showCustom">
        <label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
      </div>
      <br>
      <label v-if="showCustom">custom courier:
        <input v-model="customCourier" placeholder="input your courier" />
      </label>
    </div>

    <!-- <button @click="create">create new shipment</button><br> -->
  </main>
</main-layout>
</template>


<script>
  import fbmMixin from './mixin.js'


  export default {
    mixins: [fbmMixin],


    data() {
      return {
        showCustom: false,
      }
    },


    created() {
      this.fetchOrders()
    },


    // computed: {
    //   showCustomCourier: function() {
    //     return this.courier === 'OTHER'
    //   }
    // },


    // methods: {},


    components: {
      // MainLayout,
      // Loading,
    },
  }
</script>
