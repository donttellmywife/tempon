import { orders } from 'API'
import { MainLayout } from 'LAYOUT'


export default {
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
    },


    fetchData() {
      this.startFetch()
      this.handleFetch(orders.get(this.$route.params.oid))
    },


    handleFetch(prms) {
      prms
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
