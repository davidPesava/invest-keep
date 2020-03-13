<template>
	<v-layout
		column
		align-start
		class="pl-6"
	>
	<div class="d-flex justify-space-between align-items-center full-width">
		<h1>Currencies (FOREX)</h1>
		<v-btn @click="dialog = true" class="mx-2" large dark color="green">
			<v-icon dark>mdi-plus</v-icon>
			<span>Add exchange rate</span>
		</v-btn>
	</div>
	<v-row>
		<v-col cols="12">
			<v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition"> 
				<v-card class="py-6 px-6">
					<v-btn @click="closeForm()" class="mx-2" dark color="error">
						<v-icon dark>mdi-close</v-icon>
						<span>Close</span>
					</v-btn>
					<v-form class="d-flex flex-direction-row align-center">
						<v-select
							:items="currencyForm.fromItems"
							label="From"
							v-model="currencyForm.selectedFrom"
						></v-select>
						<div class="px-2"><v-icon>mdi-arrow-right</v-icon></div>
						<v-select
							:items="currencyForm.toItems"
							label="To"
							v-model="currencyForm.selectedTo"
						></v-select>
						<v-btn @click="addErate()" class="ml-md-8" large dark color="green">
							<v-icon dark>mdi-plus</v-icon> 
						</v-btn>
					</v-form>
				</v-card>
			</v-dialog>
		</v-col>
	</v-row>		
	<v-row class="full-width">
		<v-col v-if="currencies" v-for="exchange in currencies" cols="12" md="6" lg="4" xl="3">
			<v-card>
				<v-card-text class="pb-0">Actual</v-card-text>
				<v-card-title>
					1 {{ exchange.from }}
					to
					{{ exchange.to }}
				</v-card-title>
				<v-card-subtitle>
					<strong>{{ exchange.value }}</strong>
				</v-card-subtitle>
				<v-card-text class="pb-0 pl-2">History</v-card-text>
				<v-card-actions>
					<v-btn @click="openHistoryDialiog(exchange.from,exchange.to,7)" x-small color="primary" dark>7 days</v-btn>
					<v-btn @click="openHistoryDialiog(exchange.from,exchange.to,14)" x-small color="primary" dark>14 days</v-btn>
					<v-btn @click="openHistoryDialiog(exchange.from,exchange.to,30)" x-small color="primary" dark>30 days</v-btn>
					<v-btn @click="removeRate(exchange.full)" x-small="" color="error" dark>Remove rate</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
	<v-dialog
	  v-model="isHistoryOpen"
	  max-width="600"
	>
		<v-snackbar
			v-model="snackbar"
			:timeout="2000"
		>
			<div class="color--text">Added to portfolio. You can close window now</div>
		</v-snackbar>
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
				snackbar: true,
				dialog: false,				
				currencies: [],
				currentUser: {},
				isHistoryOpen: false,
				historyData: [],
				historyDataDesc: '',
				currencyForm: {
					fromItems: ['EUR','USD','GBP','YEN','CHF','CNY'],
					toItems: ['EUR','USD','GBP','YEN','CHF','CNY'],
					selectedFrom: '',
					selectedTo: '',

				},
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
									helper.full = element.full
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
			async openHistoryDialiog(from,to,days) {
				this.historyData = []
				const fetchedHistory = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'forex_history?base='+from+'&convert_to='+to+'&api_token='+this.$store.state.config.env.apiToken) 
				let outerHelper = []
				this.historyDataDesc = "History data of last "+ days +" days "+from + ' - ' + to	
				Object.keys(fetchedHistory.history).forEach((key,index) => {
					if(index < days) {
						let helper = []
						helper.push(moment(key).format('ll'))
						helper.push(parseFloat(fetchedHistory.history[key]))
						outerHelper.push(helper)
					}
				})
				outerHelper.push(['Date','Price'])
				this.historyData = outerHelper.reverse()
				this.isHistoryOpen = true
			},
			async addErate() {
				if(this.currencyForm.selectedFrom && this.currencyForm.selectedTo) {
					if(this.currencyForm.selectedFrom === this.currencyForm.selectedTo){
						console.log("Cant match values!")
					} else {
						alert("Rate was added!")
						let hel = JSON.parse(JSON.stringify(this.currencies)) 
						hel.push({from: this.currencyForm.selectedFrom, to: this.currencyForm.selectedTo, full: this.currencyForm.selectedFrom+this.currencyForm.selectedTo})
						firebase.firestore().collection('users').doc(this.currentUser.uid).update({currencies: hel})
					}
				} else {
					console.log("Set values")
				}
			},
			closeForm() {
				this.$router.go('/currencies')
			},
			removeRate(fullName) {
				let helper = this.currencies
				helper = helper.filter(function( obj ) {
 					return obj.full !== fullName
				})
				this.currencies = helper
				firebase.firestore().collection('users').doc(this.currentUser.uid).update({currencies: helper})
			}
		},		
	}
</script>

<style>
	.full-width {
		width: 100%;
	}
</style>