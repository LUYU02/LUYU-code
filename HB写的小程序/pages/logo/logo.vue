<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		<swiper-item v-for="item in list2" :key="item.id" v-show="list2">
		<view>
			{{item.message}}
			<image :src="item.coverpath" style="width: 100%;"></image>
		</view>
		</swiper-item>
	</swiper>
	
</template>

<script>
	export default {
		data() {
			return {
				 list2: [] 
			}
		},
		beforeMount() {
		fetch("https://www.fastmock.site/mock/4d1bb15bf16dd83d7407072d347e0d8e/qingling/list")
			.then(response => response.json())
			.then(data => {
				if (data.code == 200) {
					this.list2 = data.data.list;
				}
			})
			.catch(error => {
				console.error("Error:", error);
			});	
		},
		methods: {
		},
	}
</script>

<style>

</style>
