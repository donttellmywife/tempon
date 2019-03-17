<template>
<article>
  <div>Created At: {{ formatDate(cargo.createdAt) }}</div>
  STATUS: {{ cargo.status }} <br>
  <router-link :to="{ name: 'viewOrder', params: { oid: cargo._id }}">{{ cargo.description.expected }}</router-link>

  <div v-bind:class="{ success: !cargo.description.actual, fail: cargo.description.actual }">
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

  with tracking: <span v-for="track in cargo.tracking">{{ track.value }}<br></span>
  and labels: {{ cargo.labels }}<br>


  <router-link
    v-if="$store.getters.user.role === 'client' && cargo.status === 'todo'"
    :to="{
      name: 'editOrder',
      params: { oid: cargo._id },
    }">
    EDIT
  </router-link>

  <router-link
    v-if="$store.getters.user.role === 'assistant'"
    :to="{
      name: 'assistOrder',
      params: { oid: cargo._id },
    }">
    ASSIST
  </router-link>
</article>
</template>


<script>
  import { methodDate } from 'MIXIN'

  // for array model iterations
  const makeValueObject = value => ({ value })

  export default {
    props: ['cargo'],
    mixins: [methodDate],
  }
</script>
