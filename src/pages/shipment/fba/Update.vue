<template>
<main-layout>
  <div>Created At: {{ formatDate(shipment.createdAt) }}</div>
  <div>
    <span>{{ shipment.status }}</span>
    <label>fnsku: <br>
      <input v-model="shipment.fnsku" :disabled="shipment.status !== 'todo'" placeholder="fnsku" type="text">
    </label><br>

    <label>what's in the box?<br>
      <input v-model="shipment.description" :disabled="shipment.status !== 'todo'" placeholder="description" type="text">
    </label><br>

    <button v-if="shipment.status === 'todo'" @click="update">Update</button>
  </div>

  <div>
    <li v-for="cargo in shipment.cargos">
      {{ cargo.quantity }}
    </li>
  </div>

  <div v-if="shipment.status === 'in progress'">
    {{ shipment.dimensions.depth }}
    {{ shipment.dimensions.height }}
    {{ shipment.dimensions.width }}
    {{ shipment.dimensions.weight }}

    <input v-model="shipment.labels" placeholder="labels" type="text" />

    <button @click="update">Agree, we can ship it?</button>
  </div>
</main-layout>
</template>


<script>
  import fbaMixin from './mixin.js'


  export default {
    mixins: [fbaMixin],
  }
</script>
