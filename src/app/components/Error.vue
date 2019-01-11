<template>
  <div>{{ msg }}</div>
</template>


<script>
  export default {
    props: {
      msg: String
    },

    data() {
      return {
        msg: this.$props.msg || 'ERROR',
      }
    },
  }
</script>
