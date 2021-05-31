<template>
	<u-popup v-model="show" mode="bottom" :height="680">
		<view class="game-pupop">
			<view class="game-header">
				<view class="img-area">
					<!-- <image src="" mode=""></image> -->
				</view>
				<view class="game-detail" @click="mapTab" >
					<view class="" v-if="specificLocation">
						<image src="../../static/imgs/Marker.png" mode=""
						style="display: inline-block;height: 32rpx;width: 32rpx;vertical-align: middle;"></image>
						<span >{{ specificLocation }} （{{distance}}km）</span>
					</view>
					<view >
						<span>价格：<span v-if="selectItem.price">¥{{ selectItem.price }}元</span></span>
					</view>
				</view>
			</view>
			<view class="game-content">
				<view class="title1">
					场地列表
				</view>
				<view 
					v-for="(item, index) in gameAddressList" 
					:key="index" 
					class="game-item" 
					:style="{
						'backgroundColor': selectIndex === index ? '#ffd3d6' : '#eeece7', 
						'color': selectIndex === index ? '#ff4346' : '', 
						'border': selectIndex === index ? '2rpx solid #ff4346' : ''
					}"
					@click="selectGame(item, index)"
				>
					{{ item.label }}
				</view>
			</view>
			<view class="game-footer">
				<u-button type="primary" @click="handleOk">选择该场</u-button>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import { getDistance } from '../../utils/index.js'
	export default {
		props: {
			gameList: {
				type: Array,
				default: []
			},
			value: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				show: false,
				gameAddressList: [],
				gameDateList: [],
				selectIndex: null,
				currentLatitude: 34.343119,
				currentLongitude: 108.93963,
				specificLocation: '',
				distance: '',
				selectItem: {
					price: ''
				}
			}
		},
		methods: {
			init(gameAddressList) {
				this.gameAddressList = gameAddressList
				this.show = true
				if(this.value) {
					this.selectIndex = this.gameAddressList.findIndex(item => item.label === this.value)
				}else{
					this.selectIndex = null
					this.specificLocation = ''
					this.distance = ''
					this.selectItem = {
						price: ''
					}
				}
			},
			selectGame(e, index) {
				this.selectIndex = index
				this.selectItem = e
				if(e.label.indexOf('（待开放）') !== -1) {
					this.$refs.uToast.show({
						title: '该场次待开放',
						type: 'default',
						duration: '2000'
					})
					return
				}
				let findItem = this.gameList.find(item => item._id === e.label)
				if(findItem){
					this.gameDateList = findItem.gameDates
						.filter(item => new Date(item.gameDate).getTime() > new Date().getTime() )
						.map(item => item.gameDate)
					if(findItem.gameDates.filter(item => item.specificLocation).length) {
						this.currentLatitude = findItem.gameDates.filter(item => item.specificLocation)[0].latitude
						this.currentLongitude = findItem.gameDates.filter(item => item.specificLocation)[0].longitude
						this.specificLocation = findItem.gameDates.filter(item => item.specificLocation)[0].specificLocation
						this.computDistance()
					}
					this.gameDateList = Array.from(new Set(this.gameDateList))
					this.gameDateList = this.gameDateList.map(item => ({
						value: item,
						label: item,
					}))
					this.gameDateList.forEach(item => {
						let dateItems = findItem.gameDates.filter(ele => ele.gameDate === item.value).length
						let closeItems = findItem.gameDates.filter(ele => ele.gameDate === item.value && ele.gameStatus === 3).length
						if(dateItems === closeItems) {
							item.disabled = true
							item.value = item.label = `${item.label} （待开放）`
						}
					})
				}else{
					this.gameDateList = []
				}
			},
			handleOk() {
				this.$emit('confirm', [this.selectItem])
				this.show = false
			},
			mapTab() {
				wx.openLocation({
					latitude: this.currentLatitude,
					longitude: this.currentLongitude
				})
			},
			computDistance() {
				wx.getLocation({
					success: (res) => {
						this.distance = getDistance(34.24276, 108.892258, this.currentLatitude, this.currentLongitude)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game-pupop{
		padding: 16rpx 28rpx;
		height: 100%;
		.game-header{
			height: 210rpx;
		}
		.game-content{
			// display: flex;
			.title1{
				font-weight: 600;
			}
			.game-item{
				display: inline-block;
				border: 2rpx solid #FFFFFF;
				// color: #FFFFFF;
				border-radius: 26rpx;
				height: 56rpx;
				line-height: 56rpx;
				padding: 0 22rpx;
			}
		}
		.game-footer{
			display: flex;
			justify-content: center;
			width: 100%;
			height: 40rpx;
			position: fixed;
			bottom: 18rpx;
		}
	}
</style>
