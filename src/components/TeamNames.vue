<template>
  <div>
    <h2>What should the teams be called?</h2>
    <div v-for="(team, i) in teams" :key="team.id">
      <label
        >Team {{ i + 1 }} name: <input type="text" v-model="team.name"
      /></label>
    </div>
    <div class="wizard-bottom-bar">
      <button @click="$emit('onNext', teams)">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { times } from "lodash";

export default {
  props: {
    numTeams: Number
  },
  data() {
    return { teams: [] };
  },
  created() {
    this.teams = times(this.numTeams, () => {
      return { name: "", id: `team.${Math.random()}` };
    });
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
