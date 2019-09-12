<template>
  <div>
    <b-modal
      ref="my-modal"
      id="modal-center"
      centered
      :title="car.brand + ' - ' + car.title"
      @ok="onSubmit"
    >
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Title:"
          label-for="input-1"
          description="Enter the car title."
        >
          <b-form-input id="input-1" v-model="form.title" type="text" :placeholder="form.title"></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Brand:"
          label-for="input-2"
          description="Enter the car brand."
        >
          <b-form-input id="input-2" v-model="form.brand" type="text" :placeholder="form.brand"></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Price:"
          label-for="input-3"
          description="Enter the car price."
        >
          <b-form-input
            id="input-3"
            v-model="form.price"
            type="number"
            :placeholder="`'${form.price}'`"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Age:"
          label-for="input-4"
          description="Enter the car age."
        >
          <b-form-input
            id="input-4"
            v-model.number="form.age"
            type="number"
            :placeholder="`'${form.age}'`"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
// Import External dependencies
import { gql } from "apollo-boost";

// Create Edit Car Query
const editCar = gql`
  mutation editCar(
    $id: ID!
    $title: String!
    $brand: String!
    $age: Int!
    $price: String!
  ) {
    editCar(id: $id, title: $title, brand: $brand, age: $age, price: $price) {
      _id
      title
      brand
      age
      price
      services {
        date
        name
      }
    }
  }
`;

export default {
  name: "EditCar",
  props: {
    car: Object
  },
  data() {
    let car = this.car
    return {
      form: {
        id: car._id,
        title: car.title,
        brand: car.brand,
        age: car.age,
        price: car.price
      }
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault()
      const data = this.form
      const updatedCar = await this.$apollo.mutate({
        mutation: editCar,
        variables: { ...data }
      })
      this.$store.commit("car", updatedCar.data.editCar)
      this.$refs["my-modal"].hide()
    }
  }
};
</script>