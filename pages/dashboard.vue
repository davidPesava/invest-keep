<template>
	<v-layout
		column
		align-start
		class="pl-6"
	>
		<h1 class="mb-5">Dashboards</h1> 
		<v-tabs light class="mb-6">
			<div class="d-flex align-center">Dashboards:</div>
			<v-tab @click="changeToPrimary()">Primary</v-tab>
			<v-tab @click="changeToSecondary()">Secondary</v-tab>
			<v-tab @click="changeToEarnings()">Earnings</v-tab>
		</v-tabs>
		<primary v-if="dashboards.primary" :chatLoadedData="chatLoadedData" :graphTypes="graphTypes" />
		<secondary v-if="dashboards.secondary" :chatLoadedData="chatLoadedData" :graphTypes="graphTypes" />
		<earnings v-if="dashboards.earnings" :symbols = symbols />
	</v-layout>
</template>

<script>
		import firebase from 'firebase'
		import { GChart } from 'vue-google-charts'
		import primary from "../components/dashboards/primary"
		import secondary from "../components/dashboards/secondary"
		import earnings from "../components/dashboards/earnings"

		export default {
				layout: 'app-layout',
				middleware: 'router-auth',
				components: {GChart, primary, secondary, earnings},
				created: function () { 
					this.initStocks()
				},
				methods: {
					initStocks(){
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
					},changeToPrimary() {
						this.dashboards.primary = true
						this.dashboards.secondary = false
						this.dashboards.earnings = false
					},
					changeToSecondary() {
						this.dashboards.primary = false
						this.dashboards.secondary = true
						this.dashboards.earnings = false
					},
					changeToEarnings() {
						this.dashboards.primary = false
						this.dashboards.secondary = false
						this.dashboards.earnings = true
					}					
				},
				data() {
						return {
							dashboards: {
								primary: true,
								secondary: false,
								earnings: false,
							},
							graphTypes: ['Table','BarChart','LineChart','ColumnChart','Histogram','AreaChart','PieChart','BubbleChart','CandlestickChart','SteppedAreaChart','ScatterChart'],
							currentUser: '',
							symbols: '',
							companies: [],
							chatLoadedData: [],
							chartOptions: {
								base: {
									title: 'Base Stocks prices',
									crosshair: {trigger: 'both'},
									width: 900,
								}
							} 
						}
				},
		}
</script>
