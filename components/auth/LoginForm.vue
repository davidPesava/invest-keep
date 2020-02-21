<template>
	<v-card>
		<v-card-title>Login</v-card-title>
		<v-card-text>
			<v-alert v-if="loginError.length > 0" type="error" class="mt-3">
    			<strong>{{ loginError }}</strong>
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
					name="input-10-1"
					label="Password"
					hint="At least 6 characters"
					counter
					solo-inverted
					@click:append="showPassword = !showPassword"
				/>
				<v-btn @click="login" depressed large color="primary">Log In</v-btn>
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
				password: ''
				},
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	form {
		display: flex;
		flex-direction: column;
	}
</style>
