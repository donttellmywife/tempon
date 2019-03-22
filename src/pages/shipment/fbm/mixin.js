import { orders, fbm } from 'API'
import { MainLayout } from 'LAYOUT'
import { Loading } from 'COMPONENT'


export default {
  data() {
    return {
      shipment: {
        description: '',
        cargos: [],
        packing: [],
        address: '',
        courier: '',
      },

      possibleCourier: ['DHL', 'USPS', 'FEDEX', 'OTHER'],
      selectedCourier: 'OTHER',
      orders: [],
      customCourier: '',
      error: '',
      isLoading: false,
    }
  },


  created() {
    this.fetchData()
  },


  computed: {
    showCustomCourier() {
      return this.selectedCourier === 'OTHER'
    },
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
        .then(getData)
        .then((shipment) => {
          this.shipment = shipment
          this.selectedCourier = this.possibleCourier.find(shipment.courier) || 'OTHER'
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
