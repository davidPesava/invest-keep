<template>
	<v-card>
		<v-card-title>Login</v-card-title>
		<v-card-text>
			<v-alert v-if="loginError.length > 0" type="error" class="mt-3">
    			<strong>{{ loginError }}</strong>
  			</v-alert>
			<v-alert v-if="forgotPassword.emailSent > 0" type="success" class="mt-3">
    			<strong>Reset link was send to your email</strong>
  			</v-alert>				  			
			<v-form @submit.prevent>
				<v-text-field
					label="Email"
					v-model.trim="loginForm.email"
					type="text"
					placeholder="you@email.com"
					solo-inverted
				/>
				<v-text-field
					v-model="loginForm.password"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					:type="showPassword ? 'text' : 'password'"
					label="Password"
					hint="At least 6 characters"
					counter
					solo-inverted
					@click:append="showPassword = !showPassword"
				/>
				<v-btn @click="login" depressed large color="primary">Log In</v-btn>
			</v-form>
			<div v-if="!forgotPassword.isForgotPasswordFormOpen"
				 @click="handleForgotPasswordForm" 
				 class="login-form__forgot-password-link">
				 I forgot my password
			</div>
			<v-form v-if="forgotPassword.isForgotPasswordFormOpen" @submit.prevent class="mt-12">
				<h3 class="mb-3">Password reset</h3>
				<v-text-field
					label="Email"
					v-model.trim="forgotPassword.email"
					type="text"
					placeholder="you@email.com"
					solo-inverted
				/>
				<v-btn @click="resetPassword" depressed large color="secondary">Reset password</v-btn>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script>
	import firebase from 'firebase'

	export default {
		name: "LoginForm",
		data() {
			return {
				showPassword: false,
				loginError: '',
				loginForm: {
					email: '',
					password: '',
				},
				forgotPassword: {
					isForgotPasswordFormOpen: false,
					emailSent: false,
					email: '',
				}				
			}
		},
		methods: {
			login() {
				//Login user
				firebase.auth().signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
					let val = JSON.parse(JSON.stringify(user.user))
					this.$store.commit('users/setCurrentUser', val)
					// Get Data from firestore
					let allUsers = firebase.firestore().collection('users').doc(val.uid)
					let getDoc = allUsers.get()
						.then(doc => {
							if (!doc.exists) {
								console.log('No such document!');
							} else {
								let val = JSON.parse(JSON.stringify(doc.data()))
								this.$store.commit('users/setCredentials', val)						
								this.$emit('updateUser')
							}
						})
						.catch(err => {
							console.log('Error getting document', err)
						});
				}).catch(err => {
						this.loginError = err.message
				})
			},
			resetPassword() {
				this.forgotPassword.emailSent = true
				firebase.auth().sendPasswordResetEmail(this.forgotPassword.email).then(function() {
					}).catch(function(error) {});
			},
			handleForgotPasswordForm() {
				this.forgotPassword.isForgotPasswordFormOpen  = !this.forgotPassword.isForgotPasswordFormOpen
			},			
		}
	}
</script>

<style lang="scss" scoped>
	form {
		display: flex;
		flex-direction: column;
	}

	.login-form__forgot-password-link {
		width: 100%;
		text-align: right;
		margin-top: 2rem;
		text-decoration: underline;
		cursor: pointer;
	}
</style>
