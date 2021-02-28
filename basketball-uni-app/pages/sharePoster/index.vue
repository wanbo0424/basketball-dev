<template>
	<view>
			<!-- 生成海报 -->
			<!-- <button type="primary" @tap="shareFc()">生成海报</button> -->
			<!-- 图片展示由自己实现 -->
			<u-mask :show="showMask" @click="showMask = false">
				<view class="poster-bg">
					<image :src="posterImage || ''" mode="widthFix" class="posterImage"></image>
				</view>
				
				<view class="share_button">
					<u-button type="success">发给朋友</u-button>
					<u-button type="success">朋友圈</u-button>
				</view>
			</u-mask>
			<!-- 画布 -->
			<view class="hideCanvasView">
				<canvas class="hideCanvas" id="default_PosterCanvasId" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
			</view>
	</view>
</template>

<script>
	import _app from '../../js_sdk/QuShe-SharerPoster/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '../../js_sdk/QuShe-SharerPoster/QS-SharePoster/QS-SharePoster.js';
	import http from '../../api/index.js'
	export default {
		data() {
			return {
				poster: {},
				posterImage: '',
				canvasId: 'default_PosterCanvasId',
				count: 0,
				showMask: false
			}
		},
		methods: {
			async shareFc() {
				let {data: {data: codePath }} = await http.post('weapp/expend/getWxacode', { path: '/pages/index/index' })
				let _this = this;
				try {
					this.count++;
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: _this, //若在组件中使用 必传
						canvasType: '2d',
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据
			
						},
						posterCanvasId: _this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							height: 10,
							width: 10
						},
						setCanvasWH({
							bgObj
						}) {
							_this.poster = bgObj
						},
						drawArray({
							bgObj,
							type,
							bgScale,
							setBgObj,
							getBgObj
						}) {
							return [
								{
									type: 'image',
									id: 'productImage',
									url: 'http://39.101.161.231/images/logo1.png',
									dx: 0,
									dy: 0,
									sx: 0,
									sy: 0,
									// dWidth: 0.2,
									// dHeight: 0.2,
									serialNum: 0,
									infoCallBack(imageInfo) {
										// let width;
										// let height;
										// if (imageInfo.width > imageInfo.height) {
										// 	width = imageInfo.width > 700 ? 700 : imageInfo.width;
										// 	height = width / imageInfo.width * imageInfo.height;
										// } else {
										// 	height = imageInfo.height > 700 ? 700 : imageInfo.height;
										// 	width = height / imageInfo.height * imageInfo.width;
										// }
										// if (width < 500) {
										// 	width = 500;
										// 	height = width / imageInfo.width * imageInfo.height;
										// }
										// let addHeight = height * .6;
										// if (addHeight < 150) addHeight = 150;
										// if (addHeight > 250) addHeight = 250;
										setBgObj({
											// width,
											// height: height + addHeight
											width: 70, height: 70
										});
										return {
											dWidth: 70,
											dHeight: 70
										}
									}
								},
								{
									type: 'image',
									id: 'productImage',
									url: 'http://39.101.161.231/images/share_cover.png',
									dx: 0,
									dy: 70,
									serialNum: 1,
									infoCallBack(imageInfo) {
										let width;
										let height;
										if (imageInfo.width > imageInfo.height) {
											width = imageInfo.width > 700 ? 700 : imageInfo.width;
											height = width / imageInfo.width * imageInfo.height;
										} else {
											height = imageInfo.height > 700 ? 700 : imageInfo.height;
											width = height / imageInfo.height * imageInfo.width;
										}
										if (width < 500) {
											width = 500;
											height = width / imageInfo.width * imageInfo.height;
										}
										let addHeight = height * .6;
										if (addHeight < 150) addHeight = 150;
										if (addHeight > 250) addHeight = 250;
										setBgObj({
											width,
											height: height + addHeight
											// width: 700,
											// height: 200
										});
										return {
											dWidth: width,
											dHeight: height
										}
									}
								},
								// {
								// 	type: 'text',
								// 	id: 'productName',
								// 	text: '取舍',
								// 	color: '#000',
								// 	serialNum: 2,
								// 	allInfoCallback({
								// 		drawArray
								// 	}) {
								// 		console.log('allInfoCallback', 1)
								// 		const productImage = drawArray.find(item => item.id === 'productImage')
								// 		console.log('allInfoCallback', 2)
								// 		console.log('allInfoCallback getBgObj', getBgObj)
								// 		const addHeight = getBgObj().height - productImage.dHeight;
								// 		console.log('allInfoCallback', 3)
								// 		return {
								// 			size: getBgObj().width * 0.05,
								// 			lineFeed: {
								// 				maxWidth: getBgObj().width * 0.5,
								// 				lineNum: 1
								// 			},
								// 			dx: getBgObj().width * .05,
								// 			dy: productImage.dHeight + addHeight * .25,
								// 		}
								// 	}
								// },
								// {
								// 	type: 'text',
								// 	text: '棒棒哒~',
								// 	color: '#f1505c',
								// 	serialNum: 3,
								// 	allInfoCallback({
								// 		drawArray
								// 	}) {
								// 		const productImage = drawArray.find(item => item.id === 'productImage')
								// 		const addHeight = getBgObj().height - productImage.dHeight;
								// 		return {
								// 			size: getBgObj().width * 0.05,
								// 			lineFeed: {
								// 				maxWidth: getBgObj().width * 0.5,
								// 				lineNum: 1
								// 			},
								// 			dx: getBgObj().width * .05,
								// 			dy: productImage.dHeight + addHeight * .5,
								// 		}
								// 	}
								// },
								// {
								// 	type: 'text',
								// 	text: '无情哈拉少',
								// 	serialNum: 4,
								// 	allInfoCallback({
								// 		drawArray
								// 	}) {
								// 		const productImage = drawArray.find(item => item.id === 'productImage')
								// 		const addHeight = getBgObj().height - productImage.dHeight;
								// 		return {
								// 			size: getBgObj().width * 0.05,
								// 			lineFeed: {
								// 				maxWidth: getBgObj().width * 0.5,
								// 				lineNum: 1
								// 			},
								// 			dx: getBgObj().width * .05,
								// 			dy: productImage.dHeight + addHeight * .75,
								// 		}
								// 	}
								// },
								{
									type: 'image',
									id: 'productImage1',
									url: `http://39.101.161.231${codePath}`,
									dx: 0,
									dy: 486,
									sx: 0,
									sy: 0,
									// dWidth: 0.2,
									// dHeight: 0.2,
									serialNum: 2,
									infoCallBack(imageInfo) {
										let width;
										let height;
										if (imageInfo.width > imageInfo.height) {
											width = imageInfo.width > 700 ? 700 : imageInfo.width;
											height = width / imageInfo.width * imageInfo.height;
										} else {
											height = imageInfo.height > 700 ? 700 : imageInfo.height;
											width = height / imageInfo.height * imageInfo.width;
										}
										if (width < 500) {
											width = 200;
											height = width / imageInfo.width * imageInfo.height;
										}
										let addHeight = height * .6;
										if (addHeight < 150) addHeight = 150;
										if (addHeight > 250) addHeight = 250;
										// setBgObj({
										// 	width,
										// 	height: height + addHeight
										// });
										return {
											dWidth: width,
											dHeight: height
										}
									}
								},
								// {
								// 	type: 'qrcode',
								// 	text: 'https://uniapp.dcloud.io/',
								// 	serialNum: 5,
								// 	allInfoCallback({
								// 		drawArray
								// 	}) {
								// 		const productImage = drawArray.find(item => item.id === 'productImage')
								// 		const addHeight = getBgObj().height - productImage.dHeight;
								// 		const widthSize = getBgObj().width * .4;
								// 		const heightSize = addHeight;
								// 		const countSize = widthSize > heightSize ? heightSize : widthSize;
								// 		const size = countSize * .6;
								// 		return {
								// 			size: size,
								// 			dx: getBgObj().width - countSize * .95,
								// 			dy: getBgObj().height - countSize * .95
								// 		}
								// 	}
								// }
							]
						}
					})
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.posterImage = d.poster.tempFilePath;
					_this.showMask = true
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			
			init() {
				this.shareFc()
			}
		},
	}
</script>

<style lang="scss">
	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.padding1vh {
		padding: 1vh;
	}
	.poster-bg{
		display: flex;
		justify-content: center;
	}
	.posterImage {
		width: 70vw;
		position: relative;
		top: 50rpx;
	}
	
	.marginTop2vh {
		margin-top: 2vh;
	}
	
	.share_button{
		display: flex;
		margin-top: 100rpx;
		justify-content: space-around;
		padding: 0 15%;
	}
</style>
