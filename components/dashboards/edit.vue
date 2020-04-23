<template>
<v-card-text>

    <div class="d-flex justify-space-between align-items-center full-width mb-5">
        <div class="error--text mt-10 mb-5">
            Dont forget to save your changes
        </div>
        <div>
            <v-btn @click="saveToStorage" class="mx-2" large dark color="green">
                <v-icon dark>mdi-content-save</v-icon>
                <span>Save</span>
            </v-btn>
            <v-btn @click="closeModal" class="mx-2" large dark color="error">
                <v-icon dark>mdi-close</v-icon>
                <span>Close</span>
            </v-btn>
        </div>
    </div>
    <h3 class="primary--text mb-4">Edit primary dashboard</h3>
    <v-expansion-panels class="mb-12">
        <draggable v-model="primaryEdit" class="full-width">
            <v-expansion-panel v-for="graph in primaryEdit">
                <v-expansion-panel-header>
                    <h3>{{graph.name}}</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-form>
                        <v-row>
                            <v-col cols="12">
                                <h3 class="primary--text">Graph label</h3>
                            </v-col>
                            <v-col cols="12" md="8" lg="6">
                                <v-text-field v-model="graph.name" label="Name your graph"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <h3 class="primary--text">Visulisation type</h3>
                            </v-col>
                            <v-col cols="12" md="8" lg="6">
                                <v-select v-model="graph.graph" :items="graphTypes" label="Choose visuliastion type" dense>
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <h3 class="primary--text">Stocks</h3>
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
                                <h3 class="primary--text">Data</h3>
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
                        <v-row>
                            <v-col cols="12">
                                <v-btn @click="removeFromDashboard(graph.name,'primary')" text small color="error">Remove graph from dashboard</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </draggable>
    </v-expansion-panels>
    <h3 class="primary--text mb-4">Edit secondary dashboard</h3>
    <v-expansion-panels class="mb-12">
        <draggable v-model="secondaryEdit" class="full-width">
            <v-expansion-panel v-for="graph in secondaryEdit">
                <v-expansion-panel-header>
                    <h3>{{graph.name}}</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-form>
                        <v-row>
                            <v-col cols="12">
                                <h3 class="primary--text">Graph label</h3>
                            </v-col>
                            <v-col cols="12" md="8" lg="6">
                                <v-text-field v-model="graph.name" label="Name your graph"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <h3 class="primary--text">Visulisation type</h3>
                            </v-col>
                            <v-col cols="12" md="8" lg="6">
                                <v-select v-model="graph.graph" :items="graphTypes" label="Choose visuliastion type" dense>
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <h3 class="primary--text">Stocks</h3>
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
                                <h3 class="primary--text">Data</h3>
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
                        <v-row>
                            <v-col cols="12">
                                <v-btn @click="removeFromDashboard(graph.name,'secondary')" text small color="error">Remove graph from dashboard</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </draggable>
    </v-expansion-panels>
    <v-snackbar v-model="snackbar" :timeout="2000">
        <div class="color--text">Changes has been saved. You can close window now</div>
    </v-snackbar>
    <v-snackbar v-model="snackbarRemoved" :timeout="2000">
        <div class="color--text">Graph has been removed</div>
    </v-snackbar>
</v-card-text>
</template>

<script>
import firebase from 'firebase'
import draggable from 'vuedraggable'
export default {
    name: "edit",
    components: {
        draggable
    },
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
        uid: {
            type: String
        }
    },
    created: function () {
        this.primaryEdit = JSON.parse(JSON.stringify(this.primary))
        this.secondaryEdit = JSON.parse(JSON.stringify(this.secondary))
    },
    methods: {
        saveToStorage() {
            firebase.firestore().collection('users').doc(this.uid).update({
                primary: this.primaryEdit,
            })
            firebase.firestore().collection('users').doc(this.uid).update({
                secondary: this.secondaryEdit
            })
            this.snackbar = true
        },
        removeFromDashboard(fullName, dashboard) {
            if (dashboard === 'primary') {
                let helper = this.primaryEdit
                helper = helper.filter(function (obj) {
                    return obj.name !== fullName
                })
                this.primaryEdit = helper
                this.snackbarRemoved = true
            }
            if (dashboard === 'secondary') {
                let helper = this.secondaryEdit
                helper = helper.filter(function (obj) {
                    return obj.name !== fullName
                })
                this.secondaryEdit = helper
                this.snackbarRemoved = true
            }
        },
        closeModal() {
            this.$router.go('/dashboard')
        }
    },
    data() {
        return {
            snackbar: false,
            snackbarRemoved: false,
            primaryEdit: [],
            secondaryEdit: [],
            graphTypes: ['Table', 'BarChart', 'LineChart', 'ColumnChart', 'Histogram', 'AreaChart', 'PieChart', 'BubbleChart', 'CandlestickChart', 'SteppedAreaChart', 'ScatterChart'],
        }
    }
}
</script>

<style>
.full-width {
    width: 100%;
}
</style>
