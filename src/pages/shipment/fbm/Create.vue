<template>
<main-layout>
  <h2>NEW FBM SHIPMENT</h2>
  <Loading v-if="isLoading" />
  <Err v-if="error" :msg="error" />


  <div class="two-sides">
    <main>
      <form @submit.prevent="create">
        <div class="form-group">
          <label>Where to? <br>
            <input v-model="address" class="form-control" placeholder="some avenue" type="text">
          </label><br>
        </div>

        <div class="form-group">
          <label>describe contents <br>
            <input v-model="description" class="form-control" placeholder="starwars lego" type="text">
          </label><br>
        </div>

        <div v-if="cargos.length" class="form-group">
          <hr>
          <div v-for="ord in cargos">
            <label><span class="text-primary">{{ ord.description.expected }}</span> in amount of
              <input v-model="ord.quantity.left" class="form-control form-control-sm" placeholder="1" type="number">
            </label><br>
          </div>
        </div>


        <div class="form-group">
          Additional packing:<br>
          <label>
            <input v-model="packing" type="checkbox" value="box" >
          box</label>

          <label>
            <input v-model="packing" type="checkbox" value="A4 envelope">
          A4 envelope</label>

          <label>
            <input v-model="packing" type="checkbox" value="bubble wrap">
          bubble wrap</label>
          <br>
        </div>


        <div class="form-group">
          Select courier<br>
          <label>
            <input type="radio" value="DHL" v-model="courier">
          DHL</label>
          <br>

          <label>
            <input type="radio" value="USPS" v-model="courier">
          USPS</label><br>

          <label>
            <input type="radio" value="FEDEX" v-model="courier">
          FEDEX</label>
          <br>
          <!-- Others -->
          <label>
            <input type="radio" value="OTHER" v-model="courier">
          OTHER</label>
          <br>

          <input v-if="showCustomCourier" v-model="customCourier" class="form-control form-control-sm" placeholder="input your courier" />
        </div>

        <button class="btn btn-primary" type="submit">create new fbm shipment</button>
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
  import { orders, fbm } from 'API'
  import { MainLayout } from 'LAYOUT'
  import { Loading, Err } from 'COMPONENT'


  export default {
    data() {
      return {
        description: '',
        orders: [],
        cargos: [],
        address: '',
        packing: [],
        courier: '',
        customCourier: '',

        error: '',
        isLoading: false,
      }
    },


    mounted() {
      this.fetchData()
    },


    computed: {
      showCustomCourier: function() {
        return this.courier === 'OTHER'
      }
    },


    methods: {
      create() {
        const cargos = this.cargos.map(c => ({ _id: c._id, quantity: c.quantity.left }))

        const shipment = {
          description: this.description,
          address: this.address,
          wrap: this.wrap,
          courier: this.customCourier || this.courier,
          cargos,
        }

        fbm.add(shipment)
          .then(response => {
            if (response.error) return Promise.reject(response.error)
            return response
          })
          .then(({ data }) => this.$router.push({ name: 'viewFBM', params: { sid: data._id }}))
          .catch(err => this.error = err)
      },


      fetchData() {
        this.isLoading = true
        this.error = ''

        orders.list()
          .then(res => res.data)
          .then(orders => {
            this.orders = orders.filter(order => order.status === 'done').filter(order => order.quantity.left > 0)
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
