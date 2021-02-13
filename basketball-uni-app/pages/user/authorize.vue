<template>
	<view class="authorize">
		<!-- <view class="text-center">
		  <view class="text-xl text-bold margin-bottom">申请获得以下权限</view>
		  <view class="margin-bottom">获得您的公开信息（昵称、头像等）</view>
		  <button class="authorize-btn cu-btn bg-green lg shadow round"
				  open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
			<text class="cuIcon-weixin"></text>
			<text class="authorize-btn-text">确认授权</text>
		  </button>
		</view> -->
		<u-modal 
			v-model="show" 
			show-cancel-button 
			confirm-color="green" 
			cancel-text="取消"
			@cancel="" 
			@confirm="bindGetUserInfo"
		>
			<view class="u-update-content">
				<rich-text :nodes="content"></rich-text>
			</view>
			<template slot="confirm-button">
				<button class="authorize-btn cu-btn bg-green lg shadow round"
						  open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
					<text class="cuIcon-weixin"></text>
					<text class="authorize-btn-text">确认授权</text>
				  </button>
			</template>
		</u-modal>
	  </view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				content: `
					申请获得以下权限<br>
					获得您的公开信息（昵称、头像等）
				`
			}
		},
		methods: {
			bindGetUserInfo(e) {
				// getApp().globalData.userInfo = e.detail.userInfo;
				uni.reLaunch({ url: '/pages/introduce/index' });
			  },
		}
	}
</script>

<style lang="scss">
	.u-full-content {
		background-color: #00C777;
	}
	
	.u-update-content {
		font-size: 26rpx;
		color: $u-content-color;
		line-height: 1.7;
		padding: 30rpx;
	}
  .authorize {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #ffffff;

    .authorize-btn {
      width: rpx(480);
      height: 100rpx;
      line-height: 100rpx;
      font-size: 32rpx;

      .cuIcon-weixin {
        margin-right: rpx(10);
        font-size: rpx(46);
        vertical-align: middle;
      }

      .authorize-btn-text {
        vertical-align: middle;
      }
    }
	
	.bg-green {
		background-color: #39b54a;
		color: #ffffff;
	}
  }
</style>
