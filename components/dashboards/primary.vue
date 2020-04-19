<template>
<div>
	<h2 class="mb-4">Primary dashboard</h2>
	<draggable>
		<div v-for="graph in graphs">
			<div class="d-flex justify-space-between">
				<h3><strong class="primary--text">{{ graph.name }}</strong></h3><v-icon>mdi-arrow-all</v-icon>
			</div>
			<GChart :type="graph.graphType" :data="graph.data" :options="chartOptions" class="mb-5" />
		</div>
	</draggable>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import {
	GChart
} from 'vue-google-charts'
export default {
	name: "primary",
	components: {
		GChart, draggable
	},
	props: {
		graphs: {
			type: Array
		}
	},
	data() {
		return {
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
