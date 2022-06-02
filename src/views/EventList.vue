<template>
  <div class="events">
    <h1>Events For {{ user.userInfo.name }}</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page !== 1"
        >&#60; Previous</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EventCard from '@/components/EventCard.vue'

export default {
  name: 'HomeView',
  props: ['page'],
  components: {
    EventCard,
  },
  created() {
    this.fetchEvents(parseInt(this.$route.query.page) || 1).catch(() => {
      this.$router.push({ name: 'NetworkError' })
    })
  },
  beforeRouteUpdate(routeTo) {
    this.fetchEvents(parseInt(routeTo.query.page) || 1).catch(() => {
      this.$router.push({ name: 'NetworkError' })
    })
  },
  computed: {
    ...mapState({
      events: (state) => state.event.events,
      totalEvents: (state) => state.event.totalEvents,
      user: (state) => state.user,
    }),
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / 2)

      return this.page < totalPages
    },
  },
  methods: {
    ...mapActions('event', ['fetchEvents']),
  },
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
