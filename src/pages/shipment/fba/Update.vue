<template>
<main-layout>
  <h2>UPDATE FBA SHIPMENT</h2>

  <span v-if="isLoading">loading...</span>
  <p v-if="error" class="error">{{ error }}</p>

  <!-- <div>Created At: {{ formatDate(shipment.createdAt) }}</div> -->


  <form v-if="!(isLoading && error)" @submit.prevent="update">
    <div class="form-group">
      <label>what's in the box?<br>
        <input
          v-model="shipment.description"
          :disabled="shipment.status !== 'todo'"
          class="form-control"
          placeholder="description"
          type="text">
      </label>
    </div>

    <div class="form-group">
      <label>Link to fnksu<br>
        <input
          v-model="shipment.fnsku"
          :disabled="shipment.status !== 'todo'"
          class="form-control"
          placeholder="http://docs.google.com/"
          type="text">
      </label>
    </div>

    <div class="form-group">
      <label>Inside consists of such cargos: </label>
      <div v-for="cargo in shipment.cargos">{{ cargo.quantity }} - {{ cargo._id }}</div>
    </div>

    <div v-if="shipment.status !== 'todo'" class="form-group">
      Box dimensions:
        length: {{ shipment.dimensions.depth }} <br>
        width: {{ shipment.dimensions.width }} <br>
        height: {{ shipment.dimensions.height }} <br>
        weight: {{ shipment.dimensions.weight }} <br>

      <label>Link to labels<br>
        <input
          v-model="shipment.labels"
          :disabled="shipment.status !== 'in progress'"
          class="form-control"
          placeholder="http://docs.google.com/"
          type="text">
      </label>
      <button type="submit" class="btn btn-primary">yes, please ship it</button>
    </div>

    <button v-if="shipment.status === 'todo'" type="submit" class="btn btn-primary">Update</button>
  </form>

</main-layout>
</template>


<script>
  import fbaMixin from './mixin.js'


  export default {
    mixins: [fbaMixin],
  }
</script>
