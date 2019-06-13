<template>
<main-layout>
  <h2>UPDATE FBA SHIPMENT</h2>
  <Loading v-if="isLoading" />
  <Err v-if="error" :msg="error" />


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

    <!-- <div class="form-group">
      <label>Links to fnksu<br>
        <input
          v-for="fnsku in shipment.fnsku"
          v-model="fnsku.url"
          :disabled="shipment.status !== 'todo'"
          class="form-control"
          placeholder="http://docs.google.com/"
          type="text">
      </label>
    </div> -->

    <div class="form-group">
      <label>fnsku:
        <div v-for="(label, index) in shipment.fnsku" style="display: flex">
          <input v-model.trim="label.url" class="form-control" placeholder="http://gdocs.com" type="text">
          <span @click.prevent="(e) => removeFNSKU(e, index)" class="badge badge-light">remove</span>
        </div>

        <button @click.prevent="addEmptyFNSKU" class="btn btn-outline-secondary btn-sm">add label</button>
      </label>
    </div>

    <div class="form-group">
      <label>Inside consists of such cargos: </label>
      <div v-for="cargo in shipment.cargos">{{ cargo.quantity }} - {{ cargo._id }}</div>
    </div>

    <div v-if="shipment.status !== 'todo'" class="form-group">
      <div v-for="box in shipment.box">
      Box size for {{ box.description }}:
        length: {{ box.length }} <br>
        width: {{ box.width }} <br>
        height: {{ box.height }} <br>
        weight: {{ box.weight }} <br>
      </div>

      <div class="form-group" style="display: flex; flex-direction: column">
        Shipping labels<br>
        <label v-for="(label, index) in shipment.labels">
          <input
            v-model="label.url"
            :disabled="shipment.status !== 'in progress'"
            class="form-control"
            placeholder="http://docs.google.com/"
            type="text">
          <span @click.prevent="(e) => removeLabel(e, index)" class="badge badge-light">remove</span>
        </label>
        <button @click.prevent="addEmptyLabel" class="btn btn-outline-secondary btn-sm">add label</button>
      </div>


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
