<template>
  <div class="name-ranker">
    NameRanker
    <span v-for="(obj, idx) in objs" :key="idx">{{ obj.name }},</span>
  </div>
</template>

<script>
export default {
  props: {
    objs: Array
  },
  onChange() {
    this.$emit("rankChange");
  }
};
</script>

<style scoped></style>
