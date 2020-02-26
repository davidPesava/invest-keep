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
		</v-row>	
		</div>
	</v-layout>
</template>

<script>
	import moment from 'moment'
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