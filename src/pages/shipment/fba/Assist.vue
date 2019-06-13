<template>
<main-layout>
  <h2>ASSIST SHIPMENT</h2>
  <Loading v-if="isLoading" />
  <Err v-if="error" :msg="error" />


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
      <label>what's in the shipment?<br>
        <input
          v-model="shipment.description"
          class="form-control"
          placeholder="description"
          type="text">
      </label>
    </div>

    <div class="form-group">
      <label>Links to fnksu<br>
        <input
          v-for="fnsku in shipment.fnsku"
          v-model="fnsku.url"
          class="form-control"
          placeholder="http://docs.google.com/"
          type="text"
          disabled>
      </label>
    </div>

    <div class="form-group">
      <label>Inside consists of such cargos: </label>
      <div v-for="cargo in shipment.cargos">{{ cargo.quantity }} - {{ cargo._id }}</div>
    </div>

    <div class="form-group">
      Boxes info:<br>
      <div v-for="(b, index) in shipment.box" style="display: flex">
        <label>box #{{ index + 1 }}<br>
          <input v-model="b.descirption" class="form-control form-control-sm" placeholder="something about order" type="text">
        </label><br>
        <label>Length<br>
          <input v-model="b.length" class="form-control form-control-sm" placeholder="10ft" type="number">
        </label><br>
        <label>Width<br>
          <input v-model="b.width" class="form-control form-control-sm" placeholder="5ft" type="number">
        </label><br>
        <label>Height<br>
          <input v-model="b.height" class="form-control form-control-sm" placeholder="5ft" type="number">
        </label><br>
        <label>Weight<br>
          <input v-model="b.weight" class="form-control form-control-sm" placeholder="10lbs" type="text">
        </label>
        <span @click.prevent="(e) => removeBox(e, index)" class="badge badge-light">remove</span><br>
      </div>
      <button @click.prevent="addEmptyBox" class="btn btn-outline-secondary btn-sm">add box</button>

      <!-- <div class="form-group">
        <label>How many boxes do you want?
          <div v-for="(b, index) in box" style="display: flex">
            <input v-model.trim="b.description" class="form-control" placeholder="whats in the box?" type="text">
            <span @click.prevent="(e) => removeBox(e, index)" class="badge badge-light">remove</span>
          </div>

          <button @click.prevent="addEmptyBox" class="btn btn-outline-secondary btn-sm">add box</button>
        </label>
      </div> -->

      <!-- <label>Link to labels<br>
        <input
          v-model="shipment.labels"
          class="form-control"
          placeholder="http://docs.google.com/"
          type="text">
      </label> -->
    </div>

    <div class="form-group" style="display: flex; flex-direction: column">
      Shipping labels<br>
      <label v-for="(label, index) in shipment.labels">
        <input
          v-model="label.url"
          class="form-control"
          placeholder="http://docs.google.com/"
          type="text">
        <span @click.prevent="(e) => removeLabel(e, index)" class="badge badge-light">remove</span>
      </label>
      <button @click.prevent="addEmptyLabel" class="btn btn-outline-secondary btn-sm">add label</button>
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
