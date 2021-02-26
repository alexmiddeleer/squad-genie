<template>
  <div class="form">
    <div class="inner-form">
      <label
        >Name: <input v-model="dev.name" @change="$emit('input', dev)"
      /></label>
      <label
        >Lead Candidate?
        <input
          type="checkbox"
          v-model="dev.isLead"
          @change="$emit('input', dev)"
      /></label>
      <label
        >Type:
        <select v-model="dev.type" @change="$emit('input', dev)">
          <option value="back-end">Back-end</option>
          <option value="front-end">Front-end</option>
          <option value="full-stack">Full Stack</option>
          <option value="qa">QA</option>
          <option value="auto">Automation Engineer</option>
          <option value="mgr">Manager</option>
          <option value="ux">UX</option>
          <option value="dba">DBA</option>
          <option value="devops">Devops</option>
          <option value="arch">Architect</option>
          <option value="pm">Project Manager</option>
          <option value="sm">Scrum Master</option>
        </select>
      </label>
      <label v-for="team in dev.teams" :key="team.id">Ranking (lower is better) - {{team.name}}
        <input
          type="number"
          v-model="team.devRank"
      /></label>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  model: {
    prop: "dev",
    event: "input"
  },
  props: {
    dev: Object,
  },
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
  border: 1px solid lightgray;
  display: inline-block;
  padding: 0 20px 20px;
}
.inner-form {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.inner-form > * {
  margin-top: 20px;
}
</style>
