<template>
	<u-popup v-model="show" mode="bottom" :height="680" >
		<view class="game-pupop">
			<view class="game-content">
				<view class="title1">
					场地
				</view>
				<view 
					v-for="(item, index) in gameAddressList" 
					:key="index" 
					class="game-item" 
					:style="{
						'backgroundColor': item.disabled ? '#f3f2ef' : selectIndex === index ? '#f7e404eb' : '#eeece7', 
						'color': item.disabled ? '#d3d2ce' : ''
					}"
					@click="selectGame(item, index)"
				>
					<!-- 	'color': selectIndex === index ? '#ff4346' : '',
						'border': selectIndex === index ? '2rpx solid #ff4346' : '' -->
					{{ item.label }}
				</view>
				<view class="" style="display: flex;" v-if="specificLocation" @click="mapTab">
					<image src="../../static/imgs/Marker.png" mode=""
					style="display: inline-block;height: 36rpx;width: 36rpx;vertical-align: middle;"></image>
					<p style="font-size: 24rpx;color: #9d9999;line-height: 1.5;width: calc(100% - 36rpx);">{{ specificLocation }} （{{distance}}km）</p>
				</view>
				<view class="" v-if="gameTypeArr.length">
					<view class="title1">
						比赛类型
					</view>
					<view
						v-for="(item, index) in gameTypeArr"
						:key="index" 
						class="game-item" 
						:style="{
							'backgroundColor': selectTypeIndex === index ? '#f7e404eb' : '#eeece7',
						}"
						@click="selectType(item, index)"
					>
						{{ item === 0 ? '【全场】专业裁判+平台技术统计+优秀的你' : '【半场】12人报场，巨爽' }}
					</view>
				</view>
			</view>
			<view>
				<span class="title1">组队入场券：<span v-if="price" style="font-weight: bold;">¥{{ price }}元</span></span>
			</view>
			<view class="game-footer">
				<u-button type="primary" size="medium" @click="handleOk">选择该场</u-button>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import http from '../../api/index.js'
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
				selectTypeIndex: null,
				currentLatitude: 34.343119,
				currentLongitude: 108.93963,
				specificLocation: '',
				distance: '',
				selectItem: {},
				price: null,
				gameTypeArr: []
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
					this.selectTypeIndex = null
					this.specificLocation = ''
					this.distance = ''
					this.selectItem = {}
				}
			},
			selectGame(e, index) {
				if(e.disabled) return
				this.selectIndex = index
				this.selectItem = e
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
					this.gameTypeArr = [...new Set(findItem.gameDates.map(item => item.gameType))].filter(ele => ele || ele === 0)
				}
			},
			selectType(e, index) {
				this.selectTypeIndex = index
				http.get('weapp/game/queryAddressPrice', {params: {address: this.selectItem.label}}).then(res => {
					if(res.data.code === 0) {
						this.price = e === 0 ? res.data.data.fullPrice : res.data.data.halfPrice
						this.selectItem.gameType = e
					}
				})
				
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
		.game-content{
			// display: flex;
			.title1{
				font-weight: bold;
				font-size: 28rpx;
			}
			.game-item{
				display: inline-block;
				border: 2rpx solid #FFFFFF;
				margin-left: 12rpx;
				border-radius: 26rpx;
				height: 56rpx;
				line-height: 56rpx;
				padding: 0 22rpx;
			}
		}
		.game-footer{
			::v-deep{
				.u-btn{
					width: 100%!important;
				}
			}
			display: flex;
			justify-content: center;
			width: 100%;
			height: 40rpx;
			position: fixed;
			// bottom: 0;
			bottom: 88rpx;
		}
	}
</style>
