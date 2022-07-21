<template>
	<div class="container">
		{{ keywords }}
	</div>
</template>

<script setup lang="ts">

import { getCurrentInstance, onBeforeMount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
const $route = useRoute();
const keywords = ref($route.params.keyword);

</script>

<style scoped>
.container {
	width: 100%;
}
</style>
