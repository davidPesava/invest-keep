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
			firebase.auth().signOut()
			this.$router.go('/')
		}
	},
}
</script>

<style scoped>

</style>
