<template>
	<v-layout
		column
		align-start
		class="pl-6"
	>
	<h1>Currencies (FOREX)</h1>
	<p>Data shown in boxes are real time. For history data click on box.</p>
	<v-row class="full-width">
		<v-col v-if="currencies" v-for="exchange in currencies" cols="6" md="4" lg="3">
			<v-card @click="openHistoryDialiog(exchange.from,exchange.to)">
				<v-card-title>
					1 {{ exchange.from }}
					to
					{{ exchange.to }}
				</v-card-title>
				<v-card-subtitle>
					<strong>{{ exchange.value }}</strong>
				</v-card-subtitle>
			</v-card>
		</v-col>
	</v-row>
	<v-dialog
      v-model="isHistoryOpen"
      max-width="600"
    >
		<v-card>
			<v-card-title>{{ historyDataDesc }}</v-card-title>
			<GChart type="LineChart" :data="historyData"  :options="chartOptions.chart" class="pb-5"/>
		</v-card>
	</v-dialog>
	</v-layout>
</template>

<script>
	import firebase from 'firebase'
	import { GChart } from 'vue-google-charts'
	import moment from 'moment'

	export default {
		layout: 'app-layout',
		middleware: 'router-auth',
		components: {GChart},
		created: function () { 
			this.initCurrencies()
			
		},
		data () {
			return {
				currencies: [],
				currentUser: {},
				isHistoryOpen: false,
				historyData: [],
				historyDataDesc: '',
				chartOptions: {
					chart: {
					width: 500,
					}
				}
			}
		},
		methods: {
			initCurrencies() {
				this.currentUser = this.$store.state.users.currentUser
				let allUsers = firebase.firestore().collection('users').doc(this.currentUser.uid)
				let getDoc = allUsers.get()
					.then(doc => {
						if (!doc.exists) {
						 console.log('No such document!');
					 } else {
						let val = JSON.parse(JSON.stringify(doc.data()))
						this.$store.commit('users/setCredentials', val)	
						val.currencies.forEach((element) => {
							let currenciesArray = this.fetchCurrencies(element.from, element.to).then(
								singleCurrency => {
									let helper = {}
									helper.from = element.from
									helper.to = element.to
									helper.value = singleCurrency[Object.keys(singleCurrency)[0]]
									this.currencies.push(helper)
								}
							)
						})						
					 }
				 })
			},		
			async fetchCurrencies(from,to) {
				let curFrom = from
				let curTot = to
				const searchResults = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'forex?base='+curFrom+'&convert_to='+curTot+'&api_token='+this.$store.state.config.env.apiToken)
				return searchResults.data
			},
			async openHistoryDialiog(from,to) {
				this.historyData = []
				const fetchedHistory = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'forex_history?base='+from+'&convert_to='+to+'&api_token='+this.$store.state.config.env.apiToken) 
				let outerHelper = []
				this.historyDataDesc = "History data of last 7 days "+from + ' - ' + to	
				Object.keys(fetchedHistory.history).forEach((key,index) => {
					if(index < 7) {
						let helper = []
						helper.push(moment(key).format('ll'))
						helper.push(parseFloat(fetchedHistory.history[key]))
						outerHelper.push(helper)
					}
				})
				outerHelper.push(['Date','Price'])
				this.historyData = outerHelper.reverse()
				this.isHistoryOpen = true
			}
		},		
	}
</script>

<style>
	.full-width {
		width: 100%;
	}
</style>