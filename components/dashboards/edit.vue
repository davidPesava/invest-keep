<template>
<v-card-text>
	<h3 class="primary--text mb-4">Edit primary dashboard</h3>
	<v-expansion-panels class="mb-12">
		<v-expansion-panel v-for="graph in primaryEdit">
			<v-expansion-panel-header>
				<h3 class="secondary--text">{{graph.name}}</h3>
			</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-form>
					<v-row>
						<v-col cols="12">
							<h3 class="primary--text"><strong>1.</strong>Add label to graph</h3>
						</v-col>
						<v-col cols="12" md="8" lg="6">
							<v-text-field v-model="graph.name" label="Name your graph"></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12">
							<h3 class="primary--text"><strong>2.</strong> Select visulisation type</h3>
						</v-col>
						<v-col cols="12" md="8" lg="6">
							<v-select v-model="graph.graph" :items="graphTypes" label="Choose visuliastion type" dense>
							</v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12">
							<h3 class="primary--text"><strong>3.</strong> Select stock to be in graph based on your Stock portfolio from proper application page (maximum 3-5 recommend)</h3>
						</v-col>
						<v-col cols="12">
							<v-row>
								<v-col cols="2" v-for="aStock in companies">
									<v-checkbox :label="aStock" :value="aStock" v-model="graph.symbol" color="green"></v-checkbox>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12">
							<h3 class="primary--text"><strong>4.</strong>Select data (maximum 3-5 recommend)</h3>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.price" label="Actual price" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.priceOpen" label="Price open - today" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.dayHigh" label="Today highest price" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.dayLow" label="Today lowest price" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.high52" label="Highest price of last 52 weeks" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.low52" label="Lowest price of last 52 weeks" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.dayChange" label="Today change" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.changePct" label="Today change in PCT" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.closeY" label="Yesterday close price" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.marketCap" label="Market Cap" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.volume" label="Volume - actual" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.volume_avg" label="Volume - avrage" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.shares" label="Number of shares" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.pe" label="PE ratio" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.eps" label="EPS ratio" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.currency" label="Currency" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.exchange" label="Exchange" color="green"></v-switch>
						</v-col>
						<v-col cols="3">
							<v-switch v-model="graph.timezone" label="Timezone" color="green"></v-switch>
						</v-col>
					</v-row>
				</v-form>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>

	<h3 class="primary--text">Edit secondary dashboard</h3>
</v-card-text>
</template>

<script>
export default {
	name: "edit",
	props: {
		primary: {
			type: Array
		},
		secondary: {
			type: Array
		},
		companies: {
			type: Array
		},
	},
	created: function () {
		this.primaryEdit = JSON.parse(JSON.stringify(this.primary))
		this.secondaryEdit = JSON.parse(JSON.stringify(this.secondary))
	},
	data() {
		return {
			primaryEdit: [],
			secondaryEdit: [],
			graphTypes: ['Table', 'BarChart', 'LineChart', 'ColumnChart', 'Histogram', 'AreaChart', 'PieChart', 'BubbleChart', 'CandlestickChart', 'SteppedAreaChart', 'ScatterChart'],
		}
	}
}
</script>
