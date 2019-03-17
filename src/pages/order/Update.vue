<template>
<main-layout>
  <h2>UPDATE ORDER</h2>

  <span v-if="isLoading">loading...</span>

  <p v-if="error" class="error">{{ error }}</p>

  <form v-if="!(isLoading && error)" @submit.prevent="update">
    <label>what's in the box?<input v-model="order.description.expected" placeholder="description" type="text"></label><br>
    <label>and how many?<input v-model="order.quantity.expected" placeholder="quantity" type="number"></label><br>
    <label>how to find it<br>
      <div v-for="track in order.tracking">
        <input v-model.trim="track.value" placeholder="tracking" type="text">
      </div>
      <button @click="addEmptyTrack">add tracking</button>
    </label><br>
    <label>labels<input v-model.trim="order.labels" placeholder="link to gdocs" type="text"></label><br>

    <button type="submit">SAVE</button><br>
  </form>
</main-layout>
</template>


<script>
import orderMixin from './mixin.js'


export default {
  mixins: [orderMixin],
}
</script>
