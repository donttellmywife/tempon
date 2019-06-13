import { orders, fba } from 'API'
import { MainLayout } from 'LAYOUT'
import { Loading, Err } from 'COMPONENT'
import { methodDate } from 'MIXIN'

const emptyDimensions = {
  length: '',
  height: '',
  width: '',
  weight: '',
  description: '',
}


export default {
  mixins: [methodDate],

  data() {
    return {
      shipment: {
        status: '',
        priority: 'normal',
        fnsku: [{
          url: '',
        }],
        description: '',
        labels: [{
          url: '',
        }],
        cargos: [],
        box: [{
          ...emptyDimensions,
        }],
      },

      orders: [],


      error: '',
      isLoading: false,
    }
  },


  created() {
    this.fetchData()
  },


  methods: {
    update() {
      this.startFetch()
      this.handleFetch(fba.update(this.shipment))
        .then(() => {
          this.$router.push({ name: 'viewFBA', params: { sid: this.shipment._id }})
        })
    },


    remove() {
      this.startFetch()
      fba.del(this.shipment._id).then(() => this.$router.push({ name: 'listShipments' }))
    },


    fetchData() {
      this.startFetch()
      this.handleFetch(fba.get(this.$route.params.sid))
    },


    handleFetch(prms) {
      return prms
        .then(getData)
        .then((shipment) => {
          this.shipment = shipment
          if (!this.shipment.box.length) {
            this.shipment.box = {
              ...emptyDimensions,
            }
          }
        })
        .catch((err) => { this.error = err })
        .then(() => { this.isLoading = false })
    },


    startFetch() {
      this.isLoading = true
      this.error = ''
    },


    fetchOrders() {
      orders.list()
        .then(getData)
        .then((orders) => {
          this.orders = orders.filter(order => order.status === 'done').filter(order => order.quantity.left > 0)
        })
    },

    addEmptyLabel(e) {
      this.shipment.labels = this.shipment.labels.concat({ url: '' })
    },
    removeLabel(e, index) {
      this.shipment.labels = this.shipment.labels.slice(0, index).concat(this.shipment.labels.slice(index + 1))
    },

    addEmptyFNSKU(e) {
      this.shipment.fnsku = this.shipment.fnsku.concat({ url: '' })
    },
    removeFNSKU(e, index) {
      this.shipment.fnsku = this.shipment.fnsku.slice(0, index).concat(this.shipment.fnsku.slice(index + 1))
    },

    addEmptyBox(e) {
      this.shipment.box = this.shipment.box.concat({ ...emptyDimensions })
    },
    removeBox(e, index) {
      this.shipment.box = this.shipment.box.slice(0, index).concat(this.shipment.box.slice(index + 1))
    },
  },


  components: {
    MainLayout,
    Loading,
    Err,
  },
}

function getData(res) { return res.data }
