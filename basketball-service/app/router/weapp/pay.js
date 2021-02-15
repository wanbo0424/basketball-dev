'use strict';

module.exports = app => {
    const { router, controller } = app;
    router.post('/weapp/prepaid', controller.pay.prepaid);
    router.post('/weapp/prepaidCb', controller.pay.prepaidCb);
}