<template>
  <div>
    <b-jumbotron :fluid="true" :header="title" :lead="intro"></b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
    intro: String
  }
};
</script>