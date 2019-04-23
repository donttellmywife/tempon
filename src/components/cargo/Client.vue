<template>
<article>
  <div :class="{
    'border-warning': cargo.status === 'todo',
    'border-success': cargo.status === 'done',
    'border-danger': cargo.status === 'fail'
    }" class="card mb-3">

    <div class="card-header">
      <h3>
        <router-link v-if="cargo._id" :to="{ name: 'viewOrder', params: { oid: cargo._id }}">
          {{ cargo.description.expected }} <small v-if="cargo.description.actual">({{ cargo.description.actual }})</small>
        </router-link>
      </h3>
      <h6>status: {{ cargo.status }}</h6>
    </div>

    <div v-if="cargo.description.actual" class="card-body card-body--2clm">
      <div>
        Description
      </div>
      <div>
        <div>expected: {{ cargo.description.expected }}</div>
        <div>arrived: {{ cargo.description.actual }}</div>
      </div>
    </div>

    <div class="card-body card-body--2clm">
      <div>
        Quantity
      </div>
      <div>
        <div>expected: {{ cargo.quantity.expected }}</div>
        <div v-if="cargo.quantity.actual">arrived: {{ cargo.quantity.actual }}</div>
        <div v-if="cargo.status === 'done'">left: {{ cargo.quantity.left }}</div>
      </div>
    </div>

    <div class="card-body card-body--2clm">
      <div>
        Tracking
      </div>
      <div>
        <ul class="list-group">
          <li v-for="track in cargo.tracking">{{ track.value }}<br></li>
        </ul>
      </div>
    </div>

    <div v-if="cargo.labels" class="card-body">
      Labels: {{ cargo.labels }}
    </div>

    <div v-if="cargo.comment" class="card-body">
      Comment: {{ cargo.comment }}
    </div>

    <div class="card-body">
      <router-link
        v-if="$store.getters.user.role === 'client' && cargo.status === 'todo' && cargo._id"
        :to="{
          name: 'editOrder',
          params: { oid: cargo._id },
        }">
        EDIT
      </router-link>

      <router-link
        v-if="$store.getters.user.role === 'assistant' && cargo._id"
        :to="{
          name: 'assistOrder',
          params: { oid: cargo._id },
        }">
        ASSIST
      </router-link>
    </div>

    <div class="card-footer text-muted">
      <small>created: {{ formatDate(cargo.createdAt) }}</small><br>
      <small>updated: {{ formatDate(cargo.updatedAt) }}</small>
    </div>
  </div>
</article>
</template>


<script>
  import { methodDate } from 'MIXIN'

  export default {
    props: ['cargo'],
    mixins: [methodDate],
  }
</script>
