<template>
	<view class="form-content">
		<u-form :model="form" ref="uForm" label-width="140">
			<u-form-item label="比赛场地" prop="gameName">
				<u-input v-model="plarerData.gameName" type="select" @click="showGameSelect = true" />
				<u-select v-model="showGameSelect" :list="gameList" @confirm="gameSelected"></u-select>
			</u-form-item>
			<u-form-item label="性别" prop="sex">
				<u-input v-model="form.sex" type="select" @click="showSexSelect = true" />
				<u-select v-model="showSexSelect" :list="sexList" @confirm="sexSelected"></u-select>
			</u-form-item>
			<u-form-item label="年龄" prop="age">
				<u-input v-model="form.age" />
			</u-form-item>
			<u-form-item label="擅长位置" prop="role">
				<u-input v-model="form.role" type="select" @click="showRoleSelect = true" />
				<u-select v-model="showRoleSelect" :list="roleList" @confirm="roleSelected"></u-select>
			</u-form-item>
			<u-form-item label="联系方式" prop="mobile">
				<u-input v-model="form.mobile" />
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import Cookies from 'js-cookie'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				showSexSelect: false,
				showRoleSelect: false,
				showGameSelect: false,
				form: {
					age: '',
					sex: '',
					role: '',
					mobile: '',
					gameId: '',
					gameName: ''
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
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change','blur']
						}
					],
				},
				gameList: [],
				plarerData: {}
			}
		},
		mounted() {
			this.getGameList()
			this.plarerData = {
				nickName: this.userInfo.nickName
			}
		},
		computed: {
			...mapGetters([
			  'userInfo',
			])
		 },
		methods: {
			sexSelected(e) {
				this.form.sex = e[0].label;
			},
			roleSelected(e) {
				this.form.role = e[0].label;
			},
			gameSelected(e) {
				this.plarerData.gameName = e[0].label
				this.plarerData.gameId = e[0].value
			},
			getGameList() {
				http.get('weapp/game/gameList').then(res => {
					if(res.data.code === 0) {
						this.gameList = res.data.data.map(item => ({
							value: item._id,
							label: `${item.gameAddress}-- ${item.gameDate}`
						}))
					}
				})
			},
			// 提交报名信息
			submit() {
				http.post('weapp/players/apply', this.form).then(res => {
					debugger
				})
				// uni.showLoading({
				// 	title: '处理中...'
				// })
				// debugger
				// uniCloud.callFunction({
				// 	name: 'add',
				// 	data: this.form
				// }).then((res) => {
				// 	debugger
				// 	uni.hideLoading()
				// 	uni.showModal({
				// 		content: `报名成功，敬请期待匹配结果，及时关注此小程序`,
				// 		showCancel: false,
				// 		success: () => {
				// 			uni.navigateTo({url: '/pages/signSuccess/index'})
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
			},
			// 提交球员档案
			submitPlayer(){
				
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		}
	}
</script>

<style lang="scss">
.form-content {
	padding: 30rpx 40rpx;
}
</style>
