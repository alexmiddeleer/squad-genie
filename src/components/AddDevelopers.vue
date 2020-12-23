<template>
  <div>
    <h2>Who will make up the teams?</h2>
    <div class="form">
      <DeveloperForm v-model="newDev" />
      <sub
        >Don't add developers for roles that are not needed, already decided, or
        irrelevant.</sub
      >
    </div>
    <button :disabled="!(newDev.name && newDev.type)" @click="add">Add</button>
    <div v-for="(dev, idx) in devs" :key="dev.id">
      <DeveloperForm :dev="dev" @input="updateDev(idx, $event)" />
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
import DeveloperForm from "./DeveloperForm.vue";

const blankDev = {
  name: "",
  isLead: false,
  type: ""
};

export default {
  components: { DeveloperForm },
  data() {
    return {
      newDev: { ...blankDev },
      devs: []
    };
  },
  methods: {
    add() {
      this.devs.push({
        id: this.newDev.name + Math.random(),
        name: this.newDev.name,
        type: this.newDev.type,
        isLead: this.newDev.isLead
      });
      this.newDev = { ...blankDev };
    },
    removeDev(idx) {
      this.devs.splice(idx, 1);
    },
    updateDev(idx, dev) {
      this.devs[idx] = Object.assign({}, this.devs[idx], dev);
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
