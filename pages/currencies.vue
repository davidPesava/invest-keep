<template>
	<v-layout
		column
		align-start
		class="pl-6"
	>
	<h1>Currencies (FOREX)</h1>
	<v-row class="full-width">
		<v-col v-if="currencies" v-for="exchange in currencies" cols="6" md="4" lg="3">
			<v-card>
				<v-card-title>
					1 {{ exchange.from }}
					to
					{{ exchange.to }}
				</v-card-title>
				<v-card-subtitle>
					<strong>{{ exchange.value }}</strong>
				</v-card-subtitle>
			</v-card>
		</v-col>
	</v-row>
	</v-layout>
</template>

<script>
	import firebase from 'firebase'
	import { GChart } from 'vue-google-charts'

	export default {
		layout: 'app-layout',
		middleware: 'router-auth',
		created: function () { 
			this.initCurrencies()
			
		},
		data () {
			return {
				currencies: [],
				currentUser: {},
			}
		},
		methods: {
			initCurrencies() {
				this.currentUser = this.$store.state.users.currentUser
				let allUsers = firebase.firestore().collection('users').doc(this.currentUser.uid)
				let getDoc = allUsers.get()
					.then(doc => {
						if (!doc.exists) {
						 console.log('No such document!');
					 } else {
						let val = JSON.parse(JSON.stringify(doc.data()))
						this.$store.commit('users/setCredentials', val)	
						val.currencies.forEach((element) => {
							let currenciesArray = this.fetchCurrencies(element.from, element.to).then(
								singleCurrency => {
									let helper = {}
									helper.from = element.from
									helper.to = element.to
									helper.value = singleCurrency[Object.keys(singleCurrency)[0]]
									this.currencies.push(helper)
								}
							)
						})						
					 }
				 })
			},		
			async fetchCurrencies(from,to) {
				let curFrom = from
				let curTot = to
				const searchResults = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'forex?base='+curFrom+'&convert_to='+curTot+'&api_token='+this.$store.state.config.env.apiToken)
				return searchResults.data
			},
		},		
	}
</script>

<style>
	.full-width {
		width: 100%;
	}
</style>