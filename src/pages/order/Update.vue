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
      <label>Track with <button @click="addEmptyTrack" class="btn btn-outline-secondary btn-sm">add tracking</button>
        <div v-for="track in order.tracking">
          <input v-model.trim="track.value" class="form-control" placeholder="tracking" type="text">
        </div>

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
