<template>
	<div>
        <div class="default-layout__block" id="functions">
            <v-row>
                <v-col cols="12" md="7">
                    <img src="/graphs.jpg" alt="InvestKeep Main" class="default-layout__cover">
                </v-col>
                <v-col cols="12" md="5" class="default-layout__topCover">
                    <div>
                        <h2 class="display-2 mb-3">Functions to help</h2>
                            <ul class="default-layout__benefits">
                                <li>Great database of stocks of all market leading companies</li>
                                <li>Stock data visualisation</li>
                                <li>Currency data visualisation</li>
                                <li>Custom dashboards</li>
                                <li>Portfolio summaries</li>
                            </ul>
                    </div>
                </v-col>
            </v-row>
        </div>
        <div class="default-layout__block" id="stocks">
            <v-row>
                <v-col cols="12" md="5" class="default-layout__topCover">
                    <div>
                        <h2 class="display-2 mb-3">Stocks & Currencies</h2>
                        <p>From web service <a href="https://www.worldtradingdata.com/" target="_blank">World Trading Data</a> that is our data provider,
                        we can offer your wide collection of Stocks and Currencies to create your visualisable portfolios.
                        It's easy, just type name of company or currency and see all that data you need.
                        </p>
                    </div>
                </v-col>
                <v-col cols="12" md="7">
                    <img src="/data.png" alt="InvestKeep Main" class="default-layout__cover">
                </v-col>
            </v-row>
        </div>
        <div class="default-layout__block" id="faq">
            <v-row>
                <h2 class="display-2 text-center d-block full-width mb-5">Frequently asked questions</h2>
                <v-col cols="12" class="default-layout__topCover">
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header><strong>How much does it cost?</strong></v-expansion-panel-header>
                            <v-expansion-panel-content>
                                It's completly free!
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
                <v-col cols="12">
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header><strong>Which data you can offer?</strong></v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <p>From web service <a href="https://www.worldtradingdata.com/" target="_blank">World Trading Data</a> that is our data provider,
                                we can offer your wide collection of Stocks and Currencies to create your visualisable portfolios.
                                It's easy, just type name of company or currency and see all that data you need.
                                </p>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
                <v-col cols="12">
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header><strong>Do I need registration?</strong></v-expansion-panel-header>
                            <v-expansion-panel-content>
                                Yes
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
                <v-col cols="12">
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header><strong>Which actives types can I found in App?</strong></v-expansion-panel-header>
                            <v-expansion-panel-content>
                                Currently stocks and forex.
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </div>
        <div class="default-layout__block" id="about">
            <v-row>
                <h2 class="display-2 text-center d-block full-width mb-5">About</h2>
                <v-col cols="12">
                    <p class="text-center">This application was made as part of bachleor final work and is open-source.</p>
                    <p class="text-center mb-6">You can find source code <a href="https://github.com/davidPesava/invest-keep" target="_blank">HERE</a>.</p>
                    <h3 class="headline text-center">Powered by:</h3>
                    <div class="default-layout__tech-logos">
                        <img src="/vue.png" alt="Vue.js">
                        <img src="/v.png" alt="Vuetify">
                        <img src="/firebase.png" alt="Firebase">
                        <img src="/nuxt.png" alt="NUXT">
                        <img src="/wtd.png" alt="World trading data">
                    </div>
                </v-col>
            </v-row>
        </div>
	</div>
</template>

<script>
	export default {
        name: "defaultPageContent",
	}
</script>

<style lang="scss" scoped>
  .default-layout__menu {
	position: fixed;
	z-index: 99;
	background: #fff;
	width: 100%;
	box-shadow: 0 2px 30px 0 rgba(0,0,0,0.1);
  }
  .default-layout__menu-spacer {
	  padding-top: 5rem
  }

  .default-layout__menu-buttons {
	display: flex;
	justify-content: center;

	@media screen and (min-width: 960px) {
		justify-content: flex-end
	}
  }

  .defaul-layout__menu-items {
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;

	@media screen and (min-width: 960px) {
		flex-direction: row;
	}
  }

  .defaul-layout__menu-item {
	font-weight: bold;
	text-decoration: none;
	width: 100%;
	text-align: center;
	padding: 0.5rem;
	color: rgba(0, 0, 0, 0.87);
	border-bottom: 1px solid #ddd;

	@media screen and (min-width: 960px) {
		width: auto;
		background: transparent;
		text-align: left;
		padding: 0;
		margin-right: 2rem;
		padding-top: 0.7rem;
		border-bottom: 0;
	}

	  &:hover {
		  text-decoration: underline;
		  color: #1976d2;
	  }
  }

  .default-layout__mobile-menu-opener {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 1rem;
  }

  .default-layout__cover {
	  width: 100%;
  }

  .default-layout__topCover {
	display: flex;
	align-items: center;
	justify-content: center;
  }

  .default-layout__block {
	  padding-top: 2rem;
  }

  .default-layout__benefits {
	li {
		margin-bottom: 1rem;
		list-style-type: none;
		position: relative
	}

	li:before {
		content: "";
		width: 8px;
		height: 8px;
		background: #1976d2;
		position: absolute;
		border-radius: 100%;
		left: -18px;
		top: 7px;
	}
  }

  .default-layout__block {
	  min-height: 400px;
	  margin-bottom: 2rem;
	  padding-bottom: 4.5rem;
	  border-bottom: 1px solid #ddd;
  }

  .default-layout__tech-logos {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  flex-direction: column;

	@media screen and (min-width: 960px) {
		flex-direction: row;
	}

	  img {
		width: 100px;
		height: auto;
		margin: 3rem
	  }
  }

  .full-width {
	  width: 100%;
  }
</style>