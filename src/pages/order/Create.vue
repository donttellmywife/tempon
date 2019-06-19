<template>
<main-layout>
<h2>NEW ORDER</h2>
<Err v-if="error" :msg="error" />

<form @submit.prevent="create">
  <div class="form-group">
    <label>Describe order
      <input v-model.trim="description" class="form-control" placeholder="description" type="text" minlength="1" required>
    </label>
  </div>


  <div class="form-group">
    <label>Total qty
      <input v-model="quantity" class="form-control" placeholder="quantity" type="number" min="1" required>
    </label>
  </div>


  <div class="form-group">
    <label>Link to product or image of a product
      <div v-for="(info, index) in productInfo" style="display: flex">
        <input v-model.trim="info.url" class="form-control" placeholder="http://amazon.com/product" type="text">
        <span @click.prevent="(e) => removeInfo(e, index)" class="badge badge-light">remove</span>
      </div>
      <button @click.prevent="addEmptyInfo" class="btn btn-outline-secondary btn-sm">add link</button>
    </label>
  </div>


  <div class="form-group">
    <label>Track with
      <div v-for="(track, index) in tracking" style="display: flex">
        <input v-model.trim="track.value" class="form-control" placeholder="tracking" type="text" minlength="6" maxlength="16" required>
        >
        <input v-model.trim="track.quantity" class="form-control" placeholder="in amount of" type="number" min="1" :max="quantity">
        <span @click.prevent="(e) => removeTrack(e, index)" class="badge badge-light">remove</span>
      </div>
      <button @click.prevent="addEmptyTrack" class="btn btn-outline-secondary btn-sm">add track</button>
    </label>
  </div>


  <button type="submit" class="btn btn-primary" :disabled="!isCreatable">create new order</button>
</form>
</main-layout>
</template>


<script>
  import { orders } from 'API'
  import { MainLayout } from 'LAYOUT'
  import { Err } from 'COMPONENT'


  export default {
    data() {
      return {
        description: '',
        quantity: 0,
        productInfo: [],
        tracking: [],

        // labels: '',
        error: '',
      }
    },


    computed: {
      isCreatable() {
        const all = parseInt(this.quantity, 10)
        const sum = this.tracking.reduce((sum, track) => sum + parseInt(track.quantity, 10), 0)
        return all && all === sum
      },
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
          tracking: this.tracking.filter(({ value }) => value.length > 0),
          productInfo: this.productInfo.filter(({ url }) => url.length > 0),

          comment: '',
        }

        orders.add(order).then(() => this.$router.push('/')).catch(err => this.error = err)
      },


      addEmptyTrack(e) {
        const sum = this.tracking.reduce((sum, track) => sum + parseInt(track.quantity, 10), 0)
        const left = parseInt(this.quantity, 10) - sum
        this.tracking = this.tracking.concat({ value: '', quantity: left })
      },
      removeTrack(e, index) {
        this.tracking = this.tracking.slice(0, index).concat(this.tracking.slice(index + 1))
      },


      addEmptyInfo(e) {
        this.productInfo = this.productInfo.concat({ url: '' })
      },
      removeInfo(e, index) {
        this.productInfo = this.productInfo.slice(0, index).concat(this.productInfo.slice(index + 1))
      },
    },


    components: {
      MainLayout,
      Err,
    },
  }
</script>
