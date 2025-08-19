<!--
 * @Author: wangao
 * @Date: 2025-02-25 21:11:37
 * @LastEditTime: 2025-08-17 09:58:03
 * @LastEditors: wangao
 * @Description:
 * @FilePath: /vue3-vant-mobile/src/pages/classDetail/index.vue
-->
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { showToast } from 'vant'

const route = useRoute()
const showPop = ref(false)

const data = JSON.parse(route.query.data as string)
const img = route.query.img
const imgSrc = computed(() => {
  return `https://cdn.renliewangluo.com/qr/${data.id}.jpg`
})
const showCard = route.query.showCard === 'true'
function SignUp() {
  if (showCard) {
    showPop.value = true
    return
  }
  showToast('4月7日正式上线！')
}
</script>

<template>
  <div style="min-height: 92vh;width: 100vw;background: white">
    <div
      class="flex items-center justify-center"
      style="background: white;padding: 10px 0;box-sizing: border-box; border-bottom: 1px solid #f5f5f5;"
    >
      <img style="height: 160px;width: 160px;object-fit: cover" :src="img as string" alt="..">
    </div>

    <div class="title">
      {{ data.title }}
    </div>
    <van-cell title="青年夜校名称" :value="data.school_name" />
    <van-cell title="具体地址" :value="data.location" />
    <van-cell title="开办课程名称">
      <template #value>
        <div style="display: flex;align-items: center;">
<!--          <div v-if="data.is_young" class="xx-img" />-->
          <div style="font-size: 15px;text-align: left;">
            {{ data.title }}
          </div>
        </div>
      </template>
    </van-cell>
    <van-cell title="课程介绍" :value="data.course_intro" />
    <van-cell title="师资介绍" :value="data.teacher_intro" />
    <van-cell title="开课日期" :value="data.attend_time" />
    <van-cell title="课程周期" :value="`${data.course_cycle}节`" />
    <van-cell title="收费标准" :value="data.attend_desc || '--'" />
    <van-cell title="预计结课时间" :value="data.end_time" />
    <van-cell title="课次" :value="data.times" />
    <van-cell title="备注" :value="data.remark || '--'" />

    <div style="padding: 10px 10px;box-sizing: border-box; background: white">
      <van-button type="primary" style="margin-top: 20px;" size="large" @click="SignUp">
        报名
      </van-button>
    </div>

    <van-popup v-model:show="showPop" round :style="{ padding: '64px' }">
      <div class="img-box">
        <img :src="imgSrc" style="width: 180px;height: 180px;" alt="......">
        <span style="font-size: 12px;">长按识别图中的二维码，跳转报名页</span>
      </div>
    </van-popup>
  </div>
</template>

<style scoped>
.title {
  height: 80px;
  background: white;
  padding: 10px 10px;
  font-size: 20px;
  font-weight: 500;
  box-sizing: border-box;
  margin-bottom: 10px;
  color: black;
  border-bottom: 1px solid #f5f5f5;
}
.xx-img {
  background-image: url('@/assets/images/xx.png');
  width: 20px;
  height: 20px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.img-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.van-cell__title {
  width: 25%;
  flex: none;
  margin-right: 20px;
}

:deep(.van-cell__value) {
  flex: none;
  width: 60%;
  text-align: left;
}
</style>

<route lang="json5">
{
name: 'classDetail',
meta: {
},
}
</route>
