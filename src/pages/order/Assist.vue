<template>
<main-layout>
  <h2>ASSIST WITH ORDER</h2>

  <Loading v-if="isLoading" />

  <p v-if="error" class="error">{{ error }}</p>


  <form v-if="!(isLoading && error)" @submit.prevent="update">
    <div class="form-group">
      status: {{ order.status }}
    </div>

    <div class="form-group">
      <label>Described order
        <input v-model="order.description.expected" :disabled="order.status === 'done'" class="form-control" placeholder="description" type="text">
      </label>

      <div v-if="order.status !== 'done'" class="form-check">
        <label class="form-check-label">
          <input v-model="order.description.status" class="form-check-input" type="checkbox"> exactly the same
        </label>
        <label v-if="!order.description.status">
          Tell client whats wrong <input v-model="order.description.actual" class="form-control" placeholder="what's in there?" type="text">
        </label>
      </div>
    </div>

    <div class="form-group">
      <label>In quantity
        <input v-model="order.quantity.expected" class="form-control" placeholder="quantity" type="number">
      </label>

      <div v-if="order.status !== 'done'" class="form-check">
        <label class="form-check-label">
          <input v-model="order.quantity.status" class="form-check-input" type="checkbox"> exactly the same
        </label>
        <label v-if="!order.quantity.status">
          Tell client whats wrong <input v-model="order.quantity.actual" class="form-control" placeholder="amount" type="number">
        </label>
      </div>
    </div>

    <div class="form-group">
      <label>Track with <button v-if="order.status !== 'done'" @click="addEmptyTrack" class="btn btn-outline-secondary btn-sm">add tracking</button>
        <div v-for="track in order.tracking">
          <input v-model.trim="track.value" :disabled="order.status === 'done'" class="form-control" placeholder="tracking" type="text">
        </div>
      </label>
    </div>

    <div class="form-group">
      <small>created: {{ formatDate(order.createdAt) }}</small><br>
      <small>updated: {{ formatDate(order.updatedAt) }}</small>
    </div>

    <button v-if="order.status === 'todo'" class="btn btn-primary" type="submit">assist</button>
  </form>
</main-layout>
</template>


<script>
import orderMixin from './mixin.js'


export default {
  mixins: [orderMixin],
}
</script>
