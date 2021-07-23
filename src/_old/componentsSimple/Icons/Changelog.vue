<template>
  <svg
    class="changelog"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 28"
    @click="click"
    :class="{ '--is-active': isActive, '--is-dark': isDarkTheme }"
    @mouseenter="hovered"
  >
    <line
      v-for="(v, i) of lineQnty"
      :key="i"
      class="changelog__line"
      :x1="v.x1"
      :x2="v.x2"
      :y1="i"
      :y2="i"
    />
    <path
      d="M14.73,12.73s-1.76,8-1.88,8.48a.06.06,0,0,0,0,.06l2.84,1.9a.12.12,0,0,1,0,.19l-2.87,2.87a.06.06,0,0,0,0,.06l2,8.81a.12.12,0,0,0,.17.08L39.76,23.3a.12.12,0,0,0,0-.21L15.21,12.54S14.81,12.44,14.73,12.73Z"
      transform="translate(-12.34 -12.02)"
    />

    <text x="2" y="22" class="changelog__text">{{ text }}</text>
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import AppSettings from '@/StorageCore/AppSettings'
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}
@Component({
  props: ['isActive'],
})
export default class ChangeLog extends Vue {
  hovered() {
    this.hov = !this.hov
  }
  hov = false
  get lineQnty() {
    const qnty: { x1: number; x2: number }[] = []
    const qntyN = getRandomInt(200, 300)
    for (let index = 0; index < qntyN; index++) {
      const iniL = getRandomInt(30, 400)
      const length = getRandomInt(1, this.hov ? 5 : 3) + iniL
      qnty.push({ x1: iniL, x2: length })
    }
    return qnty
  }
  public get isDarkTheme() {
    const module = getModule(AppSettings, this.$store)
    return module.getIsDarkTheme
  }
  text = 'News'
  @Emit()
  click() {}
}
</script>

<style></style>
