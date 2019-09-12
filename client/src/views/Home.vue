<template>
  <div class="home site-page">
    <Header
      v-bind:title="'My Car Garage'"
      v-bind:intro="'A MongoDB, fastify and GraphQL powered Vue.Js app'"
    />
    <b-container>
      <b-row class="car-row">
        <CarCard v-for="car in carData" :key="car._id" v-bind:car="car" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
// Import External dependencies
import { mapState } from "vuex"

// Import Components
import CarCard from "@/components/CarCard.vue"
import Header from "@/components/Header.vue"

export default {
  name: "home",
  components: { CarCard, Header },
  // Get data from Store
  computed: mapState({
    carData: state => state.carData
  })
};
</script>

<style lang="scss" scoped>
.car-row {
  justify-content: start;
}
</style>