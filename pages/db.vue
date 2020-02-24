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
		<GChart type="BarChart" :data="chatLoadedData" :options="chartOptions.base" class="mb-5"/>    
		
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
						this.fetchStocks() 
						this.fetchHistory()

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
							this.companies.push(element.name)
							this.chatLoadedData.push(helper)
						});
					},
					async fetchHistory() {
						let arraySymbols = this.symbols.split(",")

						arraySymbols.forEach((element, index, array) => {
							console.log(element)
						})



						let outerHelper = []
						outerHelper .push(['Date','Price'])
						const fetchedHistory = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'history?symbol=TWTR&api_token='+this.$store.state.config.env.apiToken)
						
						Object.keys(fetchedHistory.history).forEach((key,index) => {
							if(index < 7) {
								let helper = []
								helper.push(key)
								helper.push(parseFloat(fetchedHistory.history[key].high))
								outerHelper.push(helper)
							}
						})


						this.chatHistoryData.push(outerHelper)
						this.chatHistoryData.push(outerHelper)
						console.log(this.chatHistoryData)
					}   
				},
				data() {
						return {
							currentUser: '',
							credentials: {},
							loadedStocks: {},
							symbols: 'SNAP,TWTR,VOD.L',
							companies: [],
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
