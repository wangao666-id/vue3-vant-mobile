<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    },
  },
  show: {
    type: Boolean,
    default: false,
  },
})
const router = useRouter()

const imgSrc = computed(() => {
  return `https://cdn.renliewangluo.com/course/${props.data.id}.jpg`
})

function clickItem() {
  router.push({
    path: '/classDetail',
    query: {
      img: imgSrc.value,
      title: props.data.title,
      showCard: String(props.show),
      data: JSON.stringify(props.data),
    },
  })
}
</script>

<template>
  <div>
    <div class="item-box flex" @click="clickItem">
      <!--      <div class="pic" /> -->
      <img class="pic" :src="imgSrc" alt="">
      <div class="info">
        <div style="display: flex">
          <div v-if="data.is_young"  class="xx-img" />
<!--          <span style="color: black" v-if="data.is_young">*</span>-->
          <span class="title">{{ data.title }}</span>
          <span />
        </div>
        <span class="time">{{ data.attend_time }}</span>
        <div class="item-space flex">
          <div class="flex">
            <span class="address">{{ data.location }}</span>
            <!--            <div class="tag">篮球</div> -->
            <!--            <div class="tag">浦东</div> -->
          </div>
          <van-icon class="ml-auto" name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .item-box {
  background: white;
  padding: 10px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
}

.pic {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}

.info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.title {
  font-weight: 500;
  font-size: 16px;
  color: black;
}

.time {
  color: #999;
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 230px;
}
.address {
  color: #999;
  font-size: 14px;
  margin-top: 4px;
}

.tag {
  background: rgb(91, 106, 228);
  color: #fff;
  font-size: 10px;
  padding: 3px 8px;
  box-sizing: border-box;
  border-radius: 3px;
  margin-right: 8px;
}

.ml-auto {
  color: #999;
  font-size: 14px;
}

.xx-img {
  background-image: url('@/assets/images/xx.png');
  width: 12px;
  height: 12px;
  position: relative;
  top: 1px;
  background-size: 100% 100%;
  flex-shrink: 0;
  background-repeat: no-repeat;
}

.item-space {
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>

export default {
  name: 'ClassItem',
}
