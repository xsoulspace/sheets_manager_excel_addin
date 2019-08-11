<template>
  <div class="media is-tiny-margin" @mouseover="isHovered=true" @mouseout="isHovered=false">
    <div class="media-content">
      <div class="level is-mobile">
        <div class="level-left">
            <div class="content has-text-left">
          <!-- <div class="level-item"> -->
            <span class="is-child" v-show="!isParent">&#8226;</span>
            {{name}}
          <!-- </div> -->
            </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            
            <transition name="fade">              
              <nested 
                v-if="isParent" :isHovered="isHovered" :class="{'has-padding':true}" :isParent="false" :childrenExists="childrenExists" :list="realValue">
                <template v-slot:drag-content>
                  <transition name="fade"> 
                  <i v-if="!childrenExists && isParent">место для листов</i>                    
                  </transition>
                </template>
              </nested>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import EventBus from "../../../EventBus.js";

export default {
  name: 'nested-item',
  props: {
    value: {
      default: {}
    },
    isParent: {
      default: false
    },
    name: {
      default:""
    }
  },
  data(){
    return{
      isHovered: false
    }
  },
  components: {
    Nested: ()=> import('./Nested.vue')
  },
  methods: {
  },
  computed: {
    childrenExists: function(){
      return Object.keys(this.value).length > 0
    },
    realValue() {
      return this.value;
    }
  }
}
</script>
<style lang="scss">
.media.is-tiny-margin + .media.is-tiny-margin {
    margin-top: 0.3rem;
    padding-top: 0.1rem;
    border-top: 1px solid rgba(219, 219, 219, 0.5);
    display: flex;
}
.media .media:first-child {
  border-top: none;
  padding-top: 0rem;
}
.media .box.has-padding {
  padding: 0.8rem;
}
span.is-child {
  content: "\2022";
  color: #949494;
}
</style>
