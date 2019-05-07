<template>
  <div  class="text-danger">ERROR: {{ msg || 'ERROR' }}</div>
</template>


<script>
  export default {
    props: {
      msg: String
    },
  }
</script>
