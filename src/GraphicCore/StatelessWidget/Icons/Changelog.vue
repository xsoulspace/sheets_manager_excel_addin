<template>
	<svg viewBox="0 0 50 50" width='4em' height='4em' fill='white' xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="30" >{{text}}</text>
    </svg>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ChangeLog extends Vue {
    text: string = 'Log'
}

</script>

<style></style>
