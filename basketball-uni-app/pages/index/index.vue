<template>
	<view class="content">
		<col-toast></col-toast>
		<u-modal v-model="showModal" :show-cancel-button="true" confirm-text="同意" :title-style="{fontSize: '34rpx'}"
			title="参赛用户协议" @cancel="showModal = false" @confirm="agree"
		>
			<view class="u-update-content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</u-modal>
		
		<image style="height:100%;width: 100%;" src="../../static/imgs/home-bg.png" mode=""></image>
		<image 
			style="position: absolute;left: 30px;bottom: 62px;height: 116rpx;width: 221rpx;" 
			@click="toHome" 
			src="../../static/imgs/button1.png" 
			mode="">
		</image>
		<u-checkbox 
			style="position: absolute;bottom: 50rpx;font-weight: bold;"  
			v-model="checked" 
			:label-disabled="true" 
			:disabled="false" 
			@change="changeBox">
				<span>我已阅读并同意
					<a 
					style="position: relative;display: inline-block;width: 300rpx;text-decoration: underline;" 
					@click="showModal=true">篮球比赛用户协议
					</a>
				</span>
		</u-checkbox>
		
		<view class="share_button_view" 
			@click="() => {
				$refs.share.draw()
			}">
			<u-icon name="share" custom-prefix="custom-icon" color="#fff" size="30" ></u-icon>
			<view class="" style="color: #FFFFFF;font-weight: 500;">
				分享
			</view>
		</view>
		
		<!-- <share-poster ref="share"></share-poster> -->
		<custom-canvas ref="share"></custom-canvas>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import shareMixin from '../../mixins/share.js'
	// import sharePoster from '../sharePoster'
	import customCanvas from '../canvas/share.vue'
	import Toast from './Toast'
	import http from '../../api/index.js'
	import { mapActions, mapGetters } from 'vuex'
	export default{
		mixins:[shareMixin],
		components:{customCanvas, ColToast: Toast},
		data() {
			return {
				checked:'',
				canToHome: false,
				showShare: false,
				showModal: false,
				showColToast: true,
				content:  `
					一、声明：<br>
					1、该协议的目的是为了蓝球队比赛活动发起人、参与组织者、领队（以下简称：发起者）和报名参加比赛活动的球队成员（以下简称：球队成员）明确知晓篮球队比赛活动所存在的风险，提高参加比赛活动人员的抗风险和自律能力，免除比赛活动的发起人和球队成员在比赛活动中出现的相关赔偿及法律连带等责任，让篮球队比赛活动更加安全、健康、快乐。<br>
					2、比赛活动中，对于违法国家相关法规、恶意侵犯他人合法权利或其它涉及犯罪行为的事实、不在本协议范围内，必须由行为相关人承担相应的法律责任。<br>
					3、凡报名参加比赛活动的成年人，均承诺：自己是健康的并具有完全民事行为能力的人，均已经仔细阅读和完全理解并同意接受本《篮球队比赛活动免责协议书》的全部条款，并需在参加每次比赛活动前（集合时）在本协议上“比赛活动参加人签名”处签属真实姓名后可参加比赛活动。<br>
					4、本协议为相关责任的豁免、权利的放弃、风险的承担和免赔的协议。如果在本协议上签字，即表示：你已经完全知晓、理解和同意接受本《篮球队比赛活动免责协议书》全部条款，你完全放弃向比赛活动发起者请求赔偿和提起诉讼的权利；永远免除对每次比赛活动发起者的赔偿及法律连带责任。<br>
					二、比赛活动情况：<br>
					比赛活动计划时间：2021年4月-12月。比赛活动项目：...篮球赛（以下简称：本次比赛活动）。<br>
					三、风险的承担：<br>
					比赛活动参加人承诺：我参加本次比赛活动是完全自愿的，以签署本有关豁免、权利放弃和风险自担的协议为前提要件的；
					我知晓：比赛活动的发起者只是比赛活动的联系人，并非职业的领队、向导或有许可证的急救人员；<br>
					我知晓：比赛活动的发起者可能并没有参加过包括但不限于篮球队比赛活动的课程或急救（包括野外）的培训，不具有处理此些事件经验；<br>
					我知晓：发起者没有任何义务也不能对我负任何责任。<br>
					四、关于豁免责任，放弃权利和赔偿的协议内容：<br>
					1、知悉和服从保证：<br>
					本次比赛活动性质为共同爱好者自愿参加、共同参与、风险自担、责任自负；
					全程遵循“自助、互助、费用按人头自行分担、环保”的原则；
					对于比赛活动中突发的一切足以影响到大家切身安全和利益的因素等重大事项尚需球队成员共同商定；
					比赛活动中发起者仅有义务对全队比赛活动进行组织协调，球队成员有义务服从比赛活动的整体安排。
					2、风险承担和损害赔偿保证：<br>
					我清楚地知道：篮球运动本身属于团体对抗性运动，具有一定的风险性；比赛活动安排的时间是估算时间，实际比赛活动时间可能出现较大的差异；
					报名前，我已详细阅读了包括但不限于本次比赛活动的公告、计划、行程、注意事项等内荣和本《篮球队比赛活动免责协议书》的全部条款，并经过合理判断，同意接受本次比赛活动的全部安排、计划和本《篮球队比赛活动免责协议书》的全部条款，同意自行承担本次比赛活动的所有风险和后果；包括交通工具及其他第三方设施带来的风险；如果由于我的行为和我的参加而导致了第三方的财产损失或人身伤害，我同意在责任范围内就该等损失和伤害进行赔偿。<br>
					3、人身损害保证：<br>
					我知道：参加本次比赛活动及该比赛活动所涉装备的使用等等事项都有潜在危险，可能会受到身体损伤、瘫痪、甚至死亡的风险；我自愿参加本次比赛活动、使用比赛活动所涉的装备，如果因为在参加本次比赛活动中受到伤害，我将自行承担和接受任何可能对我身体造成损害甚至死亡的风险，并且放弃追究和要求发起者赔偿的权利，同时我永远免除本次比赛活动发起者和球队成员的赔偿及法律连带责任。<br>
					4、身体和精神保证：<br>
					本次比赛活动可能对身体和精神方面都有一定考验；
					我清楚的知道：比赛活动发起者无法全面预见该比赛活动中所有的风险和不利，我知道：以上所列的风险并不完全包含本次比赛活动中的所有可能的风险；
					当我万一遇到上述伤害后，所有援救、救助和医疗等等全部费用全部由我自行承担，比赛活动的发起者和球队人员不承担所发生的一切费用和法律连带责任；同时我永远免除本次比赛活动的发起者和球队成员的赔偿和法律责任，并不仅限于以上所列的风险中。发起者和其它成员不承担任何赔偿和法律责任；我永远免除本次比赛活动发起者和球队成员的赔偿及法律连带责任。
					5、保险保证：<br>
					我清楚地知道：本次比赛活动发起者不是保险公司，没有义务为我购买意外保险等险种，我知道自己购买保险的意义；
					我知道发起者已在比赛活动内容中提醒我本人，在比赛活动开始前我已了解了保险类别并自主选择是否购买保险；如我已购买保险，则对于比赛活动中可能出现的意外事故，可由投保的保险公司承担相应的责任。我同意只在保险公司已投保的保险范围额度内接受赔偿。<br>
					6、自身健康保证：<br>
					在此我谨宣布：我自己身体健康，适合参加本次比赛活动，没有那些会影响我参加本次比赛活动或使用装备的疾病和潜在疾病；
					我至少将通过：注意环境、注意我的身体和精神状况、注意所有与安全相关的装备的适用状况、只参加那些自己精神和身体能力之内的比赛活动等等措施来减少我的风险；
					我同意和保证，如果任何时候我认为是不安全的，我会立刻中断比赛活动的进行。如我在比赛中发生各种疾病或伤害，甚至死亡，我同意放弃追究和要求赔偿的权利，同时我永远免除本次比赛活动发起者和球队成员的赔偿及法律连带责任。<br>
					7、救助保证：<br>
					当由于出现各种意外事故和急性疾病等不可预测因素造成身体损伤，发起者和球队成员有义务尽力救助，但如果造成了不可逆转的损害，我同意放弃追究和要求赔偿的权利，同时我永远免除本次比赛活动发起者和球队成员的赔偿及法律连带责任；
					我完全理解：在同伴需要协助的时候，我将配合协助发起者及球队成员尽力协助我的同伴，但这必须满足的前提是：在我的判断中，这是自己力所能及的范围内，并且不会给自己带来不合理的危险；
					我进一步理解到：我没有法律上的责任去协助别人，同时，发起者以及我的同伴或者其他成员也没有任何法律上的责任来协助我，<br>
					8、利害关系人同意保证：<br>
					我知晓：报名前必须事先与自己的家属沟通，取得家属的理解和支持，知道并同意接受本协议全部条款后，才能报名参加本次比赛活动，报名后视同其家属也已知情并同意；
					我知晓：一旦签署，本协议即生效，也知晓本协议所有条款对我的继承人、近亲属、执行人、管理人、个人代表和转让人同样有效；代为签名者视为已被授权，否则由代签人承担后果。<br>
					9、我在此特别声明：<br>
					<b>我已阅读和理解以上声明和全部条款内容；我理解参加本次比赛活动相关的风险；我同意承担由于选择和参加本次比赛活动可能附随的全部责任；对于参加本次比赛活动而引发或与之连带的任何损害导致的法律要求（包括第三方的法律要求），我永远免除本次比赛活动中发起者、主办方和球队成员、注册或非注册组织的赔偿及法律责任，但加害方出于故意或本协议有特别规定的除外。</b><br>
					10、协议范围：<br>
					凡是报名参加者均视为已经阅读、理解，并完全接受该协议条款；该协议自签字后开始生效。<br>
					11、定义：<br>
					本协议所称的“比赛活动”包括也仅包括篮球比赛活动以及从事这些比赛活动的事前准备比赛活动和训练等等。<br>
				`,
			}
		},
		computed: {
			...mapGetters([
			  'userInfo',
			])
		 },
		methods:{
			async toHome() {
				if(!this.canToHome) {
					this.$refs.uToast.show({
						title: '请勾选页面下方的“篮球比赛用户协议”',
						type: 'default',
						duration: '2000'
					})
					return
				}
				wx.requestSubscribeMessage({
				  tmplIds: ['T4Bq3RFYlZ4f7GWSwuOAvONC9kVYZrBpPwtQ5NwxGZM'],
				  success: (res) => { 
					  console.log(res)
				  },
				  complate: async () => {
				  }
				})
				let result1 = await this.getUserInfo(this.canToHome)
				let result2 = await this.getLocationInfo()
				if(result1 !== 'success') {
					return
				}
				
				if(!this.canToHome) {
					this.$refs.uToast.show({
						title: '请勾选页面下方的“篮球比赛用户协议”',
						type: 'default',
						duration: '2000'
					})
					return
				}
				uni.switchTab({url: '/pages/home/index'})
			},
			changeBox(e) {
				this.canToHome = e.value
			},
			agree() {
				http.post('weapp/applets/agreeProtocol', {nickName: this.userInfo.nickName, isAgree: true}).then(res => {
					if(res.code === 0) {
						this.canToHome = true
						this.checked = true
					}
				})
			},
			...mapActions([
			  'getUserInfo', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
			  'getLocationInfo'
			]),
		},
	}
