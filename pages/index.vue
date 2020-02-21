<template>
	<div>
		<div class="default-layout__menu">
			<v-row>
				<v-col cols="8" md="3">
					<Logo class="pl-8" />
				</v-col>
				<v-col cols="4" class="d-md-none default-layout__mobile-menu-opener">
					<v-btn @click="handleMobileMenu" class="ma-2" color="primary">
	  					<v-icon v-if="isMobileMenuOpen">mdi-close</v-icon>
	  					<v-icon v-else>mdi-format-list-bulleted-square</v-icon>
					</v-btn>
				</v-col>
				<v-col 
					cols="12" 
					md="6"
					:class="isMobileMenuOpen ? 'd-xs-block' : 'd-none d-md-block'"
				>
					<div class="defaul-layout__menu-items">
						<a href="#about" class="defaul-layout__menu-item" v-smooth-scroll>About</a>
						<a href="#functions" class="defaul-layout__menu-item" v-smooth-scroll>Functions</a>
						<a href="#stocks" class="defaul-layout__menu-item" v-smooth-scroll>Stocks</a>
						<a href="#currency" class="defaul-layout__menu-item" v-smooth-scroll>Currency</a>
						<a href="#faq" class="defaul-layout__menu-item" v-smooth-scroll>FAQ</a>
					</div>
				</v-col>
				<v-col 
					cols="12" 
					md="3"
					:class="isMobileMenuOpen ? 'd-xs-block' : 'd-none d-md-block'"
				>
					<div v-if="currentUser" class="default-layout__menu-buttons pr-md-8">
						<log-out-button class="ma-2" />
						<div>
							<v-btn
								class="ma-2"
								color="secondary"
								href="/db"
							>
								To app
							</v-btn>
						</div>							
					</div>
					<div v-else class="default-layout__menu-buttons pr-8">
						<v-btn
							class="ma-2"
							color="secondary"
							@click="handleRegisterForm"
						>
							Get started
						</v-btn>					
						<v-btn
							class="ma-2"
							color="primary"
							@click="handleLoginForm"
						>
							Login
						</v-btn>
					</div>
				</v-col>
			</v-row>
		</div>		
		<v-container class="default-layout__menu-spacer">
			<v-row>
				<v-col v-if="currentUser" cols="12">
					<v-card raised class="mt-3">
						<v-card-title>You are logged in! What next?</v-card-title>
						<v-card-text>You can now access the whole application and it's functionality. continue to Dashboard</v-card-text>
						<v-card-actions>
							<v-btn
								class="ma-2"
								color="error"
								href="/db"
							>
								Take me there
							</v-btn>						
						</v-card-actions>
					</v-card>
				</v-col>				
				<v-col v-if="!currentUser && isLoginFormOpen" cols="12">
					<login-form
						class="mb-5"
						@updateUser = getDataFromChild />
				</v-col>
				<v-col v-if="!currentUser && isRegisterFormOpen" cols="12">
					<register-form class="mb-5" />
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	import LoginForm from "../components/auth/LoginForm"
	import RegisterForm from "../components/auth/RegisterForm"
	import LogOutButton from "../components/auth/LogOutButton"

	import Logo from "../components/layout/Logo"

	export default {
		components: {
			LoginForm, RegisterForm, LogOutButton, Logo
		},
		middleware: 'router-auth',
		data() {
			return {
				currentUser: null,
				credential: null,
				isMobileMenuOpen: false,
				isRegisterFormOpen: false,
				isLoginFormOpen: false,
			}
		},
		created: function () {
			this.getDataFromChild()
			
		},
		methods: {
			getDataFromChild() {
				this.currentUser = this.$store.state.users.currentUser
			},
			handleMobileMenu() {
				this.isMobileMenuOpen  = !this.isMobileMenuOpen 
			},
			handleRegisterForm() {
				this.isLoginFormOpen = false
				this.isMobileMenuOpen = false
				this.isRegisterFormOpen  = !this.isRegisterFormOpen 
			},
			handleLoginForm() {
				this.isRegisterFormOpen = false
				this.isMobileMenuOpen = false
				this.isLoginFormOpen  = !this.isLoginFormOpen
			},
		},
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
	  }
  }

  .default-layout__mobile-menu-opener {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 1rem;
  }
</style>