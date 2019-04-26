import { orders, fbm } from 'API'
import { MainLayout } from 'LAYOUT'
import { Loading } from 'COMPONENT'
import { methodDate } from 'MIXIN'


export default {
  mixins: [methodDate],

  data() {
    return {
      shipment: {
        description: '',
        cargos: [],
        packing: [],
        address: '',
        courier: '',
        priority: 'normal',
        tracking: '',
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
        ...this.shipment,
        courier: this.showCustomCourier ? this.shipment.courier : this.selectedCourier,
      }

      this.handleFetch(fbm.update(shipment))
        .then(() => {
          this.$router.push({ name: 'viewFBM', params: { sid: this.shipment._id }})
        })
    },


    fetchData() {
      this.startFetch()
      this.handleFetch(fbm.get(this.$route.params.sid))
    },


    handleFetch(prms) {
      return prms
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
