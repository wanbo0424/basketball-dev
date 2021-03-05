<template>
	<view style="background-color: #fff;height: 100%;">
		<canvas class="hideCanvas" style="border:1px solid #1e1e1e;width: 1500rpx;height: 2000rpx;" id="ticket_id" canvas-id="ticket_id" ></canvas>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ctx: null
			}
		},
		methods: {
			async drawTicket() {
				this.ctx.setFillStyle('#FFFFFF')
				this.ctx.fillRect(0, 0, 190 * 2, 79 * 2)
				let ticketTmpPath = await this.downLoadFile('http://39.101.161.231/images/ticket.png')
				this.ctx.drawImage(ticketTmpPath, 0, 0, 190 * 2, 79 * 2)
				
				this.drawTeam()
				this.ctx.draw()
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
		},
		mounted(){
			this.ctx = uni.createCanvasContext('ticket_id', this)
			this.drawTicket()
		},
	}
</script>

<style>

</style>
