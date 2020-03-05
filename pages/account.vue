<template>
	<v-layout
		column
		justify-start
		align-start
		class="pl-6"	
	>
	<h1>Your account</h1>
	<div class="full-width">
		<v-row >
			<v-col cols="6">
				<v-card>
					<v-card-text class="primary--text">Last login at: <strong>{{ lastLogin }}</strong></v-card-text>
				</v-card>
			</v-col>
			<v-col cols="6">
				<v-card>
					<v-card-text class="primary--text">Account created at: <strong>{{ creationDate }}</strong></v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="5">
				<h2>Change password</h2>
				<v-alert v-if="change.wasChanged" type="success" class="mt-3">
					<strong>Password was changed</strong>
				</v-alert>					
				<v-alert v-if="changeError.length > 0" type="error" class="mt-3">
					<strong>{{ changeError }}</strong>
				</v-alert>			  			
				<v-form @submit.prevent>
					<v-text-field
						v-model="change.password"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPassword ? 'text' : 'password'"
						name="input-10-1"
						label="Password"
						hint="At least 6 characters"
						counter
						solo-inverted
						@click:append="showPassword = !showPassword"
					/>
					<v-text-field
						v-model="change.passwordConfirm"
						:append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPassword2 ? 'text' : 'password'"
						name="input-10-1"
						label="Password confirmation"
						hint="At least 6 characters"
						counter
						solo-inverted
						@click:append="showPassword2 = !showPassword2"
					/>
					<v-btn @click="changePassword" depressed large color="primary">Change password</v-btn>
				</v-form>				
			</v-col>
		</v-row>	
		</div>
	</v-layout>
</template>

<script>
	import moment from 'moment'
	import firebase from 'firebase'

	export default {
		layout: 'app-layout',
		middleware: 'router-auth',
		created: function() {
			this.currentUser = this.$store.state.users.currentUser
			console.log(this.currentUser)
		},
		data() {
			return {
				currentUser: null,
				showPassword: false,
				showPassword2: false,
				changeError: '',
				change: {
					password: '',
					passwordConfirm: '',
					wasChanged: false,
				},				
			}
		},   
		methods: {
			changePassword() {
				if(this.change.password === this.change.passwordConfirm) {
					firebase.auth().currentUser.updatePassword(this.change.password).then(change => {
						this.change.wasChanged = true
					}).catch(err => {
						this.changeError = err.message
					})			
				} else {
					this.changeError = "Password are not matching"
				}
			}
		},
		computed: {
			lastLogin() {
				return moment(this.currentUser.lastLoginAt, "x").format('LLL')
			},
			creationDate() {
				return moment(this.currentUser.createdAt, "x").format('LLL')
			}           
		}     
	}
</script>

<style>
.full-width {
	width: 100%;
}
</style>