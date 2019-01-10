<template>
  <main-layout>
    <p>Welcome home</p>
    List of Client Cargos (for client)
    <br>
    Or List of Clients Cargos (for assistant)
  </main-layout>
</template>


<script>
  import { MainLayout } from 'LAYOUT'
  import { Orders } from 'COMPONENT'


  export default {
    deta: {
      list: [],
      loading: false,
      error: '',
    },


    created() {
      this.fetchData()
    },


    methods: {
      fetchData() {
        this.loading = true
        this.error = ''
        this.$store.user;

        // getPost(this.$route.params.id, (err, post) => {
        //   this.loading = false
        //   if (err) this.error = err.toString()
        //   else this.post = post
        // })
      }
    },


    components: {
      MainLayout,
      Orders
    }
  }
</script>
