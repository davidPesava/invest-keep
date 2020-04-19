<template>
<div>
	<h2 class="mb-4">Primary dashboard</h2>
	<draggable>
		<div>
			<div class="d-flex justify-space-between">
				<h3><strong class="primary--text">Actual prices - Portfolio car manufatcures</strong></h3><v-icon>mdi-arrow-all</v-icon>
			</div>
			<GChart type="ColumnChart" :data="prvni" :options="chartOptions" class="mb-5" />
		</div>
		<div>
			<div class="d-flex justify-space-between">
				<h3><strong class="primary--text">Day change - Portfolio car manufatcures</strong></h3><v-icon>mdi-arrow-all</v-icon>
			</div>
			<GChart type="BarChart" :data="druhy" :options="chartOptions" class="mb-5" />
		</div>
		<div>
			<div class="d-flex justify-space-between">
				<h3><strong class="primary--text">Ratios - Portfolio car manufatcures</strong></h3><v-icon>mdi-arrow-all</v-icon>
			</div>
			<GChart type="Table" :data="treti" :options="chartOptions" class="mb-5" />
		</div>
		<div>
			<div class="d-flex justify-space-between">
				<h3><strong class="primary--text">Market parcipitation - Portfolio car manufatcures</strong></h3><v-icon>mdi-arrow-all</v-icon>
			</div>
			<GChart type="PieChart" :data="ctvrty" class="mb-5" />
		</div>
		<div>
			<div class="d-flex justify-space-between">
				<h3><strong class="primary--text">Prices strentgh - Portfolio car manufatcures</strong></h3><v-icon>mdi-arrow-all</v-icon>
			</div>
			<GChart type="BubbleChart" :data="paty" class="mb-5" />
		</div>
	</draggable>
</div>
</template>

<script>
import {
	GChart
} from 'vue-google-charts'
import draggable from 'vuedraggable'

export default {
	name: "showcase",
	components: {
		GChart,
		draggable
	},
	props: {
		graphs: {
			type: Array
		}
	},
	data() {
		return {
			prvni: [
				["Test", "Actual price"],
				["VOL3.F", 5.12],
				["TL0.DE", 8.68],
				["F", 11.48],
			],
			druhy: [
				["Test", "Day change"],
				["VOL3.F", 0.52],
				["TL0.DE", -0.25],
				["F", 2.56, ]
			],
			treti: [
				["Test", "PE", "EPS"],
				["VOL3.F", 5.59, 2.1],
				["TL0.DE", 1.29, 8.11],
				["F", 4.25, 1.52]
			],
			ctvrty: [
				["Test", "Shares parcipitation"],
				["VOL3.F", 13775962],
				["TL0.DE", 25779962],
				["F", 15779962]
			],
			paty: [
				["Test", "Highest of the day", "Lowest of the day"],
				["VOL3.F", 8.59, 8.11],
				["TL0.DE", 8.71, 8.52],
				["F", 8.1, 8.3]
			],
			chartOptions: {
				crosshair: {
					trigger: 'both'
				},
				width: 1000,

			}
		}
	}
}
</script>
