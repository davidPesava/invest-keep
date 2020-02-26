<template>
	<div>
		<div v-for="graph in chatHistoryData">
			<GChart type="LineChart" :data="graph" class="mb-5"/>
		</div>
    </div>
</template>

<script>
		import firebase from 'firebase'
        import { GChart } from 'vue-google-charts'

		export default {
                name: "historyGraphs",
				components: {GChart},
				created: function () { 					
                    /*
                    Fetch each stock into one history graph
                    */
                    let arraySymbols = this.symbols.split(",")
                    
					arraySymbols.forEach((element, index, array) => {
						console.log(element)
						let historyArray = this.fetchHistory(element).then(
							singleHistory => {
								this.chatHistoryData.push(singleHistory)
							}
						)
					})									
				},
				methods: {
					async fetchHistory(usersSymbols) {
						let symbols = usersSymbols
						let outerHelper = []
						outerHelper .push(['Date','Price'])
						const fetchedHistory = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'history?symbol='+symbols+'&api_token='+this.$store.state.config.env.apiToken)
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
                props: {
                    symbols: String
                },
				data() {
						return {
							chatHistoryData: [],
							chatHistoryDataDays: 14,
						}
				},
		}
</script>
