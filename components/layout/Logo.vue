<template>
	<nuxt-link to="/">
		<img 
			:src="small ? '/logo-small.png' : '/logo.png'"
			:class="small ? 'logo--small' : 'logo'"
			alt="logo"
		/>
	</nuxt-link>
</template>

<script>
	export default {
		name: "Logo",
		props: {
			small: {
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped>
    .logo {
        width: 200px
    }
	.logo--small {
		width: 150px;
    	margin: auto;
    	display: block;
    	padding: 1rem;
	}
</style>
