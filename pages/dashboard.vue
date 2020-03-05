<template>
	<v-layout
		column
		align-start
		class="pl-6"
	>
		<h1 class="mb-5">Dashboard</h1> 
		<h3 class="mb-3">Your portfolio now includes:</h3>
		<GChart v-if="chatLoadedData.length > 0" type="Table" :data="chatLoadedData" :options="chartOptions.base" class="mb-5"/>    
		<GChart v-if="chatLoadedData" type="ColumnChart" :data="chatLoadedData" :options="chartOptions.base" class="mb-5"/>   
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
						this.currentUser = this.$store.state.users.currentUser
						let allUsers = firebase.firestore().collection('users').doc(this.currentUser.uid)
						let getDoc = allUsers.get()
							.then(doc => {
								if (!doc.exists) {
								 console.log('No such document!');
							 } else {
								let val = JSON.parse(JSON.stringify(doc.data()))
								this.$store.commit('users/setCredentials', val)	


								//Fetch all stock to render into graph
								this.fetchStocks(val.stocks) 

								//Fetch users stocks to be used next
								this.symbols = val.stocks
							 }
						 })
						
				},
				methods: {
					async fetchStocks(usersSymbols) {
						let symbols = usersSymbols
						const fetchedStocks = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'stock?symbol='+symbols+ '&api_token='+this.$store.state.config.env.apiToken)
						let localArrayNames = ['Name','Price actual','Price - Highest of the day','Price - lowest of the day', 'Price open - today']
						this.chatLoadedData.push(localArrayNames)
						fetchedStocks.data.forEach((element, index, array) => {
							let helper = []
							helper.push(element.name + '(' + element.symbol + ')')
							helper.push(parseFloat(element.price))
							helper.push(parseFloat(element.day_high))
							helper.push(parseFloat(element.day_low))
							helper.push(parseFloat(element.price_open))
							this.companies.push(element.name)
							this.chatLoadedData.push(helper)
						});
					},
				},
				data() {
						return {
							currentUser: '',
							loadedStocks: {},
							symbols: '',
							companies: [],
							chatLoadedData: [],
							chatHistoryData: [],
							chatHistoryDataDays: 14,
							chartOptions: {
								base: {
									title: 'Base Stocks prices',
									subtitle: 'Sales, Expenses, and Profit: 2014-2017',
									crosshair: {trigger: 'both'},
									width: 900,
								}
							} 
						}
				},
		}
</script>
