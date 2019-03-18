import { orders, fbm } from 'API'
import { MainLayout } from 'LAYOUT'
import { Loading } from 'COMPONENT'


export default {
  data() {
    return {
      shipment: {},

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
      // this.handleFetch(orders.update({
      //   ...this.order,
      //   tracking: this.order.tracking.map(track => track.value)
      //     .filter(track => track.length > 0),
      //   quantity: {
      //     expected: this.order.quantity.expected,
      //     actual: this.order.quantity.actual,
      //     left: this.order.quantity.expected,
      //   },
      //   description: {
      //     expected: this.order.description.expected,
      //     actual: this.order.description.actual,
      //   },
      // }))
    },


    fetchData() {
      this.startFetch()
      this.handleFetch(fbm.get(this.$route.params.sid))
    },


    handleFetch(prms) {
      prms
        .then(({ data }) => data)
        .then((shipment) => { this.shipment = shipment })
        .catch((err) => { this.error = err })
        .then(() => { this.isLoading = false })
    },


    startFetch() {
      this.isLoading = true
      this.error = ''
    },
  },


  components: {
    MainLayout,
    Loading,
  },
}
