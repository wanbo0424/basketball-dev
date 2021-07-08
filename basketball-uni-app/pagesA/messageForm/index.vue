<template>
	<view class="form-content">
		<u-form :model="form" ref="uForm" label-width="140">
			<u-form-item label="比赛场地" required="true" prop="gameName">
				<game-popup 
					:list="gameAddressList" 
					:gameList="gameList" 
					ref="game-popup"
					v-model="form.gameAddress"
					@confirm="gamAddressSelected"
				></game-popup>
				<u-input v-model="form.gameAddress" type="select" @click="$refs['game-popup'].init(gameAddressList)" />
				<!-- <u-input v-model="form.gameAddress" type="select" @click="showGameSelect = true" /> -->
				<!-- <u-select v-model="showGameSelect" :list="gameAddressList" @confirm="gamAddressSelected"></u-select> -->
			</u-form-item>
			<!-- <view v-if="specificLocation !== ''" @click="mapTab">
				<image src="../../static/imgs/Marker.png" mode="" 
				style="display: inline-block;height: 32rpx;width: 32rpx;vertical-align: middle;"></image>
				<span>{{ specificLocation }} （{{distance}}km）</span>
			</view> -->
			<u-form-item label="比赛日期" required="true" prop="gameDate">
				<u-input v-model="form.gameDate" type="select" @click="showGameDateSelect = true" />
				<u-select v-model="showGameDateSelect" :list="gameDateList" @confirm="gameDateSelected"></u-select>
			</u-form-item>
			<u-form-item label="比赛时间" required="true" prop="gameTimeRange">
				<u-input v-model="form.gameTimeRange" type="select" @click="showGameTimeSelect = true" />
				<u-select v-model="showGameTimeSelect" :list="gameTimeList" @confirm="gameTimeSelected"></u-select>
			</u-form-item>
			<u-form-item label="剩余名额" class="place-form-item" >
				{{ places }}
			</u-form-item>
			<u-form-item label="性别" required="true" prop="sex">
				<u-input v-model="form.sex" disabled type="select" @click="showSexSelect = true" />
				<!-- <u-select v-model="showSexSelect" :list="sexList" @confirm="sexSelected"></u-select> -->
			</u-form-item>
			<u-form-item label="年龄" prop="age">
				<u-input v-model="form.age" />
			</u-form-item>
			<u-form-item label="擅长位置" required="<tr></tr>ue" prop="role">
				<u-input v-model="form.role" type="select" @click="showRoleSelect = true" />
				<u-select v-model="showRoleSelect" :list="roleList" @confirm="roleSelected"></u-select>
			</u-form-item>
			<template v-if="gameType === 0">
				<u-form-item label="需要保险" prop="needInsurance" class="insurance-form">
					<u-radio-group v-model="form.needInsurance">
						<u-radio v-for="(item, index) in [{name: '是'}, {name: '否'}]" 
						:key="index" :name="item.name" :disabled="item.disabled" >
							{{ item.name }}
						</u-radio>
					</u-radio-group>
					<a
						href="#"
						style="
						display: inline-block;
						text-align: right;
						position: absolute;
						right: 20rpx;top: 20rpx;font-size: 28rpx;
						color: #fd6060;text-decoration: underline;" 
						@click="viewInsurance">保障权益？
					</a>
				</u-form-item>
				<u-form-item v-show="showInsurance" label="真实姓名" :required="showInsurance" prop="actualName">
					<u-input v-model="form.actualName" />
				</u-form-item>
				<u-form-item v-show="showInsurance" label="身份证号" :required="showInsurance" prop="identity">
					<u-input v-model="form.identity" />
				</u-form-item>
			</template>
			<u-form-item label="联系电话" prop="mobile" required="true">
				<u-input v-model="form.mobile" />
			</u-form-item>
		</u-form>
		<u-button type="primary" class="submt-button" @click="submit(false)">提交</u-button>
		<!-- <map id="map1" v-show="showMap" 
			:latitude="centerlatitude" 
			:longitude="centerlongitude" 
			style="width: 100%;height: 350rpx;margin-top:20rpx" 
			:scale="12" 
			:show-location="true" 
			@tap="mapTab"> -->
		</map>
		<u-toast ref="uToast" />
		
		<insurance-detail ref="insurance"></insurance-detail>
		
		<u-modal 
			title="请您再次确认！"
			v-model="showVerifyId" 
			show-cancel-button 
			:content-style="{padding: '10rpx 28rpx', fontSize: '24rpx'}"
			@confirm="submit(true)">
			<rich-text :nodes="verifyContent"></rich-text>
		</u-modal>
		
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import {getDistance} from '../../utils/index.js'
	import { mapGetters } from 'vuex'
	import { generateOrderNumber } from '../../utils/payUtils.js'
	import GamePopup from './game-popup.vue'
	import InsuranceDetail from './insurance-detail.vue'
	// import CouponModel from '../defray/CouponModel.vue'
	import moment from 'moment'
	export default {
		components:{ GamePopup, InsuranceDetail },
		data() {
			return {
				MapContext: null,
				showSexSelect: false,
				showRoleSelect: false,
				showGameSelect: false,
				showGameDateSelect: false,
				showGameTimeSelect: false,
				showInsurance: true,
				showVerifyId: false,
				verifyContent: '',
				places: 16,
				form: {
					age: '',
					sex: '男',
					role: '',
					mobile: '',
					gameId: '',
					gameName: '',
					needInsurance: '是',
					actualName: '',
					identity: ''
				},
				sexList: [{value: 0, label: '男'}, {value: 1, label: '女'}],
				roleList: [
					{label: '中锋（C）', value: 0},
					{label: '大前锋（PF）', value: 1},
					{label: '小前锋（SF）', value: 2},
					{label: '得分后卫（SG）', value: 3},
					{label: '控球后卫（PG）', value: 4},
				],
				rules: {
					name: [{required: true, message: '请填写姓名', trigger: ['change','blur']}],
					sex: [{required: true, message: '请填写性别', trigger: ['change','blur']}],
					role: [{required: true, message: '请填写角色', trigger: ['change','blur']}],
					mobile: [
						{required: true, message: '请填写联系方式', trigger: ['change','blur']},
						{
							validator: (rule, value, callback) => {
								if(value) {
									return this.$u.test.mobile(value);
								}else{
									return true
								}
							},
							message: '手机号码不正确',
							trigger: ['change','blur']
						}
					],
					identity: [
						{
							pattern: /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/,
							message: '请输入正确的身份证号',
							trigger: ['change','blur']
						},
					]
				},
				gameAddressList: [],
				gameDateList: [],
				gameTimeList: [],
				gameList: [],
				couponList: [],
				plarerData: {},
				currentLatitude: 34.343119,
				currentLongitude: 108.93963,
				// specificLocation: '',
				// distance: '',
				gameType: null,  //比赛类型
				gamePrice: 0
			}
		},
		watch:{
			'form.needInsurance'(val) {
				if(this.form.needInsurance === '是') {
					this.showInsurance = true
				}else{
					this.showInsurance = false
				}
			}
		},
		mounted() {
			this.MapContext = wx.createMapContext('map1', this)
			// this.MapContext.on('markerClusterClick', (res) => {
			// 	wx.openLocation({
			// 		latitude: this.currentLatitude,
			// 		longitude: this.currentLongitude
			// 	})
			// })
			this.getGameList()
			this.plarerData = {
				nickName: this.userInfo.nickName
			}
			// 支付相关
			// new Promise((resolve, reject) => {
			// 	uni.getProvider({
			// 		service: 'payment',
			// 		success(res) {
			// 			resolve(res.provider)
			// 		},
			// 		fail() {
			// 			reject(new Error('获取支付方式失败'))
			// 		}
			// 	})
			// }).then((provider) => {
			// 	debugger
			// 	return uniCloud.callFunction({
			// 		name: 'pay',
			// 		data: {
			// 			provider,
			// 			// outTradeNo: this.outTradeNo
			// 		}
			// 	})
			// }).then(res => {
				
			// })
		},
		computed: {
			...mapGetters([
			  'userInfo',
			  'shareInfo'
			])
		 },
		 
		methods: {
			createMap(order) {
				this.showMap = true
				this.MapContext.moveToLocation({ longitude: order.longitude, latitude: order.latitude })
				this.MapContext.addMarkers({
					markers: [
						{
							id: 324,
							latitude: order.latitude,
							longitude: order.longitude,
							iconPath: '../static/Marker.png',
							label: {
								content: this.form.gameAddress,
							}
						}
					],
				})
			},
			mapTab() {
				wx.openLocation({
					latitude: this.currentLatitude,
					longitude: this.currentLongitude
				})
				// this.MapContext.openMapApp({
				// 	longitude: this.currentLongitude,
				// 	latitude: this.currentLatitude,
				// 	destination: '陕西省西安市雁塔区西沣一路58号附一号高新第五季北门对面(泛想车城南侧,交警快赔隔壁)'
				// })
			},
			gamAddressSelected(e) {
				this.gameType = e[0].gameType
				this.gamePrice= e[0].price
				this.form.gameDate = ''
				this.form.gameTimeRange = ''
				if(e[0].label.indexOf('（待开放）') !== -1) {
					this.$refs.uToast.show({
						title: '该场次待开放',
						type: 'default',
						duration: '2000'
					})
					return
				}
				this.form.gameAddress = e[0].label
				let findItem = this.gameList.find(item => item._id === e[0].label)
				if(findItem){
					this.gameDateList = findItem.gameDates
						.filter(item => new Date(item.gameDate).getTime() > new Date().getTime() && item.gameType === this.gameType)
						.map(item => item.gameDate)
						.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
					// if(findItem.gameDates.filter(item => item.specificLocation).length) {
					// 	this.currentLatitude = findItem.gameDates.filter(item => item.specificLocation)[0].latitude
					// 	this.currentLongitude = findItem.gameDates.filter(item => item.specificLocation)[0].longitude
					// 	this.specificLocation = findItem.gameDates.filter(item => item.specificLocation)[0].specificLocation
					// 	this.computDistance()
					// }
					this.gameDateList = Array.from(new Set(this.gameDateList))
					this.gameDateList = this.gameDateList.map(item => {
						if(new Date(item).getDay() !== 0 && new Date(item).getDay() !== 6) {
							return {
								value: item,
								label: `${item} (待开放)`,
							}
						}else if(new Date(item).getDay() === 6) {
							let reserveDate = new Date(new Date(item).getTime() - 12 * 24 * 3600 * 1000)
							return {
								value: item,
								label: `${item} (${moment(reserveDate).format('YYYY-MM-DD')}可预约)`,
							}
						}else if(new Date(item).getDay() === 0) {
							let reserveDate = new Date(new Date(item).getTime() - 11 * 24 * 3600 * 1000)
							return {
								value: item,
								label: `${item} (${moment(reserveDate).format('YYYY-MM-DD')}可预约)`,
							}
						}
						
					})
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
			gameDateSelected(e) {
				if(e[0].label.indexOf('（待开放）') !== -1) {
					this.$refs.uToast.show({
						title: '该场次待开放',
						type: 'default',
						duration: '2000'
					})
					return
				}
				if(new Date(e[0].value).getDay() === 0 && new Date(new Date(e[0].value).getTime() - 11 * 24 * 3600 * 1000) > new Date().getTime()) {
					this.$refs.uToast.show({
						title: '该场次尚未开始预约',
						type: 'default',
						duration: '2000'
					})
					return 
				}
				if(new Date(e[0].value).getDay() === 6 && new Date(new Date(e[0].value).getTime() - 12 * 24 * 3600 * 1000) > new Date().getTime()) {
					this.$refs.uToast.show({
						title: '该场次尚未开始预约',
						type: 'default',
						duration: '2000'
					})
					return 
				}
				this.form.gameDate = e[0].label
				if(this.gameList && this.gameList.length) {
					let findItem = this.gameList.find(item => item._id === this.form.gameAddress)
					if(findItem){
						this.gameTimeList = findItem.gameDates.filter(item => item.gameDate === e[0].value && item.gameType === this.gameType)
						this.gameTimeList = this.gameTimeList.map(item => {
							let label = item.gameStatus === 3 ? `${item.gameTimeRange}（待开放）` : item.gameTimeRange
							return {
								value: item.gameId,
								label,
								latitude: item.latitude,
								longitude: item.longitude,
							}
						})
					}
				}
			},
			gameTimeSelected(e) {
				if(e[0].label.indexOf('（待开放）') !== -1) {
					this.$refs.uToast.show({
						title: '该场次待开放',
						type: 'default',
						duration: '2000'
					})
					return
				}
				let findItem = this.gameTimeList.find(item => item.label === e[0].label)
				if(findItem) {
					this.currentLatitude = findItem.latitude
					this.currentLongitude = findItem.longitude
					this.createMap(findItem)
				}
				this.form.gameTimeRange = e[0].label
				this.form.gameId= e[0].value
				http.get('weapp/player/getCompleteQuota', { params: {gameId:  this.form.gameId } }).then(res => {
					if(res.data.code === 0) {
						this.places = this.gameType === 0 ? 16 - res.data.data : 12 - res.data.data
					}
				})
			},
			sexSelected(e) {
				this.form.sex = e[0].label;	
			},
			roleSelected(e) {
				this.form.role = e[0].label;
			},
			// gameSelected(e) {
			// 	this.form.gameName = e[0].label
			// 	this.form.gameId = e[0].value
			// 	this.gameDate = e[0].time
			// },
			getGameList() {
				http.get('weapp/game/ToHeldGameList').then(res => {
					if(res.data.code === 0) {
						this.gameList = res.data.data
						this.gameAddressList = res.data.data.map(item => ({
							value: item._id,
							label: item._id,
							disabled: (item.gameDates && item.gameDates.every(ele => ele.gameStatus === 3)),
							// price: item.price
						}))
						this.gameAddressList.forEach(item => {
							if(item.disabled) {
								item.value = item.label = `${item.label}`
							}
						})
						this.gameAddressList.push({
							label: '更多球场即将开放，敬请期待...',
							disabled: true,
						})
					}
				})
			},
			// 提交报名信息
			submit(secondConfirm = false) {
				if(this.showInsurance && !secondConfirm) {
					this.showVerifyId = true
					this.verifyContent = `<p style="margin-bottom:24rpx;font-size: 24rpx">身份证：${this.form.identity}</p></br>
					<p style="margin-bottom:24rpx;font-size: 24rpx">真实姓名：${this.form.actualName}</p></br>`
					// console.log('aaa')
					// <p style="text-align:center">请您再次确认！</p>
					return
				}
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						this.form.openId = this.userInfo.openId
						this.form.nickName = this.userInfo.nickName
						this.form.avatarUrl = this.userInfo.avatarUrl
						this.form.out_trade_no = generateOrderNumber()
						this.form.needInsurance = (this.form.needInsurance === '是')
						if(this.shareInfo.nickName) {
							this.form.sharedNickName = this.shareInfo.nickName
						}
						// let playerList = await this.getPlayerList()
						// if(playerList.length && playerList.length >= 16) {
						// 	this.$refs.uToast.show({
						// 		title: '报名人数已满',
						// 		type: 'default',
						// 		duration: '2000'
						// 	})
						// 	return
						// }
						http.post('weapp/players/apply', this.form).then(res => {
							if(res.data.code === 0) {
								uni.navigateTo({
									url:`/pagesA/defray/index?gameAddress=${this.form.gameAddress}&out_trade_no=${this.form.out_trade_no}&gameDate=${this.form.gameDate}&gameTimeRange=${this.form.gameTimeRange}&gameType=${this.gameType}&price=${this.gamePrice}`
								})
							}
						})
						
						// 云函数
						// uniCloud.callFunction({
						//   name: 'uni-api', // 要调用的云函数名称
						//   data: {
						//     action: 'player/apply', // 路由地址，对应 controller 下 user.js 的 login 方法
						//     // 参数列表
						//     data: this.form
						//   },
						// })
						// uniCloud.callFunction({
						// 	name: 'create-player',
						// 	data: this.form
						// }).then((res) => {
						// 	uni.hideLoading()
						// 	uni.showModal({
						// 		content: `报名成功，敬请期待匹配结果，及时关注此小程序`,
						// 		showCancel: false,
						// 		success: () => {
						// 			uni.navigateTo({url:`/pages/defray/index?gameAddress=${this.form.gameName}&out_trade_no=${this.form.out_trade_no}`})
						// 		}
						// 	})
						// }).catch((err) => {
						// 	uni.hideLoading()
						// 	uni.showModal({
						// 		content: `报名失败`,
						// 		showCancel: false
						// 	})
						// 	console.error(err)
						// })
					}
				})
			},
			getPlayerList() {
				return http.get('weapp/allOrderList', { params: { gameId: this.form.gameId } }).then(res => {
					if(res.data.code === 0) {
						return Promise.resolve(res.data.data)
					}
				})
			},
			getCouponList() {
				return http.get('weapp/player/getCouponList', { params: { openId: this.userInfo.openId } }).then(res => {
					if(res.data.code === 0) {
						this.couponList = res.data.data
						return Promise.resolve(this.couponList)
					}
				})
			},
			computDistance() {
				wx.getLocation({
					success: (res) => {
						this.distance = getDistance(34.24276, 108.892258, this.currentLatitude, this.currentLongitude)
					}
				})
			},
			viewInsurance() {
				this.$refs.insurance.init()
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		}
	}
</script>

<style lang="scss" scoped>
.form-content {
	padding: 30rpx 40rpx;
	height: 100%;
	width: 100vw;
	background-size: cover;
	background-repeat:no-repeat;
}
.place-form-item{
	/deep/{
		.u-form-item__body{	
			color: #2979ff;
		}
	}
}
.insurance-form{
	position: relative;
}
.form-content:after{
	z-index: -10;
	content: '';
	display: block;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0;
	// bottom: 0;
	left: 0;
   background-image: url(/static/imgs/order-bg.jpg);
   opacity: 0.3;
   background-size: cover;
   background-repeat:no-repeat;
}
</style>
