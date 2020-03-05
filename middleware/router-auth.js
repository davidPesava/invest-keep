import firebase from 'firebase'

export default function({ app,store, redirect, route }) {
    return new Promise((resolve, reject) => firebase.auth().onAuthStateChanged(user => {
      let val = JSON.parse(JSON.stringify(user))
      store.commit('users/setCurrentUser', val)
      if (route.matched.some(record => record.path == ('/dashboard' || '/stocks' || '/account' || '/currencies')) && store.state.users.currentUser == null) {
        redirect("/")
      }

      resolve(val)
  }))}