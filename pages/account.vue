<template>
<v-layout column align-start class="pl-6">
	<h1>Your account</h1>
	<div class="full-width">
		<v-row>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-text class="primary--text">Last login at: <strong>{{ lastLogin }}</strong></v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-text class="primary--text">Account created at: <strong>{{ creationDate }}</strong></v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12">
				<v-alert v-if="change.wasChanged" type="success" class="mt-3">
					<strong>Profile was updated</strong>
				</v-alert>
				<v-alert v-if="changeError.length > 0" type="error" class="mt-3">
					<strong>{{ changeError }}</strong>
				</v-alert>
			</v-col>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title>Change Email</v-card-title>
					<v-card-text>
						<v-form @submit.prevent>
							<v-text-field v-model.trim="change.email" type="text" placeholder="Email" solo-inverted />
							<v-btn @click="changeEmail" depressed large color="secondary">Change email</v-btn>
						</v-form>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title>Change password</v-card-title>
					<v-card-text>
						<v-form @submit.prevent>
							<v-text-field v-model="change.password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'" label="Password" hint="At least 6 characters" counter solo-inverted @click:append="showPassword = !showPassword" />
							<v-text-field v-model="change.passwordConfirm" :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword2 ? 'text' : 'password'" label="New password again" hint="At least 6 characters" counter solo-inverted @click:append="showPassword2 = !showPassword2" />
							<v-btn @click="changePassword" depressed large color="secondary">Change password</v-btn>
						</v-form>
					</v-card-text>
				</v-card>
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
	created: function () {
		this.currentUser = this.$store.state.users.currentUser
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
				email: '',
				wasChanged: false,
			},
		}
	},
	methods: {
		changePassword() {
			if (this.change.password === this.change.passwordConfirm) {
				firebase.auth().currentUser.updatePassword(this.change.password).then(change => {
					this.change.wasChanged = true
				}).catch(err => {
					this.changeError = err.message
				})
			} else {
				this.changeError = "Password are not matching"
			}
		},
		changeEmail() {
			firebase.auth().currentUser.updateEmail(this.change.email).then(change => {
				this.change.wasChanged = true
			}).catch(err => {
				this.changeError = err.message
			})
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
