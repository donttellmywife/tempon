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
      <label>Total qty
        <input v-model="quantity" class="form-control" placeholder="quantity" type="number">
      </label>
    </div>


    <div class="form-group">
      <label>Link to product or image of a product
        <div v-for="(info, index) in productInfo" style="display: flex">
          <input v-model.trim="info.url" class="form-control" placeholder="http://amazon.com/product" type="url">
          <span @click.prevent="(e) => removeInfo(e, index)" class="badge badge-light">remove</span>
        </div>
        <button @click.prevent="addEmptyInfo" class="btn btn-outline-secondary btn-sm">add link</button>
      </label>
    </div>


    <div class="form-group">
      <label>Track with
        <div v-for="(track, index) in tracking" style="display: flex">
          <input v-model.trim="track.value" class="form-control" placeholder="tracking" type="text" minlength="6" maxlength="16"> >
          <input v-model.trim="track.quantity" class="form-control" placeholder="in amount of" type="number" min="0">
          <span @click.prevent="(e) => removeTrack(e, index)" class="badge badge-light">remove</span>
        </div>
        <button @click.prevent="addEmptyTrack" class="btn btn-outline-secondary btn-sm">add tracking</button>
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
        productInfo: [{
          url: ''
        }],
        tracking: [{
          value: '',
          quantity: 0,
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
          tracking: this.tracking.filter(({ value }) => value.length > 0),
          productInfo: this.productInfo.filter(({ url }) => url.length > 0),

          comment: '',
        }

        orders.add(order).then(() => this.$router.push('/')).catch(err => this.error = err)
      },


      addEmptyTrack(e) {
        this.tracking = this.tracking.concat({ value: '', quantity: '' })
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
    },
  }
</script>
