<template>
  <div>
    <Loading v-if="isLoading" />

    <div v-if="!isLoading">
      <div v-if="error">{{ error }}</div>

      <ul v-if="items.length">
        <li v-for="ord in items" :key="ord.id">
          {{ ord.id }} | {{ ord.description.hopes }}

          <router-link :to="{ name: 'editOrder', params: { oid: ord.id } }">/edit</router-link>
          <router-link :to="{ name: 'viewOrder', params: { oid: ord.id } }">/view</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
  import { Loading } from 'COMPONENT'
  import { orders } from 'API'
  const { list } = orders

  export default {
    props: {
      clientId: String,
    },


    data() {
      return {
        isLoading: true,
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
        this.isLoading = true
        this.error = ''

        list(this.id)
          .then(res => [].concat(res)) // make it always array
          .then(items => { this.$store.commit('setOrders', items); this.items = items })
          .catch(err => this.error = err.toString())
          .then(() => this.isLoading = false)
      }
    },


    components: {
      Loading,
    },
  }
</script>
