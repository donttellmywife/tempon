<template>
<main-layout>
  <h2>UPDATE SHIPMENT</h2>

  <Loading v-if="isLoading" />

  <p v-if="error" class="error">{{ error }}</p>


  <aside v-if="orders.length">
    SIDE BAR WITH POSSIBLE ORDERS

    <label v-for="ord in orders">
      {{ ord.description.expected }}
      <input type="checkbox" :value="ord" v-model="orders">
    </label>
  </aside>


  <main>
    <label>Where to? <br>
      <input type="text" v-model="shipment.address">
    </label><br>

    <label>what's in the box?<br>
      <input v-model="shipment.description" placeholder="description" type="text">
    </label><br>

    <hr>
    <div v-for="ord in shipment.cargos">
      {{ ord.quantity }} of {{ ord._id }}<br>
    </div>


    <div>
      <span>Any additional packing? {{ shipment.packing }}</span>
      <label v-for="type in ['box', 'A4 envelope', 'bubble wrap']">
        <input type="checkbox" :value="type" v-model="shipment.packing">
        {{ type }}
        <br>
      </label>
    </div>


    <div>
      <span>Select courier! {{ shipment.courier }}</span><br>
      <label v-for="cour in possibleCourier">
        <input type="radio" :value="cour" v-model="selectedCourier">
      {{ cour }}</label><br>

      <label v-if="showCustomCourier">custom courier:
        <input v-model="shipment.courier" placeholder="input your courier" /><br>
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
  }
</script>
