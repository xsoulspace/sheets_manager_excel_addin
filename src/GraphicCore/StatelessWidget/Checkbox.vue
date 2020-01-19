<template>
	<div
		class="checkbox"
		:class="{ '--is-dark': isDarkTheme }"
		@click="changeValue"
	>
		<div class="checkbox__input"></div>
		<p class="checkbox__label">
			{{text}}
		</p>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Log } from '../../LogicCore/Debug/Log'
import { getModule } from 'vuex-module-decorators'
import AppSettings from '@/StorageCore/AppSettings'

@Component({
	props: ['value','text'],
	components: {},
})
export default class CheckboxStateless extends Vue {
	public get isDarkTheme() {
		const module = getModule(AppSettings, this.$store)
		return module.getIsDarkTheme
    }
    changeValue(){
        this.$emit('click')
    }
}
</script>
