<template>
<draggable
  handle=".is-draggable"
    v-bind="dragOptions"
    tag="div"
    @start="dragging = true"
    @end="dragging = false"
    :list="list"
    :value="value"
    @input="emitter"
    class="draganddrop-container"
>
  <nested-item
    :key="el.id" 
    v-for="el in realValue"
    :elements="el.elements"
    :id="el.id"
    :isParent="isParent"
    :dragging="dragging"
    ></nested-item>
</draggable>
</template>

<script>
//import EventBus from "../../../EventBus.js";
import draggable from "vuedraggable";
import NestedItem from "./NestedItem.vue";

export default {
  name: "nested-items",
  props: {
    isParent:{
      required: true,
      type: Boolean,
      default: true
    },
    value: {
      required: false,
      type: Array,
      default: null
    },
    list: {
      required: false,
      type: Array,
      default: null
    }
  },
  mounted: function(){
  },
  beforeDestroy: function(){
  },
  data(){
    return{
      dragging: false
    }
  },  
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
    changeElementsOfElement: function(elements,elIndex){
      this.$emit("new-child-real-value",{elements,elIndex})
    }
  },
  components: {
    draggable,
    NestedItem
  },
  computed: {
    dragOptions() {
      return {
        animation: 400,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    realValue() {
    // this.value when input = v-model
    // this.list  when input != v-model
      return this.value ? this.value : this.list;
    }
  },
};
</script>
<style lang="scss">
.draganddrop-container {
  display: flex;
  flex-flow: column nowrap;
  min-width: 1em;
}
.container {
  &.is-child {
    box-shadow: none;
    min-width: 1rem;
    width: 100%;
    border-width: 1px;
    border-color: #dbdbdb;
    &.with-children {
      border-style: solid;
    }
    &.no-children {
    border-style: dashed;
    }
    &.is-dragging {
      min-width: 10rem;
    }
  }
  &.has-paddings {
    padding: 0.8rem 0.8rem 0.8rem 0.4rem;
  }
  &.has-marginless-media{
    .media + .media{
      margin-top: 0;
      padding-top: 0;
    }
  }
}


</style>
