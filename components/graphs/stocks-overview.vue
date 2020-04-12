<template>
<div>
	<v-row v-if="chatHistoryData.length > 0">
		<v-col cols="12" v-for="company in chatHistoryData" class="mb-5">
			<v-card>
				<v-card-title>
					<div class="full-width d-flex justify-space-between">
						<div class="d-flex">
							<div>
								{{ company.baseCreditials[0].name }}
								({{ company.baseCreditials[0].symbol }})
							</div>
							<div class="ml-2" :class="[parseFloat(company.baseCreditials[0].day_change) > 0 ?  'green--text' : 'red--text']">
								{{ company.baseCreditials[0].day_change }}
							</div>
						</div>
						<v-btn @click="removeStock(company.baseCreditials[0].symbol)" class="mx-2" small dark color="error">
							<v-icon dark>mdi-close</v-icon>
						</v-btn>
					</div>
				</v-card-title>
				<v-card-text>
					<v-row>
						<v-col cols="6">
							<v-row>
								<v-col cols="5">
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Currency</div>
										<div>{{ company.baseCreditials[0].currency }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Price</div>
										<div>{{ company.baseCreditials[0].price }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Price open</div>
										<div>{{ company.baseCreditials[0].price_open }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Day high</div>
										<div>{{ company.baseCreditials[0].day_high }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Day low</div>
										<div>{{ company.baseCreditials[0].day_low }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Day change</div>
										<div>{{ company.baseCreditials[0].day_change }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Change pct</div>
										<div>{{ company.baseCreditials[0].change_pct }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Closer yeasterday</div>
										<div>{{ company.baseCreditials[0].close_yesterday }}</div>
									</div>
								</v-col>
								<v-col cols="6" offset="1">
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">52 Weeks high</div>
										<div>{{ company.baseCreditials[0]['52_week_high'] }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">52 Weeks low</div>
										<div>{{ company.baseCreditials[0]['52_week_low'] }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">PE</div>
										<div>{{ company.baseCreditials[0].pe }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">EPS</div>
										<div>{{ company.baseCreditials[0].eps }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Market cap</div>
										<div>{{ company.baseCreditials[0].market_cap }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Volume</div>
										<div>{{ company.baseCreditials[0].volume }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Volume avrage</div>
										<div>{{ company.baseCreditials[0].volume_avg }}</div>
									</div>
									<div class="d-flex justify-space-between">
										<div class="font-weight-bold">Shares</div>
										<div>{{ company.baseCreditials[0].shares }}</div>
									</div>
								</v-col>
								<v-col cols="12">
									<div>Last trade time: {{ company.baseCreditials[0].last_trade_time }} {{ company.baseCreditials[0].timezone }}</div>
									<div>Stock exchange: {{ company.baseCreditials[0].stock_exchange_long }}</div>
								</v-col>
							</v-row>
						</v-col>
						<v-col cols="6">
							<GChart type="LineChart" :data="company.data" :options="chartOptions.chart" class="mb-5" />
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
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
		arraySymbols.forEach((element, index, array) => {
			let historyArray = this.fetchHistory(element).then(
				singleHistory => {
					this.chatHistoryData.push(singleHistory)
				}
			)
		})
	},
	methods: {
		async fetchHistory(usersSymbols) {
			let symbols = usersSymbols
			let outerHelper = {}
			var p = Promise.resolve(this.fetchStockData(usersSymbols));
			p.then(function (v) {
				outerHelper.baseCreditials = v
			});
			outerHelper.data = []
			const fetchedHistory = await this.$axios.$get(this.$store.state.config.env.baseApiUrl + 'history?symbol=' + symbols + '&api_token=' + this.$store.state.config.env.apiToken)
			Object.keys(fetchedHistory.history).forEach((key, index) => {
				if (index < this.chatHistoryDataDays) {
					let helper = []
					helper.push(moment(key).format('ll'))
					helper.push(parseFloat(fetchedHistory.history[key].high))
					outerHelper.data.push(helper)
				}
			})
			outerHelper.data.push(['Date', 'Price'])
			outerHelper.data = outerHelper.data.reverse()
			return outerHelper
		},
		async fetchStockData(symbols) {
			const fetchedStocks = await this.$axios.$get(this.$store.state.config.env.baseApiUrl + 'stock?symbol=' + symbols + '&api_token=' + this.$store.state.config.env.apiToken)
			return fetchedStocks.data
		},
		removeStock(symbol) {
			let hel = JSON.parse(JSON.stringify(this.symbols))
			let cleared = _.without(hel, symbol)
			firebase.firestore().collection('users').doc(this.currentUser.uid).update({
				stocks: cleared
			})
			this.chatHistoryData = []
			let arraySymbols = cleared
			arraySymbols.forEach((element, index, array) => {
				let historyArray = this.fetchHistory(element).then(
					singleHistory => {
						this.chatHistoryData.push(singleHistory)
					}
				)
			})
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
			chatHistoryDataDays: 10,
			chartOptions: {
				chart: {
					width: 500,
				}
			}
		}
	},
}
</script>

<style lang="scss"scoped>

</style>
