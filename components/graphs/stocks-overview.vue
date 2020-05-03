<template>
<div>
	<v-row>
		<v-col cols="12" v-for="company in stockData" class="mb-5">
			<v-card>
				<v-card-title>
					<div class="full-width d-lg-flex justify-space-between">
						<div class="d-flex">
							<div>
								{{ company.quote.companyName }}
								({{ company.quote.symbol }})
							</div>
							<div class="ml-2" :class="[parseFloat(company.quote.change) > 0 ?  'green--text' : 'red--text']">
								{{ company.quote.change }}
								<v-icon class="mb-2 red--text" v-if="parseFloat(company.quote.change) < 0">mdi-elevation-decline</v-icon>
								<v-icon class="mb-2 green--text" v-if="parseFloat(company.quote.change) > 0">mdi-elevation-rise</v-icon>
							</div>
						</div>
						<div class="d-flex align-center">
							<h5 class="mr-2">History:</h5>
							<v-btn class="mr-1" @click="openHistoryDialiog(company.quote.symbol,7)" x-small color="primary" dark>7 days</v-btn>
							<v-btn class="mr-1" @click="openHistoryDialiog(company.quote.symbol,14)" x-small color="primary" dark>14 days</v-btn>
							<v-btn class="mr-1" @click="openHistoryDialiog(company.quote.symbol,30)" x-small color="primary" dark>30 days</v-btn>
						</div>
						<v-btn @click="removeStock(company.quote.symbol)" class="mx-lg-2" small dark color="error">
							<v-icon dark>mdi-close</v-icon>
						</v-btn>
					</div>
				</v-card-title>
				<v-card-text>
					<v-row>
						<v-col cols="12">
							<v-row>
								<v-col cols="5">
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Calculation Price</div>
										<div>{{ company.quote.calculationPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Price</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Price open</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Day high</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Day low</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Day change</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Change pct</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Closer yeasterday</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
								</v-col>
								<v-col cols="6" offset="1">
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">52 Weeks high</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">52 Weeks low</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">PE</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">EPS</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Market cap</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Volume</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Volume avrage</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Shares</div>
										<div>{{ company.quote.latestPrice }}</div>
									</div>
								</v-col>
								<v-col cols="12">
									<div>Last trade time: {{ company.quote.latestTime }}</div>
									<div>Stock exchange: New York Stock Exchange</div>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
	<v-dialog v-model="isHistoryOpen" max-width="1200">
		<v-card>
			<v-card-title>{{ historyDataDesc }}</v-card-title>
			<GChart type="LineChart" :data="historyData" :options="chartOptions.chart" class="pb-5" />
		</v-card>
	</v-dialog>
</div>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
var _ = require('lodash');
import {
	GChart
} from 'vue-google-charts'

export default {
	name: "stocksOverview",
	components: {
		GChart
	},
	created: function () {
		let arraySymbols = this.symbols
		this.fetchStockData(arraySymbols)
	},
	methods: {
		async fetchStockData(symbols) {
			const fetchedStocks = await this.$axios.$get('https://sandbox.iexapis.com/stable/stock/market/batch?symbols='+symbols+'&types=quote&range=1m&last=5&token=Tsk_8e75cf29a1414892afcee000eb0a31f9')
			this.stockData =  Object.values(fetchedStocks)
		},
		async openHistoryDialiog(symbol, days) {
			this.historyData = []
			const fetchedHistory = await this.$axios.$get('https://sandbox.iexapis.com/stable/stock/'+symbol+'/chart/1m?token=Tsk_8e75cf29a1414892afcee000eb0a31f9')
			let outerHelper = []
			outerHelper.push(['Date', 'Price'])
			this.historyDataDesc = "History data of last " + days + " days  of " + symbol
			fetchedHistory.forEach((el,index) => {
			if(index < days) {
					let helper = []
					helper.push(moment(el.date).format('ll'))
					helper.push(el.open)
					outerHelper.push(helper)
			}
			})
			this.historyData = outerHelper
			this.isHistoryOpen = true
			console.log(this.historyData)
		},
		removeStock(symbol) {
			let hel = JSON.parse(JSON.stringify(this.symbols))
			let cleared = _.without(hel, symbol)
			firebase.firestore().collection('users').doc(this.currentUser.uid).update({
				stocks: cleared
			})
			this.chatHistoryData = []
			let arraySymbols = cleared
			this.fetchStockData(arraySymbols)
		}
	},
	props: {
		symbols: Array
	},
	data() {
		return {
			currentUser: this.$store.state.users.currentUser,
			stockData: {},
			chatHistoryData: [],
			historyDataDesc: "",
			chatHistoryDataDays: 10,
			isHistoryOpen: false,
			historyData: [],
			chartOptions: {
				chart: {
					width: 1000,
				}
			}
		}
	},
}
</script>

<style lang="scss"scoped>

</style>
