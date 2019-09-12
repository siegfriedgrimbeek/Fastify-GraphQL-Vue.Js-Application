// Import External Dependancies
import Vue from 'vue'
import Vuex from 'vuex'

// Initialize Vuex
Vue.use(Vuex)

// Setup Vuex Store
export default new Vuex.Store({
	state: {
		carData: [],
		car: {
			age: '',
			price: '',
			services: []
		}
	},
	mutations: {
		// Mutate State with cars array
		carData(state, data) {		
			Vue.set(state, "carData", [...data])
		},
		// Mutate State with current car
		car(state, data) {
			state.car = data
		},
		// Mutate State with deleted car
		deleteCar(state, id) {
			const cars = state.carData.filter(car => car._id !== id)
			Vue.set(state, "carData", [...cars])
		}
	}
})
