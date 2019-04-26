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
        tracking: [{ value: '' }],
        labels: '',
        status: 'done', // so delete button will be disabled on start
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
        tracking: this.order.tracking.map(track => track.value)
          .filter(track => track.length > 0),
        quantity: {
          expected: this.order.quantity.expected,
          actual: this.order.quantity.actual,
          left: this.order.quantity.expected,
        },
        description: {
          expected: this.order.description.expected,
          actual: this.order.description.actual,
        },
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
        .then(parse)
        .then((order) => { this.order = order })
        .catch((err) => { this.error = err })
        .then(() => { this.isLoading = false })
    },


    startFetch() {
      this.isLoading = true
      this.error = ''
    },


    addEmptyTrack(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this.order.tracking = this.order.tracking.concat({
        value: '',
      })
    },
  },


  components: {
    MainLayout,
    Loading,
    CargoClient,
  },
}


// for array model iterations
function makeValueObject(value) {
  return { value }
}

function parse(res) {
  return {
    ...res.data,
    tracking: res.data.tracking.map(makeValueObject),
  }
}
