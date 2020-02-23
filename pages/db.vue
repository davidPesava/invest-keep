<template>
	<v-layout
		column
		justify-center
		align-center
	>
		<h1 v-if="currentUser">{{ currentUser.uid }}</h1>
		<h2 v-if="credentials" class="mb-5">{{ credentials.name }}</h2> 
		<GChart type="BarChart" :data="chatLoadedData" :options="chartOptions.base" class="mb-5"/>    
	</v-layout>
</template>

<script>
		import firebase from 'firebase'
		import { GChart } from 'vue-google-charts'

		export default {
				layout: 'app-layout',
				middleware: 'router-auth',
				components: {GChart},
				created: function () { 
						this.fetchStocks()          
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
				methods: {
					async fetchStocks() {
						const fetchedStocks = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'stock?symbol='+this.symbols+ '&api_token='+this.$store.state.config.env.apiToken)
						let localArrayNames = ['Name','Price actual','Price - Highest of the day']
						this.chatLoadedData.push(localArrayNames)
						fetchedStocks.data.forEach((element, index, array) => {
							let helper = []
							helper.push(element.name)
							helper.push(parseFloat(element.price))
							helper.push(parseFloat(element.day_high))
							this.chatLoadedData.push(helper)
						});
					},
					async fetchHistory() {
						const fetchedHistory = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'stock?symbol='+this.symbols+ '&api_token='+this.$store.state.config.env.apiToken)
						console.log()
					}   
				},
				data() {
						return {
							currentUser: '',
							credentials: {},
							loadedStocks: {},
							symbols: 'SNAP,TWTR,VOD.L',
							chatLoadedData: [],
							chatHistoryData: [],
							chartOptions: {
								base: {
									title: 'Base Stocks prices',
									subtitle: 'Sales, Expenses, and Profit: 2014-2017',
									crosshair: {trigger: 'both'}
								}
							} 
						}
				},
		}
</script>
