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

  <div class="form-group">
    <label>fnsku:
      <div v-for="(label, index) in shipment.fnsku" style="display: flex">
        <input v-model.trim="label.url" class="form-control" placeholder="http://gdocs.com" type="text">
        <span @click.prevent="(e) => removeFNSKU(e, index)" class="badge badge-light">remove</span>
      </div>

      <button @click.prevent="addEmptyFNSKU" class="btn btn-outline-secondary btn-sm">add label</button>
    </label>
  </div>

  <!-- <div class="form-group">
    <label>Inside consists of such cargos: </label>
    <div v-for="cargo in shipment.cargos">{{ cargo.quantity }} - {{ cargo._id }}</div>
  </div> -->

  BLABLABLA

  <div v-if="possibleCargos.length" class="form-group">
    <hr>
    <div v-for="ord in possibleCargos">
      <label><span class="text-primary">{{ ord.description }}</span> in amount of
        <input v-model="ord.quantity" class="form-control form-control-sm" placeholder="1" type="number" min=1>
      </label><br>
    </div>
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

POSSIBLE: {{ possibleCargos }}

<aside v-if="showOrders" class="clm">
  Choose orders:

  <label v-for="ord in orders">
    <input type="checkbox" :value="ord._id" @input="updateCargos" :checked="selectedOrders.some(({ _id}) => _id === ord._id)"> {{ ord.description.expected }}
  </label><br>
</aside>

</main-layout>
</template>


<script>
  import fbaMixin from './mixin.js'


  export default {
    mixins: [fbaMixin],


    methods: {
      updateCargos(e) {
        this.$store.commit('toggleSelectedOrder', { selected: e.target.checked, id: e.target.value })
      },
    },


    // computed: {
    //   possibleCargos() {
    //     console.log('AD: ', this.selectedOrders)
    //     console.log('BD: ', this.shipment.cargos)
    //     const a = this.selectedOrders
    //       .filter(({ _id }) => this.shipment.cargos.some(c => c._id !== _id))
    //       .concat(this.shipment.cargos)
    //       .map(({ _id, quantity, description }) => ({ _id, quantity: quantity.left || quantity, description: description && description.expected || ''}))
    //     return a
    //   }
    // }
  }
</script>
