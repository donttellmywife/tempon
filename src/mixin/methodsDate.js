import { date } from 'APP'


export default {
  methods: {
    formatDate(incDate) {
      return date.formatDate(incDate)
    },

    formatUrl(possibleUrl) {
      return possibleUrl.indexOf('http') > -1 ? possibleUrl : `http://${possibleUrl}`
    },
  },
}
