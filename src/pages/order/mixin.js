import { orders } from 'API'
import { MainLayout } from 'LAYOUT'
import { Loading, CargoClient } from 'COMPONENT'
import { methodDate } from 'MIXIN'

export default {
  mixins: [methodDate],


  data() {
    return {
      order: {
        description: {
          expected: '',
          actual: '',
        },
        quantity: {
          expected: '',
          actual: '',
          left: '',
        },
        tracking: [{
          value: '',
          quantity: '',
        }],
        labels: '',
        status: 'shipped', // so delete button will be disabled on start
        productInfo: [{ url: '' }],
      },

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
      this.handleFetch(orders.update({
        ...this.order,
        tracking: this.order.tracking.filter(({ value }) => value.length > 0),
        quantity: {
          expected: this.order.quantity.expected,
          actual: this.order.quantity.actual,
          left: this.order.quantity.expected,
        },
        description: {
          expected: this.order.description.expected,
          actual: this.order.description.actual,
        },
        productInfo: this.order.productInfo,
      }))
        .then(() => {
          this.$router.push({ name: 'viewOrder', params: { oid: this.order._id }})
        })
    },


    remove() {
      this.startFetch()
      this.handleFetch(orders.del(this.$route.params.oid))
        .then(() => {
          this.$router.push({ name: 'listOrders' })
        })
    },


    fetchData() {
      this.startFetch()
      this.handleFetch(orders.get(this.$route.params.oid))
    },


    handleFetch(prms) {
      return prms
        .then(({ data }) => { this.order = data })
        .catch((err) => { this.error = err })
        .then(() => { this.isLoading = false })
    },


    startFetch() {
      this.isLoading = true
      this.error = ''
    },


    addEmptyTrack(e) {
      this.order.tracking = this.order.tracking.concat({ value: '', quantity: '' })
    },
    removeTrack(e, index) {
      this.order.tracking = this.order.tracking.slice(0, index).concat(this.order.tracking.slice(index + 1))
    },


    addEmptyInfo(e) {
      this.order.productInfo = this.order.productInfo.concat({ url: '' })
    },
    removeInfo(e, index) {
      this.order.productInfo = this.order.productInfo.slice(0, index).concat(this.order.productInfo.slice(index + 1))
    },
  },


  components: {
    MainLayout,
    Loading,
    CargoClient,
  },
}
