<template>
<main-layout>
  <h2>ASSIST SHIPMENT</h2>

  <Loading v-if="isLoading" />
  <p v-if="error" class="error">{{ error }}</p>

  <form v-if="!(isLoading && error)" @submit.prevent="update">
    <h6>status: {{ shipment.status }}</h6>

    <div class="form-group">
      <label>Set priority: <select v-model="shipment.priority" class="form-control">
        <option v-for="option in possiblePriority" :value="option">
          {{ option }}
        </option>
      </select></label>
    </div>

    <div class="form-group">
      <label>what's in the box?<br>
        <input
          v-model="shipment.description"
          class="form-control"
          placeholder="description"
          type="text">
      </label>
    </div>

    <div class="form-group">
      <label>Link to fnksu<br>
        <input
          v-model="shipment.fnsku"
          class="form-control"
          placeholder="http://docs.google.com/"
          type="text">
      </label>
    </div>

    <div class="form-group">
      <label>Inside consists of such cargos: </label>
      <div v-for="cargo in shipment.cargos">{{ cargo.quantity }} - {{ cargo._id }}</div>
    </div>

    <div class="form-group">
      Box dimensions (could be many?):<br>
        <label>Length<br>
          <input v-model="shipment.dimensions.depth" class="form-control form-control-sm" placeholder="10ft" type="number">
        </label><br>
        <label>Width<br>
          <input v-model="shipment.dimensions.width" class="form-control form-control-sm" placeholder="5ft" type="number">
        </label><br>
        <label>Height<br>
          <input v-model="shipment.dimensions.height" class="form-control form-control-sm" placeholder="5ft" type="number">
        </label><br>
        <label>Weight<br>
          <input v-model="shipment.dimensions.weight" class="form-control form-control-sm" placeholder="10lbs" type="text">
        </label><br>

      <label>Link to labels<br>
        <input
          v-model="shipment.labels"
          class="form-control"
          placeholder="http://docs.google.com/"
          type="text">
      </label>
    </div>

    <button v-if="shipment.status !== 'shipped'" type="submit" class="btn btn-primary">
      {{ shipment.status === 'ready' ? 'START SHIPMENT' : 'UPDATE SHIPMENT' }}
    </button>
  </form>
</main-layout>
</template>


<script>
  import fbaMixin from './mixin.js'


  export default {
    mixins: [fbaMixin],

    data() {
      return {
        possiblePriority: ['normal', 'low', 'high', 'urgent'],
      }
    },
  }
</script>
