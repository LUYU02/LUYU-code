<template>
	<view>
		<view class="navCcroll">
			<scroll-view scroll-x="true">
				<view class="demo" :class="{active:index==activeIndex}" v-for="(item,index) in arrNews" :key="item.id"
					@click="clickNAv(index,item.id)">
					{{item.classname}}
				</view>
			</scroll-view>
		</view>
		<view class="box">
			<view>
				<view style="margin-top: 100rpx;">
				</view>
				<view v-for="item in newsList" :key="item.id">
					<newsbox :item="item" @click.native="SingleNews(item)"></newsbox>
				</view>
			</view>
		</view>
		<view class="nodata" v-if="!newsList.length">
			<image src="../../static/logo.png" mode="widthFix"></image>
		</view>
		<view class="loading" v-if="newsList.length">
			<view></view>
			<view v-if="loading==1">数据加载中...</view>
			<view v-if="loading==2">没有更多了...</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				// 导航栏
				arrNews: [],
				activeIndex: 0,
				cid: 0,
				// 新闻列表
				newsList: [],
				page: 1,
				loading: 0 //0默认 1加载中 2没有更多了
			}
		},
		methods: {
			// 导航栏接口
			getNews() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/navlist.php",
					success: (res) => {
						this.arrNews = res.data
						this.cid = res.data[0].id
					}
				})
			},
			// 新闻列表接口
			getNewsList(id) {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/newslist.php",
					data: {
						cid: id,
						page: this.page
					},
					success: res => {
						this.newsList = this.newsList.concat(res.data)
						if (res.data.length == 0) {
							this.loading = 2
						}
					}
				})
			},
			// 点击切换 在调新闻列表接口 
			clickNAv(index, id) {
				this.activeIndex = index
				// 初始化数据
				this.page = 1
				this.newsList = []
				this.cid = id
				this.loading = 0
				// 调用新闻列表
				this.getNewsList(id)
			},
			// 点击跳转详情
			SingleNews(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${item.id}&cid=${item.classid}`,
				})

			}

		},
		onLoad() {
			this.getNews()
			this.getNewsList(this.cid)
		},
		onReachBottom() {
			if (this.loading == 2) return
			this.page++
			this.loading = 1
			this.getNewsList(this.cid)
		}
	}
</script>

<style lang="scss" scoped>
	.navCcroll {
		width: 100%;
		height: 100rpx;
		background-color: #f7f8fa;
		white-space: nowrap;
		position: fixed;
		top: var(--window-top);
		left: 0;
		z-index: 10;

		scroll-view ::-webkit-scrollbar {
			display: none !important;
			width: 0 !important;
			height: 0 !important;
			-webkit-appearance: none;
			background: transparent;
		}

		.demo {
			width: 19%;
			height: 100rpx;
			display: inline-block;
			color: #303133;
			font-size: 34rpx;
			line-height: 100rpx;
			text-align: center;
		}

		.active {
			color: #88e6c5;
		}
	}



	.nodata {
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.loading {
		text-align: center;
		font-size: 26rpx;
		color: #888;
		line-height: 2em;
	}
</style>