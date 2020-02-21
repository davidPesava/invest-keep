<template>
  <v-app dark>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} InvestKeep by <a href="https://www.linkedin.com/in/david-pe%C5%A1ava-088699b8/" target="_blank">David Pešava</a></span>
    </v-footer>
  </v-app>
</template>