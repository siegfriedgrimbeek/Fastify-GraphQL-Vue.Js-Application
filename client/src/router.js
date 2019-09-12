// Import External Dependancies
import Vue from 'vue'
import Router from 'vue-router'

// Import Router Views
import Home from './views/Home.vue'
import Car from './views/Car.vue'
import Owner from './views/Owner.vue'

// Initialize Vue Router
Vue.use(Router)

// Setup Routes
export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/cars/:id',
			name: 'car',
			component: Car,
			props: true
		},
		{
			path: '/owner/:id',
			name: 'owner',
			component: Owner,
			props: true
		}
	]
})
