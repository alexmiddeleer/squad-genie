<template>
  <div id="app">
    <h1>Squad Genie</h1>
    <HelloWorld v-if="step === 0" @onStart="step++" />
    <footer>
      <sub
        >(c) 2020 - Alex Middeleer - alexander.middeleer@wolterskluwer.com</sub
      >
    </footer>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      step: 0
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
footer {
  position: absolute;
  bottom: 0;
}
</style>
