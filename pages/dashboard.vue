<template>
	<v-layout
		column
		align-start
		class="pl-6"
	>
		<div class="d-flex justify-space-between align-items-center full-width mb-5">
			<h1 class="mb-5">Dashboards</h1>
			<div>
				<v-btn @click="modals.addGraphIsOpen = true" class="mx-2" large dark color="green">
					<v-icon dark>mdi-plus</v-icon>
					<span>Add</span>
				</v-btn>
				<v-btn @click="modals.editDashboardIsOpen = true" class="mx-2" large dark color="secondary">
					<v-icon dark>mdi-table-edit</v-icon>
					<span>Edit</span>
				</v-btn>
			</div>
		</div>





		<v-dialog v-model="modals.addGraphIsOpen" fullscreen hide-overlay transition="dialog-bottom-transition"> 
			<v-card>
				<div class="d-flex justify-space-between align-items-center full-width px-5 pt-4">
					<h2>Add graph to dashboards</h2>
					<v-btn @click="closeAddGraphForm" class="mx-2" large dark color="error">
						<v-icon dark>mdi-close</v-icon>
					</v-btn>
				</div>
				<v-card-text>
					<v-form>
						<v-row>
							<v-col cols="12">
								<h3 class="primary--text"><strong>1.</strong>Add label to graph</h3>
							</v-col>
							<v-col cols="12" md="8" lg="6">
								<v-text-field
									label="Name your graph"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<h3 class="primary--text"><strong>2.</strong>Select dashboard</h3>
							</v-col>
							<v-col cols="12" md="8" lg="6">
								<v-select
									:items="dashboardTypes"
									label="Choose dashboard"
									dense
								>
								</v-select>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<h3 class="primary--text"><strong>3.</strong> Select visulisation type</h3>
							</v-col>
							<v-col cols="12" md="8" lg="6">
								<v-select
									:items="graphTypes"
									label="Choose visuliastion type"
									dense
								>
								</v-select>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<h3 class="primary--text"><strong>4.</strong> Select stock to be in graph based on your Stock portfolio from proper application page (maximum 3-5 recommend)</h3>
							</v-col>
							<v-col cols="12">
								<v-row>
									<v-col cols="2" v-for="aStock in companies">
										<v-checkbox :label="aStock" :value="aStock" ></v-checkbox>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<h3 class="primary--text"><strong>5.</strong>Select data (maximum 3-5 recommend)</h3>
							</v-col>
							<v-col cols="3">
								<v-switch
									label="Day high price"
								 ></v-switch>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<v-btn class="mx-2" large dark color="green">
									<v-icon dark>mdi-plus</v-icon>
									<span>Add graph to dashboard</span>
								</v-btn>
							</v-col>
						</v-row>
					</v-form>
				</v-card-text>
			</v-card>
		</v-dialog>










		<v-dialog v-model="modals.editDashboardIsOpen" fullscreen hide-overlay transition="dialog-bottom-transition"> 
			<v-card>
				<div class="d-flex justify-space-between align-items-center full-width px-5 pt-4">
					<h2>Edit dashboards</h2>
					<v-btn @click="closeAddGraphForm" class="mx-2" large dark color="error">
						<v-icon dark>mdi-close</v-icon>
					</v-btn>
				</div>
			</v-card>
		</v-dialog>





		<v-tabs light class="mb-6">
			<div class="d-flex align-center">Dashboards:</div>
			<v-tab @click="changeToPrimary()">Primary</v-tab>
			<v-tab @click="changeToSecondary()">Secondary</v-tab>
		</v-tabs>
		<primary v-if="dashboards.primary" :graphs="fetchedDashboardsData.primary" />
		<secondary v-if="dashboards.secondary" :graphs="fetchedDashboardsData.secondary" />
	</v-layout>
</template>

