<template>
	<v-layout
		column
		align-start
		class="pl-6"
	>
		<h1 class="mb-5">Stocks</h1> 
		<h3 class="mb-3">Your portfolio now includes:</h3>
			<stocks-overview v-if="symbols" :symbols="symbols" /> 
		<v-row>
			<v-col cols="6">
			
			</v-col>
		</v-row>
	</v-layout>
</template>

<script>
		import firebase from 'firebase'
		import { GChart } from 'vue-google-charts'
		import stocksOverview from "../components/graphs/stocks-overview"

		export default {
				layout: 'app-layout',
				middleware: 'router-auth',
				components: {GChart, stocksOverview},
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
								//Fetch users stocks to be used next
								this.symbols = val.stocks
							 }
						 })
						
				},
				data() {
						return {
							currentUser: '',
							symbols: '',
						}
				},
		}
</script>
