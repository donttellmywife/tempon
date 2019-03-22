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

      const shipment = {
        _id: this.shipment._id,
        description: this.shipment.description,
        address: this.shipment.address,
        packing: this.shipment.packing,
        courier: this.showCustomCourier ? this.shipment.courier : this.selectedCourier,
        cargos: this.shipment.cargos,
      }

      this.handleFetch(fbm.update(shipment))
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
          this.selectedCourier = this.possibleCourier.find(c => c === shipment.courier) || 'OTHER'
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
