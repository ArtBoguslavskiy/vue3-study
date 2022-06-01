<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </nav>
    <router-view :event="event" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  created() {
    this.$store.dispatch('fetchEvent', this.$route.params.id).catch((error) => {
      if (error.response && error.response.status === 404) {
        this.$router.push({
          name: '404Resource',
          params: { resource: 'event' },
        })
      } else {
        this.$router.push({ name: 'NetworkError' })
      }
    })
  },
  computed: {
    ...mapState({
      event: (state) => state.event,
    }),
  },
}
</script>
