'use strict';

module.exports = app => {
    const { router, controller } = app;
    // 预支付
    router.post('/weapp/prepaid', controller.pay.prepaid);
    // 预支付回调
    router.post('/weapp/prepaidCb', controller.pay.prepaidCb);
    // 根据客户端生成的订单号查询
    router.get('/weapp/getTrade_noDetail', controller.pay.getTrade_noDetail);
}