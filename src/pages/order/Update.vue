<template>
<main-layout>
  <h2>UPDATE ORDER</h2>

  <span v-if="isLoading">loading...</span>
  <p v-if="error" class="error">{{ error }}</p>

  <form v-if="!(isLoading && error)" @submit.prevent="update">
    <div class="form-group">
      <label>Describe order
        <input v-model="order.description.expected" class="form-control" placeholder="description" type="text">
      </label>
    </div>


    <div class="form-group">
      <label>In quantity of
        <input v-model="order.quantity.expected" class="form-control" placeholder="quantity" type="number">
      </label>
    </div>


    <div class="form-group">
      <label>Link to product or image of a product
        <div v-for="(info, index) in order.productInfo" style="display: flex">
          <input v-model.trim="info.url" class="form-control" placeholder="http://amazon.com/product" type="text">
          <span @click.prevent="(e) => removeInfo(e, index)" class="badge badge-light">remove</span>
        </div>
        <button @click.prevent="addEmptyInfo" class="btn btn-outline-secondary btn-sm">add link</button>
      </label>
    </div>


    <div class="form-group">
      <label>Track with
        <div v-for="(track, index) in order.tracking" style="display: flex">
          <input v-model.trim="track.value" class="form-control" placeholder="tracking" type="text" minlength="6" maxlength="16"> >
          <input v-model.trim="track.quantity" class="form-control" placeholder="in amount of" type="number" min="0">
          <span @click.prevent="(e) => removeTrack(e, index)" class="badge badge-light">remove</span>
        </div>
        <button @click.prevent="addEmptyTrack" class="btn btn-outline-secondary btn-sm">add tracking</button>
      </label>
    </div>

    <button type="submit" class="btn btn-primary">save order</button>
  </form>
</main-layout>
</template>


<script>
import orderMixin from './mixin.js'


export default {
  mixins: [orderMixin],
}
</script>
