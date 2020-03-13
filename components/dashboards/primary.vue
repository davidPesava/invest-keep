<template>
	<div>
		<h2 class="mb-4">Primary dashboard</h2>
		<div v-for="graph in graphTypes">
			<GChart :type="graph" :data="chatLoadedData" :options="chartOptions" class="mb-5"/>  
		</div>
	</div>
</template>

<script>
	import { GChart } from 'vue-google-charts'
	export default {
		name: "primary",
		components: {GChart},
		props: {
			chatLoadedData: {
				type: Array,
			},
			graphTypes: {
				type: Array,
			},
			chartOptions: {
				type: Object,
			}
		}
	}
</script>