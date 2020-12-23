<template>
  <div id="app">
    <h1>Squad Genie</h1>
    <WelcomeMessage v-if="step === 0" @onStart="step++" />
    <ProjectSetup v-if="step === 1" @onNext="teamNext" />
    <TeamNames v-if="step === 2" :numTeams="numTeams" @onNext="teamNamesNext" />
    <AddDevelopers v-if="step === 3" @onNext="developersNext" />
    <AddTeam v-if="step === 4" @onNext="addTeamNext" />
    <table v-if="debug">
      <tr>
        <td>Number of teams</td>
        <td>{{ numTeams }}</td>
      </tr>
      <tr>
        <td>Teams</td>
        <td>{{ teams.map(t => t.name).join(", ") }}</td>
      </tr>
      <tr>
        <td>Roles</td>
        <td>{{ roles }}</td>
      </tr>
      <tr>
        <td>Leads</td>
        <td>{{ leads.map(l => l.name) }}</td>
      </tr>
      <tr>
        <td>Devs</td>
        <td>{{ devs.map(d => d.name) }}</td>
      </tr>
    </table>

    <footer>
      <sub
        >(c) 2020 - Alex Middeleer - alexander.middeleer@wolterskluwer.com</sub
      >
    </footer>
  </div>
</template>

<script>
import WelcomeMessage from "./components/HelloWorld.vue";
import ProjectSetup from "./components/ProjectSetup.vue";
import TeamNames from "./components/TeamNames.vue";
import AddDevelopers from "./components/AddDevelopers.vue";
import AddTeam from "./components/AddTeams.vue";

export default {
  name: "App",
  components: {
    WelcomeMessage,
    ProjectSetup,
    AddDevelopers,
    TeamNames,
    AddTeam
  },
  data() {
    return {
      debug: true,
      step: 0,
      numTeams: -1,
      devs: [],
      teams: []
    };
  },
  computed: {
    leads() {
      return this.devs.filter(dev => dev.isLead);
    },
    roles() {
      return this.devs
        .map(dev => dev.type)
        .reduce((acc, type) => {
          if (acc.find(t => t === type)) {
            return;
          }
          acc.push(type);
          return acc;
        }, []);
    }
  },
  methods: {
    teamNext(numTeams) {
      this.step++;
      this.numTeams = numTeams;
    },
    teamNamesNext(teams) {
      this.step++;
      this.teams = teams;
    },
    developersNext(devs) {
      this.step++;
      this.devs = devs;
    }
  }
};
</script>
<style scoped>
footer {
  position: fixed;
  bottom: 0;
}

table {
  position: fixed;
  bottom: 30px;
}
</style>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wizard-bottom-bar {
  margin-top: 20px;
}
table {
  border-collapse: separate;
  border-spacing: 0;
  color: #4a4a4d;
  font: 14px/1.4 "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-top: 1px solid #cedfd5;
}
th,
td {
  padding: 10px 15px;
  vertical-align: middle;
}
thead {
  background: #395870;
  background: linear-gradient(#49708f, #293f50);
  color: #fff;
  font-size: 11px;
  text-transform: uppercase;
}
th:first-child {
  border-top-left-radius: 5px;
  text-align: left;
}
th:last-child {
  border-top-right-radius: 5px;
}
tbody tr:nth-child(even) {
  background: #f0f0f2;
}
td {
  border-bottom: 1px solid #cecfd5;
  border-right: 1px solid #cecfd5;
}
td:first-child {
  border-left: 1px solid #cecfd5;
}
</style>
