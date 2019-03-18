<template>
<main-layout>
  <h2>ASSIST WITH ORDER</h2>

  <Loading v-if="isLoading" />

  <p v-if="error" class="error">{{ error }}</p>

  <form v-if="!(isLoading && error)" @submit.prevent="update">
    <div>
      IS IN: <span>{{ order.description.expected }}</span><br>
      <div v-if="order.status !== 'done'">
        <label>YES! <input type="checkbox" v-model="order.description.status"></label>
        <label v-if="!order.description.status">
          Tell client more whats up <input type="text" v-model="order.description.actual" placeholder="what's in there?">
        </label>
      </div>
    </div>

    <div>
      THIS MANY: {{ order.quantity.expected }}<br>
      <div v-if="order.status !== 'done'">
        <label>YES! <input v-model="order.quantity.status" type="checkbox"></label>
        <label v-if="!order.quantity.status">
          Tell client more whats up <input v-model="order.quantity.actual" placeholder="amount" type="number">
        </label>
      </div>
    </div>

    <div>
      <label>how to find it<br>
        <div v-for="track in order.tracking">
          <input v-model.trim="track.value" placeholder="tracking" type="text">
        </div>
        <button v-if="order.status !== 'done'" @click="addEmptyTrack">add tracking</button>
      </label><br>
    </div>
    <div>labels {{ order.labels }}</div>

    <button v-if="order.status === 'todo'" type="submit">soon we will see something fresh</button>
  </form>
</main-layout>
</template>


<script>
import { Loading } from 'COMPONENT'
import orderMixin from './mixin.js'


export default {
  mixins: [orderMixin],

  components: {
    Loading,
  },
}
</script>
