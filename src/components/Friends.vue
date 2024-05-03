<template>
  <div class="friends">
    <h1>关注</h1>
    <!-- {{this.$store.state.count}} -->
    {{ count }}
    <button @click="add">+1</button>

    <ul>
      <li v-for="todo in doneTodos" :key="todo.id">{{ todo.text }}</li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Friends",
  computed: {
    ...mapState(["count", "todos"]),
    ...mapGetters(["doneTodos"]),
  },
  methods: {
    add() {
      this.$store.commit("increment", 2);
    },
  },
};
</script>

<style scoped>
</style>