<template>
	<div>
		<h2 class="mb-4">Earnings calculator</h2>
		{{ symbols }}
	</div>
</template>

<script>
	export default {
		name: "earnings",
		props: {
			symbols: {
				default: Array
			}
		}
	}
</script>