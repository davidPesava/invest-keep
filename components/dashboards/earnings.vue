<template>
	<div>
		<h2 class="mb-4">Earnings calculator</h2>
		<v-form>
			<div v-for="item in calBaseData">
				<v-text-field v-model="item.symbol" readonly></v-text-field>
				<v-text-field v-model="item.amount"></v-text-field>
			</div>
			<v-btn depressed large color="primary">Calculate</v-btn>
		</v-form>
	</div>
</template>

<script>
	export default {
		name: "earnings",
		created: async function () {
			let symbolsArray = this.symbols.toString()
			const fetchedActualPrices = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'stock?symbol='+symbolsArray+'&api_token='+this.$store.state.config.env.apiToken)
			console.log(fetchedActualPrices.data)
			this.symbols.forEach((symbol) => {
				fetchedActualPrices.data.forEach((price) => {
				let helper = {}
				helper.symbol = symbol
				helper.amount = 0
				helper.price = price.price
				this.calBaseData.push(helper)
				})
			})
			//console.log(this.calBaseData)
		},
		data() {
			return {
				calBaseData: [],
			}
		},
		props: {
			symbols: {
				default: Array
			}
		}
	}
</script>