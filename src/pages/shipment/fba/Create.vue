<template>
<main-layout>
<h2>NEW FBA SHIPMENT</h2>
<Loading v-if="isLoading" />
<Err v-if="error" :msg="error" />


<div class="two-sides">
  <main class="clm">
    <form @submit.prevent="create">
      <div class="form-group">
        <label>fnsku:
          <div v-for="(label, index) in fnsku" style="display: flex">
            <input v-model.trim="label.url" class="form-control" placeholder="http://gdocs.com" type="text">
            <span @click.prevent="(e) => removeFNSKU(e, index)" class="badge badge-light">remove</span>
          </div>

          <button @click.prevent="addEmptyFNSKU" class="btn btn-outline-secondary btn-sm">add label</button>
        </label>
      </div>


      <div class="form-group">
        <label>How many boxes do you want?
          <div v-for="(b, index) in box" style="display: flex">
            <input v-model.trim="b.description" class="form-control" placeholder="whats in the box?" type="text">
            <span @click.prevent="(e) => removeBox(e, index)" class="badge badge-light">remove</span>
          </div>

          <button @click.prevent="addEmptyBox" class="btn btn-outline-secondary btn-sm">add box</button>
        </label>
      </div>


      <div class="form-group">
        <label>describe contents <br>
          <input v-model="description" class="form-control" placeholder="starwars lego" type="text">
        </label>
      </div>


      <div v-if="selectedOrders.length" class="form-group">
        <hr>
        <div v-for="ord in selectedOrders">
          <label><span class="text-primary">{{ ord.description.expected }}</span> in amount of
            <input v-model="ord.quantity.left" class="form-control form-control-sm" placeholder="1" type="number">
          </label><br>
        </div>
      </div>


      <button class="btn btn-primary" type="submit">create new fba shipment</button>
    </form>
  </main>


  <!-- <aside v-if="orders.length" class="clm">
    Choose orders:

    <label v-for="ord in orders">
      <input type="checkbox" :value="ord" v-model="cargos">
      {{ ord.description.expected }}
    </label><br>
  </aside> -->

  <aside v-if="orders.length" class="clm">
    Choose orders:

    <label v-for="ord in orders">
      <input type="checkbox" :value="ord._id" @input="updateCargos"> {{ ord.description.expected }}
    </label><br>
  </aside>
</div>
</main-layout>
</template>


<script>
  import { orders, fba } from 'API'
  import { MainLayout } from 'LAYOUT'
  import { Loading, Err } from 'COMPONENT'


  export default {
    data() {
      return {
        description: '',
        cargos: [],
        fnsku: [{
          url: '',
        }],
        box: [{
          description: '',
        }],

        error: '',
        isLoading: false,
      }
    },


    computed: {
      orders() {
        return this.$store.getters.orders.filter(({ status }) => status === 'done').filter(({ quantity: { left }}) => left)
      },

      selectedOrders() {
        return this.$store.getters.ui_ordersSelected
      }
    },


    mounted() {
      if (!this.$store.getters.orders.length) this.$store.dispatch('loadOrders')
    },


    methods: {
      create() {
        const cargos = this.selectedOrders.map(c => ({ _id: c._id, quantity: c.quantity.left }))

        const shipment = {
          description: this.description,
          fnsku: this.fnsku,
          cargos,
          box: this.box,
        }

        // TODO: move to store
        fba.add(shipment)
          .then(response => {
            if (response.error) return Promise.reject(response.error)
            return response
          })
          .then(({ data }) => this.$router.push({ name: 'viewFBA', params: { sid: data._id }}))
          .catch(err => this.error = err)
          .then(() => this.$store.commit('clearSelectedOrders'))
      },


      addEmptyFNSKU(e) {
        this.fnsku = this.fnsku.concat({ url: '' })
      },
      removeFNSKU(e, index) {
        this.fnsku = this.fnsku.slice(0, index).concat(this.fnsku.slice(index + 1))
      },
      addEmptyBox(e) {
        this.box = this.box.concat({ description: '' })
      },
      removeBox(e, index) {
        this.box = this.box.slice(0, index).concat(this.box.slice(index + 1))
      },


      updateCargos(e) {
        this.$store.commit('toggleSelectedOrder', { selected: e.target.checked, id: e.target.value })
      }
    },


    components: {
      MainLayout,
      Loading,
      Err,
    },
  }
</script>
