<template>
	<view>
		<view class="detail">
			<view class="title">{{newsInfo.title}}</view>
			<view class="info">
				<view class="author">编辑：{{newsInfo.author}}</view>
				<view class="time">发布时间：{{time}}</view>
			</view>
			<view class="content">
				<rich-text :nodes="newsInfo.content"></rich-text>
			</view>
			<view class="state">
				声明：本站的内容均采集与腾讯新闻，如果侵权请联系管理（513894357@qq.com）进行整改删除，本站进行了内容采集不代表本站及作者观点，若有侵犯请及时联系管理员，谢谢您的支持。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsInfo: {}
			}
		},
		methods: {
			a1(id, cid) {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/detail.php",
					data: {
						cid,
						id
					},
					success: res => {
						// 把所有的img添加一个样式
						res.data.content = res.data.content.replace(/<img/gi, '<img style="max-width:100%"')
						this.newsInfo = res.data
						// 存储到本地
						this.localStorage(res.data)
						// 导航条
						uni.setNavigationBarTitle({
							title: this.newsInfo.title
						})
					}
				})
			},
			timestampToTime(timestamp) {
				var date = new Date(timestamp * 1000)
				var Y = date.getFullYear() + '-'
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
				const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
				const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
				const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
				const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
				return Y + M + D + h + m + s
			},
			timestampToTime1(timestamp) {
				var date = new Date(timestamp)
				var Y = date.getFullYear() + '-'
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
				const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
				const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
				const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
				const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
				return Y + M + D + h + m + s
			},
			// 存储到本地
			localStorage(item) {
				let historyArr = uni.getStorageSync("historyArr") || []
				let info = {
					title: item.title,
					id: item.id,
					classid: item.classid,
					picurl: item.picurl,
					looktime: this.timestampToTime1(Date.now())
				}
				if (historyArr.length == 0) {
					historyArr.unshift(info)
					uni.setStorageSync("historyArr", historyArr)
				} else {
					// 查找 返回布尔值
					let flge = historyArr.some((i) => i.id == this.newsInfo.id)
					if (flge) {
						// 查找到就要把当前项移动到最前面
						historyArr = historyArr.filter((i2) => i2.id != this.newsInfo.id)
						historyArr.unshift(info)
						uni.setStorageSync("historyArr", historyArr)
					} else {
						// 没有就添加
						historyArr.unshift(info)
						uni.setStorageSync("historyArr", historyArr)
					}
				}
			}
		},
		computed: {
			time() {
				return this.timestampToTime(this.newsInfo.posttime)
			}
		},
		onLoad(e) {
			this.a1(e.id, e.cid)
			uni.setNavigationBarTitle({
				title: this.newsInfo?.title
			})
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		padding: 50rpx 30rpx;

		.title {
			font-size: 50rpx;
			line-height: 1.6em;
		}

		.info {
			padding: 0 30rpx;
			margin: 50rpx 0;
			height: 80rpx;
			background: #f6f6f6;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 22rpx;
			color: #888;
		}

		.content {
			padding-bottom: 50rpx;
		}

		.state {
			background: #FEF0F0;
			font-size: 26rpx;
			padding: 20rpx;
			color: #F89898;
			line-height: 1.8em;
		}

	}
</style>