<script>
		import firebase from 'firebase'
		import { GChart } from 'vue-google-charts'
		import primary from "../components/dashboards/primary"
		import secondary from "../components/dashboards/secondary"

		export default {
				layout: 'app-layout',
				middleware: 'router-auth',
				components: {GChart, primary, secondary},
				created: function () {
						this.initStocks()
				},
				methods: {
					initStocks(){
						this.currentUser = this.$store.state.users.currentUser
						let allUsers = firebase.firestore().collection('users').doc(this.currentUser.uid)
						let getDoc = allUsers.get()
							.then(doc => {
								if (!doc.exists) {
								 console.log('No such document!');
							 } else {
								let val = JSON.parse(JSON.stringify(doc.data()))
								this.$store.commit('users/setCredentials', val)
								this.companies = val.stocks
								let arrayGraphs = val.primary
								arrayGraphs.forEach((element) => {
									let localGraphsArray = this.fetchGraph(element).then(
									singleGraph => {
										this.fetchedDashboardsData.primary.push(singleGraph)
									}
									)
								})
								let arrayGraphs2 = val.secondary
								arrayGraphs2.forEach((element2) => {
									let localGraphsArray2 = this.fetchGraph(element2).then(
									singleGraph2 => {
										this.fetchedDashboardsData.secondary.push(singleGraph2)
									}
									)
								})
							 }
						 })
					},
					async fetchGraph(graph) {
						let symbol = graph.symbol
						let graphOptions = graph
						let outerHelper = {}
						outerHelper.graphType = graphOptions.graph
						outerHelper.name = graphOptions.name
						outerHelper.data = []
						let descriptions = ["Name"]
						if(graphOptions.price) {
							descriptions.push("Actual price")
						}
						if(graphOptions.priceOpen) {
							descriptions.push("Price open")
						}
						if(graphOptions.dayHigh) {
							descriptions.push("Day high")
						}
						if(graphOptions.dayLow) {
							descriptions.push("Day low")
						}
						if(graphOptions.high52) {
							descriptions.push("52 weeks high")
						}
						if(graphOptions.low52) {
							descriptions.push("52 weeks low")
						}
						if(graphOptions.dayChange) {
							descriptions.push("Day change")
						}
						if(graphOptions.changePct) {
							descriptions.push("Change pct")
						}
						if(graphOptions.closeY) {
							descriptions.push("Close yeasterday")
						}
						if(graphOptions.marketCap) {
							descriptions.push("Market cap")
						}
						if(graphOptions.volume) {
							descriptions.push("Volume")
						}
						if(graphOptions.volume_avg) {
							descriptions.push("Avarage volume")
						}
						if(graphOptions.shares) {
							descriptions.push("Shares")
						}
						if(graphOptions.pe) {
							descriptions.push("PE ratio")
						}
						if(graphOptions.eps) {
							descriptions.push("EPS ratio")
						}
						if(graphOptions.currency) {
							descriptions.push("Currency")
						}
						if(graphOptions.exchange) {
							descriptions.push("Stock exchange")
						}
						if(graphOptions.timezone) {
							descriptions.push("Time")
						}
						outerHelper.data.push(descriptions)
						const fetchedStocks = await this.$axios.$get(this.$store.state.config.env.baseApiUrl+'stock?symbol='+symbol+ '&api_token='+this.$store.state.config.env.apiToken)
						console.log(fetchedStocks)
						fetchedStocks.data.forEach((element) => {
							let helper = []
							helper.push(element.name)
							if(graphOptions.price) {
								helper.push(parseFloat(element.price))
							}
							if(graphOptions.priceOpen) {
								helper.push(parseFloat(element.price_open))
							}
							if(graphOptions.dayHigh) {
								helper.push(parseFloat(element.day_high))
							}
							if(graphOptions.dayLow) {
								helper.push(parseFloat(element.day_low))
							}
							if(graphOptions.high52) {
								helper.push(parseFloat(element['52_week_high']))
							}
							if(graphOptions.low52) {
								helper.push(parseFloat(element['52_week_low']))
							}
							if(graphOptions.dayChange) {
								helper.push(parseFloat(element.day_change))
							}
							if(graphOptions.changePct) {
								helper.push(parseFloat(element.change_pct))
							}
							if(graphOptions.closeY) {
								helper.push(parseFloat(element.close_yesterday))
							}
							if(graphOptions.marketCap) {
								helper.push(parseFloat(element.market_cap))
							}
							if(graphOptions.volume) {
								helper.push(parseFloat(element.volume))
							}
							if(graphOptions.volume_avg) {
								helper.push(parseFloat(element.volume_avg))
							}
							if(graphOptions.shares) {
								helper.push(parseFloat(element.shares))
							}
							if(graphOptions.pe) {
								helper.push(parseFloat(element.pe))
							}
							if(graphOptions.eps) {
								helper.push(parseFloat(element.eps))
							}
							if(graphOptions.currency) {
								helper.push(parseFloat(element.currency))
							}
							if(graphOptions.exchange) {
								helper.push(parseFloat(element.stock_exchange_long))
							}
							if(graphOptions.timezone) {
								helper.push(parseFloat(element.timezone_name))
							}
							outerHelper.data.push(helper)
						})
						return outerHelper
					},
					changeToPrimary() {
						this.dashboards.primary = true
						this.dashboards.secondary = false
					},
					changeToSecondary() {
						this.dashboards.primary = false
						this.dashboards.secondary = true
					},
					closeAddGraphForm() {
						this.$router.go('/dashboard')
					},
				},
				data() {
						return {
							dashboards: {
								primary: true,
								secondary: false,
							},
							dashboardsData: {
								primary: [],
								secondary: [],
							},
							fetchedDashboardsData: {
								primary: [],
								secondary: [],
							},
							modals: {
								addGraphIsOpen: false,
								editDashboardIsOpen: false
							},
							graphTypes: ['Table','BarChart','LineChart','ColumnChart','Histogram','AreaChart','PieChart','BubbleChart','CandlestickChart','SteppedAreaChart','ScatterChart'],
							dashboardTypes: ['primary','secondary'],
							currentUser: '',
							symbols: '',
							companies: [],
							chatLoadedData: [],
							chartOptions: {
								base: {
									title: 'Base Stocks prices',
									crosshair: {trigger: 'both'},
									width: 500,
								}
							}
						}
				},
		}
</script>

<style>
	.full-width {
		width: 100%;
	}
</style>