<template>
  <div class="home">
    <Header
      v-bind:title="fullTitle"
      v-bind:intro="'Age: ' + car.age + ' | ' + 'Price: ' + car.price"
    />
    <b-container>
      <b-breadcrumb active-class="active">
        <b-breadcrumb-item @click="goHome()">Home</b-breadcrumb-item>
        <b-breadcrumb-item class="active" :disabled="true">{{fullTitle}}</b-breadcrumb-item>
      </b-breadcrumb>

      <img class="car-image" :src="`https://loremflickr.com/350/200/${car.brand},${car.title}`" />

      <div class="services" v-if="car.services.length > 0">
        <h2>Services:</h2>
        <ul>
          <li v-for="service in car.services" :key="service.date">
            <b>{{service.name}}</b>:
            <span>{{ service.date | moment("DD/MM/YYYY") }}</span>
          </li>
        </ul>
      </div>
      <div v-else>
        <h2>This car has no services</h2>
        <br />
      </div>

      <div class="btn-container">
        <b-button variant="success" v-b-modal.modal-center>Edit</b-button>
        <b-button variant="danger" @click="deleteCar()">Delete</b-button>
        <b-button variant="info" @click="goHome()">Back</b-button>
      </div>

      <EditCar v-if="loaded" v-bind:car="car" />
    </b-container>
  </div>
</template>

<script>
// Import Vue dependencies
import { gql } from "apollo-boost";
import { mapState } from "vuex";

// Import Components
import Header from "@/components/Header.vue";
import EditCar from "@/components/EditCar.vue";

// Create Get Car Query
const getCar = gql`
  query getCar($id: ID!) {
    car(id: $id) {
      title
      brand
      _id
      age
      services {
        date
        name
      }
      price
    }
  }
`;

// Create the Delete Car Query
const deleteCar = gql`
  mutation deleteCar($id: ID!) {
    deleteCar(id: $id) {
      _id
    }
  }
`;

export default {
  name: "car",
  data() {
    return {
      loaded: false
    }
  },
  // Retrieved from Route params
  props: ['id'],
  computed: mapState({
    car: state => state.car,
    fullTitle: state => state.car.title + " - " + state.car.brand
  }),
  components: { Header, EditCar },
  beforeMount() {
    this.getCarDetails()
  },
  methods: {
    goHome() {
      this.$router.go(-1);
    },
    async getCarDetails() {
      try {
        // Use the ID parameter to get a single cars details
        const id = this.$route.params.id
        const response = await this.$apollo.query({
          query: getCar,
          variables: {
            id: id
          }
        });

        // Commit the response to the store
        this.$store.commit("car", response.data.car)
        this.loaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    deleteCar() {
       // Use the ID parameter to delete a single car
      this.$apollo.mutate({
        mutation: deleteCar,
        variables: {
          id: this.id
        }
      })
      // Use the ID parameter to set the new state
      this.$store.commit("deleteCar", this.id)
      this.$router.push({ name: "home" })
    }
  }
};
</script>
<style lang="scss" scoped>
.car-image {
  float: right;
}

.btn-container {
  button {
    margin-right: 15px;
    min-width: 100px;
  }
}
</style>