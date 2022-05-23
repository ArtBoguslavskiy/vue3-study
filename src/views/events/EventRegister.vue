<template>
  <p>Register for event here</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    register() {
      // Call to API

      this.$router.push({
        name: 'EventDetails',
      })
    },
  },
}
</script>
