<template>
	<view>
		<u-mask :show="showMask" @click="showMask = false">
			<view class="poster-bg">
				<image :src="posterImage || ''" mode="widthFix" class="posterImage"></image>
			</view>
			
			<view class="share_button">
				<button open-type="share" 
				style="
				color: #FFFFFF;border-color: #19be6b;font-size: 30rpx;
				height: 80rpx;
				line-height: 80rpx;
				background-color: #19be6b;text-align: center;">
					<!-- <u-button type="success">
					</u-button> -->
					发送给朋友
				</button>
				<u-button type="success" @click="saveImage">朋友圈</u-button>
			</view>
		</u-mask>
		
		<canvas class="hideCanvas" style="border:1px solid #1e1e1e;width: 1500rpx;height: 2000rpx;" id="share_id" canvas-id="share_id" ></canvas>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ctx: null,
				showMask: false,
				posterImage: ''
			}
		},
		mounted(){
			this.ctx = uni.createCanvasContext('share_id', this)
			// this.draw()
		},
		methods: {
			async draw() {
				uni.showLoading({
					title: '生成分享图片',
					mask: true
				})
				this.ctx.setFillStyle('#FFFFFF')
				this.ctx.fillRect(0, 0, 320 * 2, 440 * 2)

				let logoTmpPath = await this.downLoadFile('http://39.101.161.231/images/logo1.png')
				let codeTmpPath = await this.downLoadFile('http://39.101.161.231/images/code.jpeg')
				let mainTmpPath = await this.downLoadFile('http://39.101.161.231/images/share_cover.png')
				this.ctx.drawImage(logoTmpPath, 0, 0, 45 * 2, 45 * 2)
				this.ctx.drawImage(mainTmpPath, 0, 45 * 2, 320 * 2, 256 * 2)
				
				this.ctx.setFontSize(26);
				this.ctx.setFillStyle('black')
				this.ctx.setTextBaseline('middle');
				this.ctx.setTextAlign('center');
				this.ctx.fillText("阿普体育科技",160 * 2, 320 * 2, 100 * 2);

				this.ctx.drawImage(codeTmpPath, 124 * 2, 340 * 2, 72 * 2, 72 * 2)
				
				this.ctx.setFontSize(18);
				this.ctx.setFillStyle('#8a8a8a')
				this.ctx.setTextBaseline('middle');
				this.ctx.setTextAlign('center');
				this.ctx.fillText("长按识别小程序码",160 * 2, 425 * 2, 100 * 2);
				const _this = this
				this.ctx.draw(false, () => {
					uni.hideLoading()
					_this.canvasToImage()
				})
			},
			// 下载文件到临时路径
			downLoadFile(imgUrl) {
				return new Promise((resolve, reject) => {
					uni.downloadFile({
					    url: imgUrl, //仅为示例，并非真实的资源
						success: (res) => {
							if (res && res.tempFilePath){
								resolve(res.tempFilePath);
							}else{
								reject('not find tempFilePath');
							}
						}
					    
					});
				});
			},
			canvasToImage() {
				const _this = this
				uni.canvasToTempFilePath({
				  x: 0,
				  y: 0,
				  width: 320 * 2,
				  height: 440 * 2,
				  destWidth: 320 * 2,
				  destHeight: 440 * 2,
				  canvasId: 'share_id',
				  quality: 1,
				  fileType: 'jpg',
				  success: function(res) {
				    // 在H5平台下，tempFilePath 为 base64
					_this.posterImage = res.tempFilePath
					_this.showMask = true
				  },
				  fail: function(err) {
					  console.log('canvas生成图片临时路径失败', err)
				  }				  
				}, this)
			},
			
			getImageInfo(tempFilePath) {
				return new Promise((rs, rj) => {
					uni.getImageInfo({
						src: tempFilePath,
						success: function (image) {
							console.log(image, 'image');
							rs(image)
						}
					});
				})
			},
			
			saveImage() {
				const _this = this
				uni.saveImageToPhotosAlbum({
				  filePath: this.posterImage,
				  success: function (res) {
					var savedFilePath = res.savedFilePath;
					console.log(savedFilePath)
					_this.$refs.uToast.show({
						title: 	`图片保存至：${savedFilePath}`,
						type: 'success',
					})
				  }
				});
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.hideCanvas {
	position: fixed;
	top: -99999upx;
	left: -99999upx;
	z-index: -99999;
}
.share_button{
	display: flex;
	margin-top: 100rpx;
	justify-content: space-around;
	padding: 0 15%;
}
.poster-bg{
	margin-top: 26rpx;
	display: flex;
	justify-content: center;
}
</style>
