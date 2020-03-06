<template>
	<div v-if="chatHistoryData.length > 0">
		<div v-for="company in chatHistoryData" class="mb-5">
			<v-card>
				<v-card-title>{{company.name}}</v-card-title>
				<v-card-text>
					<GChart type="LineChart" :data="company.data"  :options="chartOptions.chart" class="mb-5 graph" />
				</v-card-text>
			</v-card>
		</div>
	</div>
</template>

<script>
		import firebase from 'firebase'
		import moment from 'moment'
		import { GChart } from 'vue-google-charts'

		export default {
				name: "historyGraphs",
				components: {GChart},
				created: function () { 					
					if(this.symbols.length > 0 ) {
						let arraySymbols = this.symbols
						arraySymbols.forEach((element, index, array) => {	
							let historyArray = this.fetchHistory(element).then(
								singleHistory => {
									this.chatHistoryData.push(singleHistory)
								}
							)
						})	
					}								
				},
				methods: {
					async fetchHistory(usersSymbols) {
						let symbols = usersSymbols
						let outerHelper = {}
						outerHelper.data = []
						outerHelper.data.push(['Date','Price']) 
						const fetchedHistory = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'history?symbol='+symbols+'&api_token='+this.$store.state.config.env.apiToken) 
						outerHelper.name = fetchedHistory.name
						Object.keys(fetchedHistory.history).forEach((key,index) => {
							if(index < this.chatHistoryDataDays) {
								let helper = []
								helper.push(moment(key).format('ll'))
								helper.push(parseFloat(fetchedHistory.history[key].high))
								outerHelper.data.push(helper)
							}
						})
						return outerHelper						
					},
				},
				props: {
					symbols: Array
				},
				data() {
						return {
							scoperdSymbols: '',
							chatHistoryData: [],
							chatHistoryDataDays: 10,
							chartOptions: {
								chart: {
									title: '',
									subtitle: '',
									width: 500,
								}
							}					
						}
				},
		}
</script>

<style lang="scss"scoped>

</style>