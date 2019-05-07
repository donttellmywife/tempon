<template>
<main-layout>
  <h2>NEW FBA SHIPMENT</h2>
  <Loading v-if="isLoading" />
  <Err v-if="error" :msg="error" />


  <div class="two-sides">
    <main class="clm">
      <form @submit.prevent="create">
        <div class="form-group">
          <label>fnsku: <br>
            <input v-model="fnsku" class="form-control" placeholder="some avenue" type="text">
          </label>
        </div>


        <div class="form-group">
          <label>describe contents <br>
            <input v-model="description" class="form-control" placeholder="starwars lego" type="text">
          </label>
        </div>


        <div v-if="cargos.length" class="form-group">
          <hr>
          <div v-for="ord in cargos">
            <label><span class="text-primary">{{ ord.description.expected }}</span> in amount of
              <input v-model="ord.quantity.left" class="form-control form-control-sm" placeholder="1" type="number">
            </label><br>
          </div>
        </div>


        <button class="btn btn-primary" type="submit">create new fba shipment</button>
      </form>
    </main>


    <aside v-if="orders.length" class="clm">
      Choose orders:

      <label v-for="ord in orders">
        <input type="checkbox" :value="ord" v-model="cargos">
        {{ ord.description.expected }}
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
        orders: [],
        cargos: [],
        fnsku: '',

        error: '',
        isLoading: false,
      }
    },


    mounted() {
      this.fetchData()
    },


    methods: {
      create() {
        const cargos = this.cargos.map(c => ({ _id: c._id, quantity: c.quantity.left }))

        const shipment = {
          description: this.description,
          fnsku: this.fnsku,
          cargos,
        }

        fba.add(shipment)
          .then(response => {
            if (response.error) return Promise.reject(response.error)
            return response
          })
          .then(({ data }) => this.$router.push({ name: 'viewFBA', params: { sid: data._id }}))
          .catch(err => this.error = err)
      },


      fetchData() {
        this.isLoading = true
        this.error = ''

        orders.list()
          .then(res => res.data)
          .then(orders => {
            this.orders = orders.filter(order => order.status === 'done')
          })
          .catch(err => this.error = err.toString())
          .then(() => this.isLoading = false)
      },
    },


    components: {
      MainLayout,
      Loading,
      Err,
    },
  }
</script>
