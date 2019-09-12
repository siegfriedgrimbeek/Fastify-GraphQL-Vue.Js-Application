// Import external dependencies 
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import BootstrapVue from 'bootstrap-vue'
import Moment from 'vue-moment'

// Import Vue dependencies
import App from './App.vue'
import router from './router'
import store from './store'

// Import Bootstrap style sheets
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Initialize Vue libraries
Vue.use(VueApollo)
Vue.use(BootstrapVue)
Vue.use(Moment)

// Create Apollo Client
const client = new ApolloClient({
	uri: 'http://localhost:3000/graphql'
})

// Create Apollo Provider
const apolloProvider = new VueApollo({
	defaultClient: client
})

// Create Vue Instance
new Vue({
	router,
	store,
	render: h => h(App),
	apolloProvider
}).$mount('#app')