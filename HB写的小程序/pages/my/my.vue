<template>
	<button @click="count++">点我++{{ count }}</button>
	<!-- 轮播图 -->
<!-- 	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		<swiper-item v-for="item in list" :key="item.id" v-show="list">
			<view><image :src="item.urls" mode="" style="width: 100%;"></image></view>
		</swiper-item>
	</swiper>
	<button @click="change">点我</button>
	

	字体图标
	<ul>
		<li v-for="(item,index) in daohang" :key="item.id">
		<img :src=item.icon alt="">
		</li>
	</ul>
	图片
	<ul>
		<li v-for="(item,index) in swipers" :key="item.id">
		<img :src=item.imgs alt="">
		</li>
	</ul> -->
</template>

<script>
export default {
	data() {
		return { count: 0, list: [], daohang: [], swipers: []};
	},
	// beforeMount() {
	// 	fetch("https://www.fastmock.site/mock/4d1bb15bf16dd83d7407072d347e0d8e/qingling/info")
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			if (data.code == 200) {
	// 				this.list = data.data.list;
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.error("Error:", error);
	// 		});
	// 	fetch("https://www.fastmock.site/mock/4d1bb15bf16dd83d7407072d347e0d8e/qingling/home")
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			if (data.code == 200) {
	// 				this.daohang = data.data.daohang;
	// 				this.swipers = data.data.swipers;
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.error("Error:", error);
	// 		});
	// },
	// methods: {
	// 	change() {
	// 		fetch("https://www.fastmock.site/mock/4d1bb15bf16dd83d7407072d347e0d8e/qingling/info")
	// 			.then(response => response.json())
	// 			.then(data => {
	// 				console.log("Success:", data);
	// 			})
	// 			.catch(error => {
	// 				console.error("Error:", error);
	// 			});
	// 		fetch("https://www.fastmock.site/mock/4d1bb15bf16dd83d7407072d347e0d8e/qingling/home")
	// 			.then(response => response.json())
	// 			.then(data => {
	// 				console.log("Success:", data);
	// 			})
	// 			.catch(error => {
	// 				console.error("Error:", error);
	// 			});
	// 		fetch("https://www.fastmock.site/mock/4d1bb15bf16dd83d7407072d347e0d8e/qingling/list")
	// 			.then(response => response.json())
	// 			.then(data => {
	// 				console.log("Success:", data);
	// 			})
	// 			.catch(error => {
	// 				console.error("Error:", error);
	// 			});
	// 	}
	// }
};
</script>

<style>
/* 	*{
		margin: 0;padding: 0;
	}
	li{
		list-style: none;
	} */
</style>
