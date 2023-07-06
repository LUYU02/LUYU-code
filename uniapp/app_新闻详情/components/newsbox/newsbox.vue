<template>
	<view class="box">
		<view class="row">
			<view class="row1">
				<image :src="item.picurl" mode="aspectFill"></image>
			</view>
			<view class="row2">
				<view>{{item.title}}</view>
				<view v-if="!item.looktime">编辑：{{item.author}}--- {{item.hits}}</view>
				<view v-else>浏览时间：{{item.looktime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "newsbox",
		props: {
			item: {
				typeof: Object,
				default () {
					return {
						title: "暂无内容",
						author: "小江",
						hits: 20,
						picurl: "../../static/logo.png",
						looktime: undefined
					}
				}
			}

		},
		data() {
			return {

			};
		},
	}
</script>

<style lang="scss" scoped>
	.box {
		padding: 20rpx;

		.row {
			width: 100%;
			height: 200rpx;
			display: flex;
			justify-content: space-around;
			border-bottom: 1rpx solid #cfcfcf;

			.row1 {
				flex: 4;
				width: 300rpx;
				height: 180rpx;
				margin-right: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.row2 {
				flex: 6;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 20rpx 0;

				& view:first-child {
					display: -webkit-box;
					/*弹性伸缩盒子模型显示*/
					-webkit-box-orient: vertical;
					/*排列方式*/
					-webkit-line-clamp: 2;
					/*显示文本行数*/
					overflow: hidden;
				}

				& view:last-child {
					margin-bottom: 5rpx;
					font-size: 24rpx;
					color: #cfcfcf;
				}
			}
		}
	}
</style>