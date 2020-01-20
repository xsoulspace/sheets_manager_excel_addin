<template>
	<div
    :id='id'
		class="item"
		:draggable="draggable"
    @dragend="dragend"
		@dragstart="dragstart"
		@dragover.stop
	>
		<slot />
    <ItemDropzone id='dropzoneId' :is-child='true'/>
		<!-- <div 
      class="item__dropzone"
      @dragover.prevent
      @drop.prevent='drop'
    >
      <slot/>
    </div> -->
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '../../LogicCore/Debug/Log'
@Component({
  props: ['id', 'draggable'],
  components:{
    'ItemDropzone': ()=>import('@/GraphicCore/StatefullWidget/ItemsDropzone.vue')
  }
})
export default class Item extends Vue {
	dragstart(e: any) {
    const target = e.target
    e.dataTransfer.setData('cardId', target.id)
    target.style.opacity ='0.5'

  }
  dragend(e: any){
    const target = e.target
    target.style.opacity = '';
  }
  get dropzoneId(){
    return 'dropzone' + this.$props.id
  }
}
</script>

<style lang='scss'>

</style>
