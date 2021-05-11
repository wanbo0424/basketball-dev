<template>
	<view class="form-content">
		<u-form :model="form" ref="uForm" label-width="140">
			<u-form-item label="比赛场地" required="true" prop="gameName">
				<u-input v-model="form.gameAddress" type="select" @click="showGameSelect = true" />
				<u-select v-model="showGameSelect" :list="gameAddressList" @confirm="gamAddressSelected"></u-select>
			</u-form-item>
			<u-form-item label="比赛日期" required="true" prop="gameDate">
				<u-input v-model="form.gameDate" type="select" @click="showGameDateSelect = true" />
				<u-select v-model="showGameDateSelect" :list="gameDateList" @confirm="gameDateSelected"></u-select>
			</u-form-item>
			<u-form-item label="比赛时间" required="true" prop="gameTimeRange">
				<u-input v-model="form.gameTimeRange" type="select" @click="showGameTimeSelect = true" />
				<u-select v-model="showGameTimeSelect" :list="gameTimeList" @confirm="gameTimeSelected"></u-select>
			</u-form-item>
			<u-form-item label="性别" required="true" prop="sex">
				<u-input v-model="form.sex" disabled type="select" @click="showSexSelect = true" />
				<!-- <u-select v-model="showSexSelect" :list="sexList" @confirm="sexSelected"></u-select> -->
			</u-form-item>
			<u-form-item label="年龄" prop="age">
				<u-input v-model="form.age" />
			</u-form-item>
			<u-form-item label="擅长位置" required="true" prop="role">
				<u-input v-model="form.role" type="select" @click="showRoleSelect = true" />
				<u-select v-model="showRoleSelect" :list="roleList" @confirm="roleSelected"></u-select>
			</u-form-item>
			<u-form-item label="需要赛事保险" prop="needInsurance">
				<u-radio-group v-model="form.needInsurance">
					<u-radio v-for="(item, index) in [{name: '是'}, {name: '否'}]" 
					:key="index" :name="item.name" :disabled="item.disabled" >
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item v-show="showInsurance" label="姓名" :required="showInsurance" prop="role">
				<u-input v-model="form.actualName" />
			</u-form-item>
			<u-form-item v-show="showInsurance" label="身份证号" :required="showInsurance" prop="role">
				<u-input v-model="form.identity" />
			</u-form-item>
			<u-form-item label="联系方式" prop="mobile">
				<u-input v-model="form.mobile" />
			</u-form-item>
		</u-form>
		<u-button class="submt-button" @click="submit">提交</u-button>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import Cookies from 'js-cookie'
	import { mapGetters } from 'vuex'
	import shareMixin from '../../mixins/share.js'
	import {generateOrderNumber} from '../../utils/payUtils.js'
	export default {
		mixins:[shareMixin],
		data() {
			return {
				showSexSelect: false,
				showRoleSelect: false,
				showGameSelect: false,
				showGameDateSelect: false,
				showGameTimeSelect: false,
				showInsurance: true,
				form: {
					age: '',
					sex: '男',
					role: '',
					mobile: '',
					gameId: '',
					gameName: '',
					needInsurance: '是'
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
						// {required: true, message: '请填写联系方式', trigger: ['change','blur']},
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
				},
				gameAddressList: [],
				gameDateList: [],
				gameTimeList: [],
				gameList: [],
				plarerData: {}
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
			])
		 },
		methods: {
			gamAddressSelected(e) {
				this.form.gameAddress = e[0].label
				let findItem = this.gameList.find(item => item._id === e[0].label)
				if(findItem){
					this.gameDateList = findItem.gameDates
						.filter(item => new Date(item.gameDate).getTime() > new Date().getTime() )
						.map(item => item.gameDate)
					this.gameDateList = Array.from(new Set(this.gameDateList))
					this.gameDateList = this.gameDateList.map(item => ({
						value: item,
						label: item,
					}))
				}else{
					this.gameDateList = []
				}
			},
			gameDateSelected(e) {
				this.form.gameDate = e[0].label
				if(this.gameList && this.gameList.length) {
					let findItem = this.gameList.find(item => item._id === this.form.gameAddress)
					if(findItem){
						this.gameTimeList = findItem.gameDates.filter(item => item.gameDate === this.form.gameDate)
						this.gameTimeList = this.gameTimeList.map(item => ({
							value: item.gameId,
							label: item.gameTimeRange
						}))
					}
				}
			},
			gameTimeSelected(e) {
				this.form.gameTimeRange = e[0].label
				this.form.gameId= e[0].value
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
							label: item._id
						}))
						console.log(this.gameAddressList, 'gameAddressList')
					}
				})
			},
			// 提交报名信息
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.form.openId = this.userInfo.openId
						this.form.nickName = this.userInfo.nickName
						this.form.avatarUrl = this.userInfo.avatarUrl
						this.form.out_trade_no = generateOrderNumber()
						this.form.needInsurance = (this.form.needInsurance === '是')
						if(this.shared.nickName) {
							this.form.sharedNickName = this.shared.nickName
						}
						http.post('weapp/players/apply', this.form).then(res => {
							console.log(res)
							if(res.data.code === 0) {
								uni.navigateTo({
									url:`/pagesA/defray/index?gameAddress=${this.form.gameAddress}&out_trade_no=${this.form.out_trade_no}&gameDate=${this.form.gameDate}&gameTimeRange=${this.form.gameTimeRange}`
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
			// 提交球员档案
			submitPlayer(){
				
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		}
	}
</script>

<style lang="scss" scoped>
.form-content {
	padding: 30rpx 40rpx;
	height: 100vh;
	width: 100vw;
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
	bottom: 0;
	left: 0;
   background-image: url(/static/imgs/order-bg.jpg);
   opacity: 0.3;
   background-size: cover;
   background-repeat:no-repeat;
}
</style>
