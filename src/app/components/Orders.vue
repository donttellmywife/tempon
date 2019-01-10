<template>
  <div>
    <div v-if="loading">loading...</div>

    <div v-if="!loading">
      <div v-if="error">{{ error }}</div>
      {{ items }}
    </div>
  </div>
</template>


<script>
  import { orders } from 'API'
  const { list } = orders


  export default {
    props: {
      clientId: String,
    },


    data() {
      return {
        loading: true,
        items: [],
        error: '',
        id: this.$props.clientId || '' // client - show his orders; ass - show all orders
      }
    },


    created() {
      this.fetchData()
    },


    methods: {
      fetchData() {
        this.loading = true
        this.error = ''

        list(this.id)
          .then(res => [].concat(res)) //make it always array
          .then(items => this.items = items)
          .catch(err => this.error = err.toString())
          .then(() => this.loading = false)
      }
    },
  }
</script>
