<template>
  <div class="home">
    <Header v-bind:title="fullTitle" v-bind:intro="owner.email" />
    <b-container>
      <b-breadcrumb active-class="active">
        <b-breadcrumb-item @click="goHome()">Home</b-breadcrumb-item>
        <b-breadcrumb-item class="active" :disabled="true">{{fullTitle}}</b-breadcrumb-item>
      </b-breadcrumb>

      <br />
      <h2>Cars:</h2>
      <br />

      <b-row class="car-row">
        <CarCard v-for="car in owner.cars" :key="car._id" v-bind:car="car" />
      </b-row>

      <div class="btn-container">
        <b-button variant="info" @click="goHome()">Back</b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
// Import External dependencies
import { gql } from "apollo-boost"

// Import Components
import Header from "@/components/Header.vue"
import CarCard from "@/components/CarCard.vue"

// Create Get Owner Query
const getOwner = gql`
  query getOwner($id: ID!) {
    owner(id: $id) {
      email
      firstName
      lastName
      cars {
        _id
        age
        brand
        price
        title
      }
    }
  }
`;

export default {
  name: "owner",
  data() {
    return {
      owner: {}
    };
  },
  props: ['id'],
  components: {
    Header,
    CarCard
  },
  computed: {
    fullTitle: function() {
      return this.owner.firstName + " " + this.owner.lastName
    }
  },
  apollo: {
    owner: {
      query: getOwner,
      variables() {
        return {
          id: this.id
        };
      }
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: "home" })
    }
  }
};
</script>
<style lang="scss" scoped>
.car-row {
  justify-content: start;
  margin-left: 0;
  margin-right: 0;
}

.btn-container{
    margin-bottom: 2rem;
}
</style>