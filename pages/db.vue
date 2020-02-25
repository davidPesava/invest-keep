<template>
	<v-layout
		column
		justify-center
		align-center
	>
		<h1 v-if="credentials" class="mb-5">Hello, {{ credentials.name }}</h1> 
		<h3>Your portfolio now includes:</h3>
		<ul v-for="company in companies">
			<li :key="company">{{ company }}</li>
		</ul>
		<GChart type="ColumnChart" :data="chatLoadedData" :options="chartOptions.base" class="mb-5"/>    
		
		<div v-for="graph in chatHistoryData">
			<GChart type="LineChart" :data="graph" class="mb-5"/>
		</div>
		
		
		 



		<GChart type="Table" :data="chatLoadedData" :options="chartOptions.base" class="mb-5"/>    
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

								//Fetch all stocks into one graph
								this.fetchStocks(val.stocks) 

								//Fetch each stock into one history graph
								let arraySymbols = val.stocks.split(",")
								arraySymbols.forEach((element, index, array) => {
									console.log(element)
									let historyArray = this.fetchHistory(element).then(
										singleHistory => {
											this.chatHistoryData.push(singleHistory)
										}
									)
								})							








							 }
						 })
						
				},
				methods: {
					async fetchStocks(usersSymbols) {
						let symbols = usersSymbols
						const fetchedStocks = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'stock?symbol='+symbols+ '&api_token='+this.$store.state.config.env.apiToken)
						let localArrayNames = ['Name','Price actual','Price - Highest of the day']
						this.chatLoadedData.push(localArrayNames)
						fetchedStocks.data.forEach((element, index, array) => {
							let helper = []
							helper.push(element.name)
							helper.push(parseFloat(element.price))
							helper.push(parseFloat(element.day_high))
							this.companies.push(element.name)
							this.chatLoadedData.push(helper)
						});
					},

					async fetchHistory(usersSymbols) {
						let symbols = usersSymbols
						let outerHelper = []
						outerHelper .push(['Date','Price'])
						const fetchedHistory = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'history?symbol='+symbols+'&api_token='+this.$store.state.config.env.apiToken)
						//console.log(fetchedHistory.name)
						Object.keys(fetchedHistory.history).forEach((key,index) => {
							if(index < this.chatHistoryDataDays) {
								let helper = []
								helper.push(key)
								helper.push(parseFloat(fetchedHistory.history[key].high))
								outerHelper.push(helper)
							}
						})
						return outerHelper						
					},
				},
				data() {
						return {
							currentUser: '',
							credentials: {},
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
									crosshair: {trigger: 'both'}
								}
							} 
						}
				},
		}
</script>
