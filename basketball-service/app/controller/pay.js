'use strict';

const Controller = require('../core/base_controller');

class PayController extends Controller {
    // 预支付
    async prepaid() {
        const { ctx } = this;
        console.log('支付请求参数', ctx.request.body)
        const result = await ctx.curl('https://admin.xunhuweb.com/pay/mini',{
            method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'json',
            dataType: 'json',
            data: ctx.request.body,
          }) || {};
        this.success(result);
    }

    // 预支付回调
    async prepaidCb () {
        const { ctx } = this;
        console.log(ctx.request.body, '支付回调参数')
        if(ctx.request.body.return_code === 'SCCESS') {
            console.log(ctx.request.body, '支付成功回调参数')
            // 写入订单数据表
            const _id = await ctx.service.order.prepaidOrder(ctx.request.body);
            this.success(_id);
        }
    }

    // 订单列表
    async getOrderList() {
        const { ctx } = this;
        const data = await ctx.service.order.getOrderList(ctx.request.query);
        this.success(data);
    }
}
module.exports = PayController
;