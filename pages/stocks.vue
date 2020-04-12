<template>
<v-layout column align-start class="pl-6">
	<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
		<v-card>
			<div class="d-flex justify-space-between align-items-center full-width px-5 pt-4">
				<h2>Search for stock</h2>
				<v-btn @click="closeSearchForm" class="mx-2" large dark color="error">
					<v-icon dark>mdi-close</v-icon>
				</v-btn>
			</div>
			<v-row>
				<v-col cols="8" offset="2">
					<v-row>
						<v-col cols="10">
							<v-text-field label="Search for stock" v-model.trim="searchForm.term" type="text" placeholder="Name or Symbol of company" solo-inverted />
						</v-col>
						<v-col cols="2">
							<v-btn @click="searchStock" class="mx-2" large dark color="primary">
								<v-icon dark>mdi-magnify</v-icon>
							</v-btn>
						</v-col>
						<v-col cols="12">
							<div v-if="searchForm.results" v-for="stock in searchForm.results">
								<div class="d-flex justify-space-between">
									<div class="d-flex justify-start py-4">
										<div class="pr-5">{{ stock.name }} ({{ stock.symbol }})</div>
										<div class="pr-5">{{ stock.price }} {{ stock.currency }}</div>
										<div class="pr-5">{{ stock.stock_exchange_long }}</div>
									</div>
									<div class="d-flex align-center">
										<v-btn @click="addStockToUser(stock.symbol)" small color="success">
											<v-icon dark>mdi-plus</v-icon>
										</v-btn>
									</div>
								</div>
								<hr>
								<v-snackbar v-model="snackbar" :timeout="2000">
									<div class="color--text">Added to portfolio. You can close window now</div>
								</v-snackbar>
							</div>
							<div v-if="searchForm.noResults">
								<v-alert type="error" class="mt-3">
									<strong>No results found, try again different term</strong>
								</v-alert>
							</div>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card>
	</v-dialog>
	<div class="d-flex justify-space-between align-items-center full-width mb-5">
		<h1>Stocks</h1>
		<v-btn @click="dialog = true" class="mx-2" large dark color="green">
			<v-icon dark>mdi-plus</v-icon>
			<span>Add stock</span>
		</v-btn>
	</div>
	<stocks-overview v-if="symbols.length" :symbols="symbols" />
</v-layout>
</template>

<script>
import firebase from 'firebase'
import {
	GChart
} from 'vue-google-charts'
import stocksOverview from "../components/graphs/stocks-overview"

export default {
	layout: 'app-layout',
	middleware: 'router-auth',
	components: {
		GChart,
		stocksOverview
	},
	created: function () {
		this.initStocks()
	},
	methods: {
		initStocks() {
			this.currentUser = this.$store.state.users.currentUser
			let allUsers = firebase.firestore().collection('users').doc(this.currentUser.uid)
			let getDoc = allUsers.get()
				.then(doc => {
					if (!doc.exists) {
						console.log('No such document!');
					} else {
						let val = JSON.parse(JSON.stringify(doc.data()))
						this.$store.commit('users/setCredentials', val)
						this.symbols = val.stocks
					}
				})
		},
		async searchStock() {
			let searchingTerm = this.searchForm.term
			const searchResults = await this.$axios.$get(this.$store.state.config.env.baseApiUrl + 'stock_search?search_term=' + searchingTerm + '&limit=5&api_token=' + this.$store.state.config.env.apiToken)
			if (Object.keys(searchResults.data).length > 0) {
				this.searchForm.noResults = false
				this.searchForm.results = searchResults.data
			} else {
				this.searchForm.results = []
				this.searchForm.noResults = true
			}
		},
		closeSearchForm() {
			this.$router.go('/stocks')
		},
		addStockToUser(newSymbol) {
			let hel = JSON.parse(JSON.stringify(this.symbols))
			hel.push(newSymbol)
			firebase.firestore().collection('users').doc(this.currentUser.uid).update({
				stocks: hel
			})
			this.snackbar = true
		}
	},
	data() {
		return {
			snackbar: false,
			dialog: false,
			currentUser: "",
			symbols: [],
			searchForm: {
				term: "",
				results: [],
				noResults: false
			},
		}
	},
	computer: {
		user() {
			return this.currentUser
		}
	}
}
</script>

<style>
.full-width {
	width: 100%;
}
</style>
