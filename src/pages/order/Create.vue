<template>
<main-layout>
  <h2>NEW ORDER</h2>

  <span v-if="isLoading">loading...</span>

  <p v-if="error" class="error">{{ error }}</p>

  <form v-if="!isLoading" @submit.prevent="create">
    <label>what's in the box?<br>
      <input v-model="description" placeholder="description" type="text">
    </label>
    <br>

    <label>and how many?<br>
      <input v-model="quantity" placeholder="quantity" type="number">
    </label><br>

    <label>how to find it<br>
      <div v-for="track in tracking">
        <input v-model.trim="track.value" placeholder="tracking" type="text">
      </div>
      <button @click="addEmptyTrack">add tracking</button>
    </label><br>

    <label>labels<br>
      <input v-model.trim="labels" placeholder="link to gdocs" type="text">
    </label><br>

    <button type="submit">let us handle it!</button>
  </form>
</main-layout>
</template>


<script>
  import { orders } from 'API'
  import { MainLayout } from 'LAYOUT'


  export default {
    data() {
      return {
        description: '',
        quantity: '',
        tracking: [{
          value: '',
        }],
        labels: '',

        error: '',
        isLoading: false,
      }
    },


    methods: {
      create() {
        const order = {
          description: {
            expected: this.description,
          },
          quantity: {
            expected: this.quantity,
            left: this.quantity,
          },
          tracking: this.tracking.map(track => track.value)
            .map(track => track.trim())
            .filter(track => track.length > 0),
          labels: this.labels,
          comment: '',
        }

        orders.add(order).then(() => this.$router.push('/')).catch(err => this.error = err)
      },

      addEmptyTrack(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.tracking = this.tracking.concat({
          value: '',
        })
      }
    },


    components: {
      MainLayout
    },
  }
</script>
