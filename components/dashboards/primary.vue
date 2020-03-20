<template>
	<div>
		<h2 class="mb-4">Primary dashboard</h2>
		<div v-for="graph in graphs">
			<h3><strong class="primary--text">{{ graph.name }}</strong></h3>
			<GChart :type="graph.graphType" :data="graph.data" :options="chartOptions" class="mb-5"/>  
		</div>
	</div>
</template>

<script>
	import { GChart } from 'vue-google-charts'
	export default {
		name: "primary",
		components: {GChart},
		props: {
			graphs: {
				type: Array
			}
		},
		data() {
			return {
				chartOptions: {
							crosshair: {trigger: 'both'},
							width: 1000,

				}				
			}
		}
	}
</script>