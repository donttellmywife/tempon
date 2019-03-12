<template>
  <li>
    <div v-bind:class="{ success: !cargo.description.actual, fail: cargo.description.actual }">
      <div>Created At: {{ formatDate(cargo.createdAt) }}</div>
      STATUS: {{ cargo.status }} <br>
      You expecting:
      <span>{{ cargo.description.expected }}</span>
      <span v-if="cargo.description.actual">
        you know, actualy we've found there {{ cargo.description.actual }}
      </span>
    </div>

    <div v-bind:class="{ success: !cargo.quantity.actual, fail: cargo.quantity.actual }">

      Was in amount of:
      <b>{{ cargo.quantity.expected }}</b><br>

      <div v-if="cargo.status === 'done'">
        Left in amount of:
        <b>{{ cargo.quantity.left }}</b>
      </div>

      <span v-if="cargo.quantity.actual">
        but actualy we've found there <b>{{ cargo.quantity.actual }}</b>
      </span>
    </div>

    with tracking: {{ cargo.tracking }}<br>
    and labels: {{ cargo.labels }}<br>
  </li>
</template>


<script>
  import { methodDate } from 'MIXIN'

  export default {
    props: ['cargo'],
    mixins: [methodDate],
  }
</script>
