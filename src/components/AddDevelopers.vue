<template>
  <div class="hello">
    <h2>Who will make up the teams?</h2>
    <div class="form">
      <label>Name: <input v-model="newDevName"/></label>
      <label
        >Lead Candidate? <input type="checkbox" v-model="newDevIsLead"
      /></label>
      <label
        >Type:
        <select v-model="newDevType">
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
        </select>
      </label>
      <sub
        >Don't add developers for roles that are not needed, already decided, or
        irrelevant.</sub
      >
    </div>
    <button :disabled="!(newDevName && newDevType)" @click="add">Add</button>
    <div v-for="(dev, idx) in devs" :key="dev.id">
      <label>Name: <input v-model="dev.name"/></label>
      <label
        >Lead Candidate? <input type="checkbox" v-model="dev.isLead"
      /></label>
      <label
        >Type:
        <select v-model="dev.type">
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
        </select>
      </label>
      <button @click="removeDev(idx)">Remove</button>
    </div>
    <div class="wizard-bottom-bar">
      <button :disabled="devs.length < 1" @click="$emit('onNext', devs)">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDevName: "",
      newDevIsLead: false,
      newDevType: "",
      devs: []
    };
  },
  methods: {
    add() {
      this.devs.push({
        id: this.newDevName + Math.random(),
        name: this.newDevName,
        type: this.newDevType,
        isLead: this.newDevIsLead
      });
      this.newDevName = "";
      this.newDevType = "";
      this.newDevIsLead = false;
    },
    removeDev(idx) {
      this.devs.splice(idx, 1);
    }
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
