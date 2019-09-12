<template>
  <b-card
    :title="car.brand + ' - ' + car.title"
    :img-src="`https://loremflickr.com/350/200/${car.brand},${car.title}`"
    img-alt="Image"
    img-top
    tag="article"
    class="car-card"
  >
    <div class="call-to-actions">
      <b-button href="#" @click="viewCar(car._id)" variant="primary">Car Details</b-button>
      <b-button
        v-if="!ownerpage"
        href="#"
        @click="viewOwner(car.owner._id)"
        variant="primary"
      >Owner Details</b-button>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "CarListing",
  data() {
    return {
      // Check if the card is used for an owner or car page
      ownerpage: this.$route.name === "owner" ? true : false
    };
  },
  props: {
    car: Object
  },
  methods: {
    // View the car page
    viewCar(id) {
      this.$router.push({ name: "car", params: { id: id } });
    },
    // View the owner page
    viewOwner(id) {
      this.$router.push({ name: "owner", params: { id: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.car-card {
  margin-bottom: 2rem;
  flex: 0 0 31.333%;
  max-width: 0 0 31.333%;
  margin-right: 3%;

  &:nth-child(3n) {
    margin-right: 0;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .call-to-actions {
      display: flex;
      justify-content: space-between;

      > div {
        flex: 0 0 47%;
      }
    }
  }
}
</style>