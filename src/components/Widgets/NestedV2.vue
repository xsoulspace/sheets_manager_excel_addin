<template>
<draggable
  handle=".handle"
    v-bind="dragOptions"
    tag="div"
    :class="{
      'is-child':!isParent,
      'is-dragging':dragging && !isParent,
      'with-children':childrenExists, 
      'no-children':!childrenExists}"
    @start="dragging = true"
    @end="dragging = false"
    class="box has-paddings"
    :list="list"
    :value="value"
    @input="emitter"
>
    <!--  -->
  <nested-item
    :key="el.id" 
    v-for="el in realValue"
    :elements="el.elements"
    :id="el.id"
    :isParent="isParent"
    :dragging="dragging"
    ></nested-item>
  <slot name="drag-content"/>
</draggable>
</template>

<script>
//import EventBus from "../../../EventBus.js";
import draggable from "vuedraggable";
import NestedItem from "./NestedItem.vue";
export default {
  name: "nested",
  props: {
    isHovered: {
      default: false
    },
    childrenExists:{
      required: false,
      type: Boolean,
      default: false
    },
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
.box.is-child {
  box-shadow: none;
  min-width: 1rem;
  width: 100%;
  border-width: 1px;
  border-color: #dbdbdb;
}
.box.is-child.is-dragging {
  box-shadow: none;
  min-width: 10rem;
}
.box.has-paddings {
  padding: 0.8rem 0.8rem 0.8rem 0.4rem;
}
.is-child.with-children {
  border-style: solid;
}
.is-child.no-children {
  border-style: dashed;
}

</style>
