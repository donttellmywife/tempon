<template>
<main-layout>
  <h2>ASSIST SHIPMENT</h2>

  <Loading v-if="isLoading" />

  <p v-if="error" class="error">{{ error }}</p>

  <div>
    <select v-model="shipment.priority">
      <option v-for="option in possiblePriority" :value="option">
        {{ option }}
      </option>
    </select>

    <div>Created At: {{ formatDate(shipment.createdAt) }}</div>
    <div>
      <span>{{ shipment.status }}</span>
      <label>fnsku: <br>
        <input v-model="shipment.fnsku" placeholder="fnsku" type="text">
      </label><br>

      <label>what's in the box?<br>
        <input v-model="shipment.description" placeholder="description" type="text">
      </label><br>
    </div>

    <div>
      <li v-for="cargo in shipment.cargos">
        {{ cargo.quantity }}
      </li>
    </div>

    <form v-if="shipment.status === 'todo'" @submit.prevent="update">
      How big is the box?<br>
        <label>Depth<br><input v-model="shipment.dimensions.depth" placeholder="depth" type="number"></label><br>
        <label>Height<br><input v-model="shipment.dimensions.height" placeholder="height" type="number"></label><br>
        <label>Width<br><input v-model="shipment.dimensions.width" placeholder="width" type="number"></label><br>
        <label>Weight<br><input v-model="shipment.dimensions.weight" placeholder="weight" type="text"></label><br>

      <button type="submit">let us handle it!</button><br>
    </form>

    <button v-if="shipment.status === 'ready'" @click="update">START SHIPMENT</button>
  </div>
</main-layout>
</template>


<script>
  import fbaMixin from './mixin.js'


  export default {
    mixins: [fbaMixin],

    data() {
      return {
        possiblePriority: ['', 'low', 'medium', 'high', 'urgent'],
      }
    },
  }
</script>
