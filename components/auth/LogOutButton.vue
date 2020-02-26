<template>
	<div>
		<v-btn @click="logOut" outlined>Logo out</v-btn>
	</div>
</template>

<script>
	import firebase from 'firebase'
	export default {
		name: "LogOutButton",
		methods: {
			logOut() {
				this.$router.go('/')
				let val = null
				this.$store.commit('users/setCurrentUser', val)
				firebase.auth().signOut()
				
			}
		},
	}
</script>

<style scoped>

</style>
