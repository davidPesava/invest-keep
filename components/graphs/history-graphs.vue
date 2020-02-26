<template>
	<div>
        <!-- First loop start - of object -->
        <!-- Then print company name -->
        <!-- Start inner loop -->
		<div v-for="graph in chatHistoryData"> <!-- This will be inner loop of data -->
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
                        let outerHelper = [] // to be object
                        // 1) add property string to outer helper name
                        // 2) add property array data to outer helper
						outerHelper .push(['Date','Price']) // will push into array data property 
						const fetchedHistory = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'history?symbol='+symbols+'&api_token='+this.$store.state.config.env.apiToken)
                        
                        // 3) here add company name into outer helper property name
                        Object.keys(fetchedHistory.history).forEach((key,index) => {
							if(index < this.chatHistoryDataDays) {
								let helper = []
								helper.push(key)
								helper.push(parseFloat(fetchedHistory.history[key].high))
								outerHelper.push(helper) // will push into outer helper property data egc- -> outerHelper.data.push(helper)
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
