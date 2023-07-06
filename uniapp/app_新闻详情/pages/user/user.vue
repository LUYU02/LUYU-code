<template>
	<view class="user">
		<view class="top">
			<image src="../../static/历史记录.png" mode=""></image>
			<text>历史记录</text>
		</view>
		<view class="">
			<view v-for="(item,index) in historyArr" :key="index">
				<newsbox :item="item" @click.native="SingleNews(index)"></newsbox>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyArr: []
			};
		},
		methods: {
			// 点击跳转详情
			SingleNews(index) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${this.historyArr[index].id}&cid=${this.historyArr[index].cid}`,
				})
			}
		},
		onLoad() {
			this.historyArr = uni.getStorageSync("historyArr")
		}
	}
</script>

<style lang="scss">
	.user {
		.top {
			padding: 50rpx 0;
			background-color: #f8f8f8;
			color: #666;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 150rpx;
				height: 150rpx;
			}

			text {
				font-size: 38rpx;
				padding-top: 20rpx;
			}
		}
	}
</style>