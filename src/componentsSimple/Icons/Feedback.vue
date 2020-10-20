<template>
  <svg
    class="changelog"
    @click="click"
    viewBox="0 0 50 50"
    width="4em"
    height="4em"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text x="10" y="30">{{ text }}</text>
  </svg>
</template>
<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'

@Component
export default class Feedback extends Vue {
  text = 'Feedback'
  @Emit()
  click() {}
}
</script>

<style></style>
