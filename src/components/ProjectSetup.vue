<template>
  <div class="hello">
    <h2>How many teams?</h2>
    <div>
      <label>Number of teams: <input type="number" v-model="numTeams"/></label>
    </div>
    <p v-if="numTeams < 2">
      Please specify at least 2.
    </p>
    <div class="wizard-bottom-bar">
      <button :disabled="numTeams < 2" @click="$emit('onNext', numTeams)">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { numTeams: 2 };
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
