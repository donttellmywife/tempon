<template>
  <div>
    <Loading v-if="loading" />

    <div v-if="!loading">
      <div v-if="error">{{ error }}</div>
      <order
        v-if="items.length"
        v-for="ord in items"
        :key="ord.id"
        :oid="ord.id"
      />
    </div>
  </div>
</template>


<script>
  import { Loading, OrderPreview } from 'COMPONENT'
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


    mounted() {
      this.fetchData()
    },


    methods: {
      fetchData() {
        this.loading = true
        this.error = ''

        list(this.id)
          .then(res => [].concat(res)) // make it always array
          .then(items => { this.$store.commit('setOrders', items); this.items = items; })
          .catch(err => this.error = err.toString())
          .then(() => this.loading = false)
      }
    },



    components: {
      Loading,
      order: OrderPreview,
    }
  }
</script>
