<template>
	<view style="background-color: #000000;width: 100vw;height: 100vh;display: flex;align-items: center;">
		<image style="width: 100%;" @click="previewTicket" :src="ticketImage || ''" mode="widthFix" ></image>
		
		<canvas class="hideCanvas" style="width: 3000rpx;height:800rpx" id="ticket_id" canvas-id="ticket_id" ></canvas>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ctx: null,
				ticketImage: ''
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.ctx = uni.createCanvasContext('ticket_id', this)
			this.drawTicket(option)
		},
		methods: {
			async drawTicket({month , date, hour, minute, team, gameAddress, jerseyNumber, jerseyColor } = {}) {
				this.ctx.setFillStyle('#FFFFFF')
				this.ctx.fillRect(0, 0, 375 * 2, 156 * 2)
				let ticketTmpPath = await this.downLoadFile('https://www.apusport.cn/images/ticket.png')
				this.ctx.drawImage(ticketTmpPath, 0, 0, 375 * 2, 156 * 2)
				
				this.drawTeamText()
				this.drawTeamTime(month, date, hour, minute )
				this.drawGameInfo(gameAddress)
				this.drawPlayerInfo(team, jerseyNumber, jerseyColor)
				const _this = this
				this.ctx.draw(false, () => {
					// uni.hideLoading()
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
			
			drawTeamText() {
				this.ctx.setFontSize(24);
				this.ctx.setFillStyle('#bf073e')
				this.ctx.setTextBaseline('middle');
				this.ctx.setTextAlign('center');
				this.ctx.fillText('A队', 80, 255)
				this.ctx.fillText('B队', 200, 255)
			},
			
			drawTeamTime(month = '', date = '', hour = '', minute = '') {
				this.ctx.setFontSize(16);
				this.ctx.setFillStyle('#bf073e')
				this.ctx.setTextBaseline('middle');
				this.ctx.setTextAlign('center');
				this.ctx.fillText(month, 255, 238)
				this.ctx.fillText(date, 295, 238)
				this.ctx.setFontSize(20);
				this.ctx.fillText(hour, 265, 270)
				this.ctx.fillText(minute, 305, 270)
			},
			
			drawGameInfo(gameAddress) {
				this.ctx.setFontSize(13);
				this.ctx.font = 'sans-serif 800';
				this.ctx.setFillStyle('#b00639')
				this.ctx.setTextBaseline('middle');
				this.ctx.setTextAlign('center');
				this.ctx.fillText(gameAddress, 420, 242)
			},
			
			drawPlayerInfo(team, jerseyNumber = '', jerseyColor = ''  ) {
				this.ctx.setFontSize(17);
				this.ctx.setFillStyle('#FFFFFF')
				this.ctx.setTextBaseline('middle');
				this.ctx.setTextAlign('center');
				this.ctx.translate(670, 88)
				this.ctx.rotate(270 * Math.PI / 180)
				this.ctx.fillText(team, -150, 0)
				this.ctx.fillText(jerseyColor, -80, 0)
				this.ctx.fillText(jerseyNumber, 0, 0)
				this.ctx.restore()
				
			},
			
			canvasToImage() {
				const _this = this
				uni.canvasToTempFilePath({
				  x: 0,
				  y: 0,
				  width: 375 * 2,
				  height: 156 * 2,
				  destWidth: 375 * 2,
				  destHeight: 156 * 2,
				  canvasId: 'ticket_id',
				  quality: 1,
				  fileType: 'jpg',
				  success: function(res) {
				    // 在H5平台下，tempFilePath 为 base64
					_this.ticketImage = res.tempFilePath
					_this.previewTicket()
					// return Promise.resolve({imgUrl: _this.ticketImage})
					// _this.showMask = true
				  },
				  fail: function(err) {
					  console.log('canvas生成图片临时路径失败', err)
				  }	  
				}, this)
			},
			
			previewTicket() {
				uni.previewImage({
					urls: [this.ticketImage],
					longPressActions: {
						itemList: ['保存相册', '识别二维码']
					}
				})
			}
		},
		mounted(){
			// this.ctx = uni.createCanvasContext('ticket_id', this)
			// this.drawTicket()
			// console.log(this.drawTicket(), 'drawTicket')
		},
	}
</script>

<style lang="scss" scoped>
.hideCanvas {
	position: fixed;
	top: -99999upx;
	left: -99999upx;
	z-index: -99999;
}
</style>
