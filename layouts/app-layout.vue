<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <Logo :small="true" />
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="app-layout__logOutButtonContainer">
        <log-out-button />
      </div>
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
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
  import Logo from "../components/layout/Logo"
  import LogOutButton from "../components/auth/LogOutButton"


export default {
  components: {
    Logo, LogOutButton
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Homepage',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Dashboard',
          to: '/db',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Stocks',
          to: '/stocks',
        },   
        {
          icon: 'mdi-chart-bubble',
          title: 'Currencies',
          to: '/currencies',
        },   
        {
          icon: 'mdi-chart-bubble',
          title: 'Account',
          to: '/account',
        }                  
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'App'
    }
  },
}
</script>

<style>
.app-layout__logOutButtonContainer {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
</style>