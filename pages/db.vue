<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <h1 v-if="currentUser">{{ currentUser.uid }}</h1>
		<h2 v-if="credentials" class="mb-5">{{ credentials.name }}</h2>    
  </v-layout>
</template>

<script>
    import firebase from 'firebase'

    export default {
        layout: 'app-layout',
        middleware: 'router-auth',
        created: function () {
            this.currentUser = this.$store.state.users.currentUser
            let allUsers = firebase.firestore().collection('users').doc(this.currentUser.uid)
            let getDoc = allUsers.get()
              .then(doc => {
                if (!doc.exists) {
                 console.log('No such document!');
               } else {
                let val = JSON.parse(JSON.stringify(doc.data()))
                this.$store.commit('users/setCredentials', val)	
                this.credentials = this.$store.state.users.credentials
               }
             })
        },
        data() {
            return {
                currentUser: '',
                credentials: {},
            }
        },
    }
</script>
