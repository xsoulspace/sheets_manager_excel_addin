<template>
<div
  @mouseover="isActive=true"
  @click="isActive=true" 
  :class="{'is-active':isActive}" class="dropdown is-right">
  <div class="dropdown-trigger">
    <span class="icon right-floated">
      <i class="fas fa-ellipsis-v"></i>
    </span>
  </div>
  <div 
    @mouseleave="isActive=false"
    class="dropdown-menu is-compact" role="menu">
    <div class="dropdown-content">
      <div class="level is-mobile">
        <div class="level-item">
          <button class="button">+</button>
        </div>
        <div class="level-item">
          <visibility-switcher
            :id="id"></visibility-switcher>
        </div>
        <div class="level-item">
          <button class="button">-</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VisibilitySwitcher from "./VisibilitySwitcher";
export default {
  name: "dropdown-menu",
  props: ['id'],
  data(){
    return{
      isActive: false
    }
  },
  components: {
    VisibilitySwitcher
  }
}
</script>

<style lang="scss" scoped>
.dropdown-menu.is-compact {
  min-width: max-content;
}
.dropdown-menu.is-compact .dropdown-content{
  padding: 0px; 
}
.dropdown-menu.is-compact .dropdown-content .dropdown-item{
  padding: 0px; 
}

</style>