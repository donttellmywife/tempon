<template>
  <li>
    <div v-bind:class="{ success: !cargo.description.actual, fail: cargo.description.actual }">
      STATUS: {{ cargo.status }} <br>
      You expecting:
      <span>{{ cargo.description.expected }}</span>
      <span v-if="cargo.description.actual">
        you know, actualy we've found there {{ cargo.description.actual }}
      </span>
    </div>

    <div v-bind:class="{ success: !cargo.quantity.actual, fail: cargo.quantity.actual }">

      In amount of:
      <b>{{ cargo.quantity.expected }}</b>
      <span v-if="cargo.quantity.actual">
        but actualy we've found there <b>{{ cargo.quantity.actual }}</b>
      </span>
    </div>

    with tracking: {{ cargo.tracking }}<br>
    and labels: {{ cargo.labels }}<br>
  </li>
</template>


<script>
  export default {
    props: ['cargo'],
  }
</script>
