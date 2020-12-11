<template>
  <div class="hello">
    <h2>Form dev teams with the help of Gale-Shapely</h2>
    <div>
      <sup
        ><a href="https://en.wikipedia.org/wiki/Gale%E2%80%93Shapley_algorithm"
          >More Info</a
        ></sup
      >
    </div>
    <div>
      <button @click="$emit('onStart')">Start</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
