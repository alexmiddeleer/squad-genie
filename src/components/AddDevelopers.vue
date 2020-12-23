<template>
  <div>
    <h2>Who will make up the teams?</h2>
    <div class="form">
      <DeveloperForm class="dev-form add-dev" :teams="teams" v-model="newDev">
        <div class="dev-form-button">
          <button :disabled="!(newDev.name && newDev.type)" @click="add">
            Add
          </button>
        </div>
        <sub
          >Only include developers that need to be matched (don't add developers
          whose team is decided already)</sub
        >
      </DeveloperForm>
    </div>
    <div class="dev-grid">
      <div class="developer-li" v-for="(dev, idx) in devs" :key="dev.id">
        <DeveloperForm
          class="dev-form"
          :dev="dev"
          :teams="teams"
          @input="updateDev(idx, $event)"
        >
          <div class="dev-form-button">
            <button @click="removeDev(idx)">Remove</button>
          </div>
        </DeveloperForm>
      </div>
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
  props: {
    teams: Array
  },
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
.add-dev {
  margin: 20px 0 10px;
}
.dev-form {
  text-align: left;
}
.dev-grid {
  margin: auto;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  grid-gap: 10px;
}
.developer-li .dev-form {
  display: block;
  background-color: #efefef;
}
.dev-form-button {
  margin-top: 20px;
}
</style>
