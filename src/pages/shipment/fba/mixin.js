import { orders, fba } from 'API'
import { MainLayout } from 'LAYOUT'
import { Loading } from 'COMPONENT'
import { methodDate } from 'MIXIN'

const emptyDimensions = {
  depth: '',
  height: '',
  width: '',
  weight: '',
}


export default {
  mixins: [methodDate],

  data() {
    return {
      shipment: {
        status: '',
        priority: '',
        fnsku: '',
        description: '',
        labels: '',
        cargos: [],
        dimensions: {
          ...emptyDimensions,
        },
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


    fetchData() {
      this.startFetch()
      this.handleFetch(fba.get(this.$route.params.sid))
    },


    handleFetch(prms) {
      return prms
        .then(getData)
        .then((shipment) => {
          this.shipment = shipment
          if (!this.shipment.dimensions) {
            this.shipment.dimensions = {
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
  },


  components: {
    MainLayout,
    Loading,
  },
}

function getData(res) { return res.data }
