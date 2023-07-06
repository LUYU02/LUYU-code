<template>
	<view class="content">
		<image class="logo" src="/static/logo.jpg" @click="fn"></image>
		<view class="text-area">{{title}}</view>
	</view>
</template>

<script>
import My from "../my/my.vue";
export default {
	data() {
		return {
			title: "Hello"
		};
	},
	components:{
		My
	},
	onLoad() {
		console.log("我是onLoad");
	},
	methods: {
		fn() {
			console.log("我是小江!");
		}
	}
};
</script>

<style></style>
