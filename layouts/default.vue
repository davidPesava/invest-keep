<template>
  <v-app dark>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: this.$store.state.users.currentUser ? 'mdi-chart-bubble' : '',
          title: this.$store.state.users.currentUser ? 'Dashboard' : '',
          to: this.$store.state.users.currentUser ? '/db' : '',
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Auth module'
    }
  },
}
</script>
