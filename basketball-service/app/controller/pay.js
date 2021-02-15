'use strict';

const Controller = require('../core/base_controller');

class PayController extends Controller {
    // 预支付
    async prepaid() {
        const { ctx } = this;
        const result = await ctx.curl('https://admin.xunhuweb.com',{
            method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'json',
            dataType: 'json',
            data: ctx.request.body,
          }) || {};
        console.log(result)
        this.success(result);
    }

    // 预支付回调
    async prepaidCb () {
        const { ctx } = this;
        if(ctx.return_code === 'success') {
            // 写入订单数据表
            let {order_id, transaction_id, status} = ctx.body
        }
    }
}
module.exports = PayController
;