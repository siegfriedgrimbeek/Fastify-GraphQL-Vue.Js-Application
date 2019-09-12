
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// Import External Dependancies
import { gql } from "apollo-boost"

// Declare Cars Query
const CarsQuery = {
  query: gql`
    {
      cars {
        title
        brand
        _id
        owner {
          _id
        }
      }
    }
  `
}

export default {
  name: "app",
  async beforeMount() {
    try {
      // Run  Cars Query
      const response = await this.$apollo.query(CarsQuery);
      this.$store.commit("carData", response.data.cars);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>