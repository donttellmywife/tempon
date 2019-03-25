<template>
<main-layout>
  <h2>NEW ORDER</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <form @submit.prevent="create">
    <div class="form-group">
      <label>Describe order
        <input v-model="description" class="form-control" placeholder="description" type="text">
      </label>
    </div>

    <div class="form-group">
      <label>In quantity of
        <input v-model="quantity" class="form-control" placeholder="quantity" type="number">
      </label>
    </div>

    <div class="form-group">
      <label>Track with <button @click="addEmptyTrack" class="btn btn-outline-secondary btn-sm">add tracking</button>
        <!-- <span class="badge badge-secondary">Secondary</span> -->
        <div v-for="track in tracking">
          <input v-model.trim="track.value" class="form-control" placeholder="tracking" type="text">
        </div>

      </label>
    </div>

    <!-- <label>labels<br>
      <input v-model.trim="labels" placeholder="link to gdocs" type="text">
    </label><br> -->

    <button type="submit" class="btn btn-primary">create new order</button>
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
        // labels: '',

        error: '',
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
          // labels: this.labels,
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
