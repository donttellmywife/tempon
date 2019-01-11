<template>
  <div>
    show some item with ID {{ id }}
    im here
    <router-link to="/edit">/edit</router-link>
  </div>
</template>


<script>
  export default {
    props: {
      oid: String,
    },

    name: 'order-preview',


    data() {
      return {
        id: this.$props.oid || '',
      }
    },
  }
</script>
