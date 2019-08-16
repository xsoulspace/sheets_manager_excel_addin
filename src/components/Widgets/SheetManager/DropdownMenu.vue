<template>
<div @click="isActive=true" :class="{'is-active':isActive}" class="dropdown">
  <div class="dropdown-trigger">
    <div class="button">
      <span class="icon right-floated">
        <i class="fas fa-ellipsis-v"></i>
      </span>
    </div>
  </div>
  <div class="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <div class="dropdown-item">
        <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "dropdown-menu",
  props: ['id'],
  data(){
    return{
      isActive: false
    }
  }
}
</script>