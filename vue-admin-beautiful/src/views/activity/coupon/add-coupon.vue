<!--
import { POP_SCOPE_ID } from '@vue/compiler-dom';
 * @Description: 
 * @Date: 2021-05-11 10:05:30
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-11 11:28:32
 * @FilePath: \vue-admin-beautiful\src\views\activity\coupon\add-coupon.vue
-->
<template>
  <a-modal v-model:visible="visible" title="优惠券设置" :width="800">
    <template v-slot:footer>
      <a-button key="back" @click="visible = false">取消</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
      >
        确定
      </a-button>
    </template>
    <a-form labelAlign="left">
      <a-form-item label="名称">
        <a-input placeholder="名称" v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="优惠券类型">
        <a-select
          :size="size"
          v-model:value="form.couponType"
          style="width: 200px"
        >
          <a-select-option
            v-for="(i, index) in [
              { value: 0, label: '折扣券' },
              { value: 1, label: '代金券' },
            ]"
            :value="i.value"
            :key="index"
          >
            {{ i.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="form.couponType === 0 ? '折扣力度' : '金额'">
        <a-input-number placeholder="折扣力度" v-model:value="form.allowance" />
        {{ form.couponType === 0 ? '折' : '元' }}
      </a-form-item>
      <a-form-item label="有效期">
        <a-input-number placeholder="有效期" v-model:value="form.validPeriod" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import { ref, reactive } from 'vue'
  import { createCoupon } from '@/api/coupon'
  export default {
    setup() {
      let visible = ref(false)
      let form = reactive({
        name: '',
        couponType: '',
        allowance: '',
        validPeriod: '',
      })
      const init = () => {
        visible.value = true
      }
      const handleOk = () => {
        createCoupon(form).then((res) => {
          console.dir(res)
        })
      }
      return {
        form,
        init,
        visible,
        handleOk,
      }
    },
  }
</script>