</script>
<style lang="scss" scoped>
	/deep/{
		.u-model__content{
			overflow-y: scroll;
		}
	}
	.u-update-content{
		height: 1000rpx;
		font-size: 24rpx;
	}
	.content{
		// background-color: black;
		// background: url('../../static/imgs/main-img.jpeg') no-repeat center;
		position: relative;
		// background: url('../../static/imgs/home-bg.jpeg') no-repeat center;
		background-size: cover;
		height: 100vh;
		width: 100vw;
		display: flex;
		align-items: center;
		// justify-content: center;
		flex-direction: column;
		background-color: #F1F1F1;
		
		.main-img{
			width: 100%;
		}
		.propagate-text{
			margin-top: 50rpx;
			margin-bottom: 127rpx;
			font-family: cursive;
			color: #1d1810;
			text-align: center;
			font-size: 60rpx;
			animation:textScale 2s ease-in
		}
		.into-button{
			margin-top: 80rpx;
			background-color: #de8d05;
			height: 120rpx;
			line-height: 100rpx;
			width: 300rpx;
			border: 7rpx solid #6b2807;
			border-radius: 6rpx;
			margin: 0 auto;
			// color: #6b2807;
			font-size: 60rpx;
			text-align: center;
		}
		.share_button_view{
			height: 86rpx;
			width: 86rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			background-color: #ff0000;
			position: fixed;
			bottom: 160rpx;
			right: 16rpx;
		}
	}
	@keyframes textScale
		{
			0% {
				transform:scale(0.2, 0.2);
				opacity: 0.2;
			}
			// 50% {
			// 	transform:scale(1.5, 1.5);
			// 	opacity: 1;
			// }
			100% {
				transform:scale(1, 1);
				opacity: 1;
			}
		}
</style>