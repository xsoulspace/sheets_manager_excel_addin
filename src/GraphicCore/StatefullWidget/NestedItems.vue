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
    :el="el"
    :id="el.id"
    :isParent="isParent"
    :dragging="dragging"
  />
</draggable>
</template>

<script lang="ts">
//import EventBus from "../../../EventBus.js";
// import draggable from "vuedraggable";
import NestedItem from "./NestedItem.vue";


import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: "NestedItems",
  components: {
  },
})
export default class Nesteditems extends Vue {

}

// export default {
//   name: "nested-items",
//   props: {
//     isParent:{
//       required: true,
//       type: Boolean,
//       default: true
//     },
//     value: {
//       required: false,
//       type: Array,
//       default: null
//     },
//     list: {
//       required: false,
//       type: Array,
//       default: null
//     },
//     parentId:{
//       required: false,
//       default: null
//     }
//   },
//   mounted: function(){
//   },
//   beforeDestroy: function(){
//   },
//   data(){
//     return{
//       dragging: false
//     }
//   },  
//   methods: {
//     emitter(value) {
//       this.$emit("input", value);
//     }
//   },
//   components: {
//     draggable,
//     NestedItem
//   },
//   computed: {
//     dragOptions() {
//       return {
//         animation: 400,
//         group: "description",
//         disabled: false,
//         ghostClass: "ghost"
//       };
//     },
//     // realValue:{
//     //   set:  async function(elements){
//     //     console.log('set realValue',elements)
//     //     if(this.isParent){
//     //       const obj ={
//     //         id: this.parentId,
//     //         elements
//     //       }
//     //       await this.$store.dispatch('updateSpecificElement',obj)
//     //     }else {
//     //       await this.$store.dispatch('updateElements',elements)
//     //     }
//     //   },
//     //   get:  function(){
//     //     let els
//     //     if(this.isParent){
//     //       // els = this.value ? this.value : this.list;
//     //       els = this.$store.getters['getNested'];
//     //       console.log('els',els)
//     //     }else {
//     //       els= this.$store.getters['getElementChildren'](this.parentId);          
//     //       console.log('elschild',els)
//     //     }
//     //     console.log('els',els)
//     //     return els
//     //   }
//     // },
//     realValue:function(){
//       return this.value ? this.value : this.list;
//     }
//   },
// };
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
