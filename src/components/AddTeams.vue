<template>
  <div class="addTeam">
    <h2>What does the team need?</h2>
    <div class="form">
      <label>Team Name: <input v-model="newTeamName"/></label>
      <h3>How many of each type of developer does the team need?</h3>
      <p>
        Note: Ensure there are enough roles for each type of developer.<!--
      -->
        For example, if you have two front-end developers, ensure the<!--
      -->
        teams collectively need at least two. Otherwise the algorithm<!--
      -->
        will refuse to run because there is no valid solution.
      </p>
      <p>Do not add roles that are already decided or not needed.</p>
      <div class="roles-tally">
        <label>Back-end: <input type="number"/></label>
        <label>Front-end: <input type="number"/></label>
        <label>QA: <input type="number"/></label>
        <!-- <label>Automation Engineer: <input type="number"></label> -->
        <!-- <label>Manager: <input type="number"></label> -->
        <!-- <label>Scrum master: <input type="number"></label> -->
        <!-- <label>UX: <input type="number"></label> -->
        <!-- <label>DBA: <input type="number"></label> -->
        <!-- <label>Devops: <input type="number"></label> -->
        <!-- <label>Architect: <input type="number"></label> -->
        <!-- <label>Project Manager: <input type="number"></label> -->
        <!-- <label>Wildcard 1: <input type="number"></label> -->
        <!-- <label>Wildcard 2: <input type="number"></label> -->
        <!-- <label>Wildcard 3: <input type="number"></label> -->
        <!-- <label>Wildcard 3: <input type="number"></label> -->
        <!-- <label>Wildcard 3: <input type="number"></label> -->
        <!-- <label>Wildcard 3: <input type="number"></label> -->
        <!-- <label>Wildcard 3: <input type="number"></label> -->
      </div>
    </div>
    <!-- <div class="wizard-bottom-bar"> -->
    <!--   <button :disabled="devs.length < 1" @click="$emit('onNext', devs)"> -->
    <!--     Next -->
    <!--   </button> -->
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTeamName: ""
    };
  },
  methods: {
    // add() {
    // },
    // removeDev(idx) {
    //   this.devs.splice(idx, 1);
    // }
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
.form {
  display: flex;
  flex-direction: column;
}
</style>
