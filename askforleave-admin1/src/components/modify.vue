<template>
  <div class="huanan">
      <heads></heads>
      <component :is="componentId" @toggle="toggle"></component>
  </div>
</template>

<script>
import heads from './heads.vue'
import modufy01 from './modify01.vue'
import modufy02 from './modify02.vue'
export default {
    data: function() {
        return {
            componentId: "modufy01"
        }
    },
    methods: {
        toggle() {
            this.componentId = this.componentId === "modufy01" ? "modufy02" : "modufy01"
        }
    },
    components: {
        heads,
        modufy01,
        modufy02
    }
}
</script>

<style scoped>
    .huanan {
        position: relative;
        height: 100%;
    }
</style>