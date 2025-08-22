<script setup lang="ts">
import {
  userList,
  // userSearch,
} from '@/api/user'
import ClassItem from '@/components/classItem.vue'

defineOptions({ name: 'Home' })

const searchValue = ref('')

const classTitle = ref('')

const itemRef = ref(null)
const addressRef = ref(null)

const dayOptions = [
  {
    text: '周一',
    value: '周一',
  },
  {
    text: '周二',
    value: '周二',
  },
  {
    text: '周三',
    value: '周三',
  },
  {
    text: '周四',
    value: '周四',
  },
  {
    text: '周五',
    value: '周五',
  },
  {
    text: '周六',
    value: '周六',
  },
  {
    text: '周日',
    value: '周日',
  },
]
const searchList = ref([])
const qu = ref('区域')
const ke = ref('全部课程')

const classOptions = [
  { text: '选修', value: 1 },
  { text: '系列', value: 2 },
]

// const value1 = ref(0)
const classValue = ref<string | number>('')
const selDay = ref([])

function clickItem(k) {
  selDay.value = []
  selDay.value.push(k)

  // if (selDay.value.includes(k)) {
  //   selDay.value.splice(selDay.value.indexOf(k), 1)
  // }
  // else {
  //   selDay.value.push(k)
  // }
}

const boxRef = ref(null)

// onActivated(() => {
//   console.log('激活')
// })

// onDeactivated(() => {
// //   // 获取页面的垂直滚动距离
// //   const scrollPosition = boxRef.value.scrollTop
// //   console.log('页面滚动距离：', boxRef.value)
// // })

const classRef = ref(null)

const addressValue = ref('')

const list = ref([])
const typeRef = ref(null)
const loading = ref(false)
const finished = ref(false)
const location = ref('')
const typeValue = ref('')
const type = ref('类型')

// async function inputSearch() {
//   if (!searchValue.value) {
//     searchList.value = []
//     return
//   }
//   try {
//     const params = {
//       search: searchValue.value,
//     }
//     const { data } = await userSearch(params)
//     searchList.value = data
//   }
//   catch (e) {
//
//   }
// }

watch(() => searchValue.value, (newValue) => {
  if (!newValue) {
    searchList.value = []
  }
}, {
  immediate: true,
  deep: true,
})

function clearInput() {
  ke.value = '全部课程'
  clearData()
}

const page = ref(1)

function changeClass() {
  page.value = 1
  list.value = []
  onLoad()
}

const showCard = ref(false)

async function onLoad() {
  try {
    const params = {
      search: searchValue.value, // 输入框搜索
      course_type: classValue.value === '' ? '' : classValue.value === '选修' ? 1 : 2, // 1选修 2系列
      page: page.value, // 页码
      week: selDay.value, // 周几
      location: location.value, // 地点d
    }
    const res = await userList(params)
    showCard.value = res.is_show
    if (res && res?.list.data) {
      list.value = [...list.value, ...res.list.data] // 追加新数据
      loading.value = false
      if (res.list.current_page >= res.list.last_page) {
        finished.value = true // 没有下一页了
      }
      else {
        page.value++ // 继续加载下一页
      }
    }
  }
  catch (e) {
  }
}

const timeDay = ref('时间')

function onConfirm() {
  itemRef.value.toggle()
  timeDay.value = selDay.value[0]
  page.value = 1
  list.value = []
  onLoad()
  // 或者
  // itemRef.value.close();
}

function clickSearchValue(v) {
  searchValue.value = v
  searchList.value = []
  list.value = []
  page.value = 1
  onLoad()
}

function onSearch() {
  searchList.value = []
  list.value = []
  page.value = 1
  onLoad()
}

const cascaderValue = ref('')

// const show = ref(false)

function onFinish({ selectedOptions }) {
  searchValue.value = removeTownOrStreet(selectedOptions.at(-1).text)
  classRef.value.toggle()
  ke.value = selectedOptions.at(-1).text
  page.value = 1
  list.value = []
  onLoad()
}

// function onAddressFinish({selectedOptions}) {
//   console.log('dwwdwd',selectedOptions.at(-1).text);

//   if (selectedOptions.at(-1).text === '陆家嘴金融城') {
//     location.value = '金融城'
//   } else {
//     location.value = removeTownOrStreet(selectedOptions.at(-1).text)
//   }
//   qu.value = selectedOptions.at(-1).text
//   addressRef.value.toggle()
//   page.value = 1
//   list.value = []
//   onLoad()
// }

function onFinishType({ selectedOptions }) {
  classValue.value = removeTownOrStreet(selectedOptions.at(-1).text)
  type.value = selectedOptions.at(-1).text
  typeRef.value.toggle()
  page.value = 1
  list.value = []
  onLoad()
}

function removeTownOrStreet(text) {
  return text.replace(/镇|街道/g, '')
}

const allOptions = [
  {
    text: '职业发展类',
    value: '001',
    children: [

      { text: 'AI办公', value: '0010' },
      { text: '无人机', value: '0013' },
      { text: '摄影摄像新媒体', value: '0011' },
      { text: '创业', value: '0012' },
      { text: '求职', value: '0014' },
      {
        text: '直播',
        value: '0015',
      },

      { text: '美妆美甲', value: '0016' },
      { text: '办公技能', value: '0017' },
      // { text: '面试技巧', value: '0018' },

      { text: '职场心理', value: '0019' },
      { text: '语言', value: '0020' },
      {
        text: '演讲',
        value: '0021',
      },
      { text: '思维能力', value: '0022' },
      // { text: '职场礼仪', value: '0023' },
    ],
  },
  {
    text: '文体艺术类',
    value: '002',
    children: [
      { text: '舞蹈', value: '0021' },
      { text: '乐器', value: '0022' },
      {
        text: '瑜伽',
        value: '0023',
      },
      { text: '球类运动', value: '0024' },
      // {text: '其他艺术', value: '其他运动'},
      // {text: '棋类', value: '0026'},
      //   {
      //   text: '球类运动',
      //   value: '0027',
      // },
      //   {
      //   text: '书法',
      //   value: '00294',
      // },
      {
        text: '皮划艇',
        value: '0028',
      },
      {
        text: '绘画',
        value: '00291',
      },
      // {
      //   text: '其他运动',
      //   value: '00292',
      // },
      //   {
      //   text: '瑜伽普拉提',
      //   value: '00293',
      // },
      {
        text: '声乐',
        value: '00294',
      },
      {
        text: '艺术鉴赏',
        value: '00295',
      },
      {
        text: '书法',
        value: '00296',
      },
      {
        text: '体育',
        value: '00297',
      },
      {
        text: '朗诵',
        value: '00298',
      },
      {
        text: '健身',
        value: '00299',
      },
      {
        text: '形体形象',
        value: '002910',
      },
      {
        text: '棋类（智力运动）',
        value: '002911',
      },
    ],
  },
  {
    text: '形势政策类',
    value: '003',
    children: [
      { text: '行业/行业讲座', value: '0031' },
      { text: ' 政策/政策解读', value: '0032' },
      {
        text: '普法',
        value: '0033',
      },
      // { text: '政策', value: '0034' },
      // {text: '理论', value: '0035'}
    ],
  },
  {
    text: '社会融入类',
    value: '004',
    children: [
      { text: '茶艺', value: '0041' },
      { text: '情绪', value: '0043' },
      { text: '调酒', value: '0044' },
      { text: '花艺', value: '0045' },
      { text: '咖啡拉花', value: '0046' },
      {
        text: '疗愈',
        value: '0047',
      },
      {
        text: '手作',
        value: '00491',
      },
      { text: '瘦身', value: '00495' },
      { text: '戏剧', value: '00492' },
      { text: '中医养生', value: '00493' },
      { text: '收纳', value: '00494' },
      { text: '烘焙', value: '00495' },
      { text: '宠物', value: '00496' },
      { text: '服装设计', value: '00497' },
      { text: '其他', value: '00498' },
    ],
  },
]

function changeAddress() {
  if (location.value === '陆家嘴金融城') {
    location.value = '金融城'
  }
  qu.value = location.value
  // addressRef.value.toggle()
  page.value = 1
  list.value = []
  onLoad()
}

const allAddressOptions = [
  { text: '全部地区', value: '' },
  { text: '陆家嘴街道', value: '陆家嘴街道' },
  { text: '潍坊新村街道', value: '潍坊新村街道' },
  { text: '塘桥街道', value: '塘桥街道' },
  { text: '洋泾街道', value: '洋泾街道' },
  { text: '花木街道', value: '花木街道' },
  { text: '金杨新村街道', value: '金杨新村街道' },
  { text: '沪东新村街道', value: '沪东新村街道' },
  { text: '浦兴路街道', value: '浦兴路街道' },
  { text: '上钢新村街道', value: '上钢新村街道' },
  { text: '南码头路街道', value: '南码头路街道' },
  { text: '周家渡街道', value: '周家渡街道' },
  { text: '东明路街道', value: '东明路街道' },
  { text: '南汇新城镇', value: '南汇新城镇' },
  { text: '川沙新镇', value: '川沙新镇' },
  { text: '祝桥镇', value: '祝桥镇' },
  { text: '金桥镇', value: '金桥镇' },
  { text: '曹路镇', value: '曹路镇' },
  { text: '张江镇', value: '张江镇' },
  { text: '合庆镇', value: '合庆镇' },
  { text: '唐镇', value: '唐镇' },
  { text: '高桥镇', value: '高桥镇' },
  { text: '高东镇', value: '高东镇' },
  { text: '高行镇', value: '高行镇' },
  { text: '三林镇', value: '三林镇' },
  { text: '北蔡镇', value: '北蔡镇' },
  { text: '康桥镇', value: '康桥镇' },
  { text: '周浦镇', value: '周浦镇' },
  { text: '航头镇', value: '航头镇' },
  { text: '新场镇', value: '新场镇' },
  { text: '宣桥镇', value: '宣桥镇' },
  { text: '惠南镇', value: '惠南镇' },
  { text: '老港镇', value: '老港镇' },
  { text: '万祥镇', value: '万祥镇' },
  { text: '大团镇', value: '大团镇' },
  { text: '泥城镇', value: '泥城镇' },
  { text: '书院镇', value: '书院镇' },
]

// const allAddressOptions = [
//   // {
//   //   text: '区级青年夜校',
//   //   value: '000',
//   // },
//   {
//     text: '张江科学城片区',
//     value: '001',
//     children: [{text: '张江镇', value: '0010'},
//       {text: '周浦镇', value: '0011'},
//       {
//       text: '康桥镇 ',
//       value: '0012',
//     }, {text: '唐镇', value: '0013'},
//       // {text: '新场镇', value: '0014'}
//     ],
//   },
//   {
//     text: '自贸区金桥片区',
//     value: '002',
//     children: [
//       // {text: '沪东新村街道', value: '0020'},
//       // {text: '金杨新村街道', value: '0021'},
//       {
//       text: '金桥集团',
//       value: '0022',
//     },
//       {text: '金桥镇', value: '0023'}],
//   },
//   {
//     text: '国际旅游度假区',
//     value: '003',
//     children: [{text: '川沙新镇', value: '0030'},
//       // {text: '合庆镇', value: '0031'},
//       {
//       text: '曹路镇 ',
//       value: '0032',
//     },
//       // {text: '祝桥镇', value: '0033'}
//     ],
//   },
//   {
//     text: '自贸区世博片区',
//     value: '004',
//     children: [
//       // {text: '三林镇', value: '0040'},
//       // {text: '上钢新村街道', value: '0041'},
//       {
//       text: '南码头路街道',
//       value: '0042',
//     },
//     //   {text: '周家渡街道', value: '0043'},
//       {text: '东明路街道', value: '0044'},
//       {text: '北蔡镇', value: '0045'}],
//   },
//   {
//     text: '自贸区陆家嘴片区',
//     value: '005',
//     children: [
//       {text: '陆家嘴街道', value: '0050'},
//     //   {
//     //   text: '陆家嘴金融城',
//     //   value: '0100',
//     // },
//     //   {text: '潍坊新村街道', value: '0051'},
//       {
//       text: '塘桥街道 ',
//       value: '0052',
//     },
//       {text: '花木街道', value: '0053'},
//       // {text: '洋泾街道', value: '0054'}
//     ],
//   },
//   {
//     text: '自贸区临港新片区',
//     value: '006',
//     children: [
//       {text: '惠南镇', value: '0060'},
//       // {text: '书院镇 ', value: '0061'},
//       {
//       text: '泥城镇 ',
//       value: '0062',
//     },
//       {text: '万祥镇', value: '0063'}
//     ],
//   },
//   {
//     text: '自贸区保税区',
//     value: '007',
//     children: [
//       {text: '高桥镇', value: '0070'},
//       {text: '高行镇', value: '0071'},
//       {
//       text: '高东镇 ',
//       value: '0072',
//     }
//     ],
//   },
//   {
//     text: '乡村振兴联盟',
//     value: '008',
//     children: [
//       {text: '航头镇', value: '0080'},
//       // {text: '宣桥镇', value: '0081'},
//     //   {
//     //   text: '大团镇',
//     //   value: '0082',
//     // }, {
//     //   text: '惠南镇',
//     //   value: '0083',
//     // },
//       {
//       text: '老港镇',
//       value: '0084',
//     }],
//   },

// ]

function closeClass() {
  searchValue.value = ''
  classRef.value.toggle()
  ke.value = '全部课程'
  addressValue.value = ''
  classTitle.value = ''
  clearData()
}

// function closeAddress() {
//   addressRef.value.toggle()
//   qu.value = '区域'
//   cascaderValue.value = ''
//   location.value = ''
//   clearData()
// }

function reset() {
  selDay.value = []
  timeDay.value = '时间'
  itemRef.value.toggle()
  page.value = 1
  list.value = []
  onLoad()
}

function closeType() {
  typeRef.value.toggle()
  type.value = '类型'
  classValue.value = ''
  typeValue.value = ''
  clearData()
}

// const handleInput = debounce(() => {
//   inputSearch()
// }, 600)
function clearData() {
  list.value = []
  searchList.value = []
  page.value = 1
  onLoad()
}

// onLoad()
</script>

<template>
  <div ref="boxRef" style="min-height: 100vh; background: white">
    <div class="top-search">
      <div class="header-title">
        招生范围：18-45周岁职业青年
      </div>
      <div style="position: relative">
        <div style="background: white" class="flex">
          <van-search
            v-model.trim="searchValue" show-action shape="round" placeholder="请输入搜索关键词"
            @clear="clearInput"
            @search="onSearch"
          >
            <template #action>
              <div @click="onSearch">
                搜索
              </div>
            </template>
          </van-search>
        </div>
        <div class="box-border">
          <van-dropdown-menu ref="menuRef">
            <van-dropdown-item
              ref="addressRef" v-model="location" :options="allAddressOptions" :title="qu"
              @change="changeAddress"
            >
              <!-- <van-cascader
                v-model="addressValue"
                title="请选区域"
                :options="allAddressOptions"
                @close="closeAddress"
                @finish="onAddressFinish"
              /> -->
            </van-dropdown-item>
            <van-dropdown-item ref="classRef" :title="ke">
              <van-cascader
                v-model="cascaderValue" title="请选择课程类型" :options="allOptions" @close="closeClass"
                @finish="onFinish"
              />
            </van-dropdown-item>
            <van-dropdown-item ref="itemRef" :title="timeDay">
              <div class="day-box">
                <div
                  v-for="item in dayOptions" class="day-item"
                  :class="[selDay.includes(item.value) ? 'sel-item' : '']" @click="clickItem(item.value)"
                >
                  {{ item.text }}
                </div>
                <div class="btn-box">
                  <van-button type="default" style="margin-right: 10px" round block @click="reset">
                    重置
                  </van-button>
                  <van-button type="primary" round block @click="onConfirm">
                    确认
                  </van-button>
                </div>
              </div>
            </van-dropdown-item>
            <van-dropdown-item ref="typeRef" :title="type" @change="changeClass">
              <van-cascader
                v-model="typeValue" title="请选择类型" :options="classOptions" @close="closeType"
                @finish="onFinishType"
              />
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>

        <!--        检索项 -->
        <div v-if="searchList.length > 0" class="search-list" @wheel.stop @touchmove.stop>
          <div
            v-for="item in searchList" :key="item.title" class="search-item" @click="clickSearchValue(item.title)"
            @wheel.stop @touchmove.stop
          >
            <van-icon name="search" />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <van-list ref="listRef" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ClassItem v-for="item in list" :key="item.title" :show="showCard" :data="item" :title="item" />
    </van-list>
  </div>
</template>

<style scoped>
  .flex {
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding: 0 6px;
}

.box-border {
  border-top: 1px solid #f5f5f5;
}

.van-search {
  width: 100%;
}

.d-wei {
  font-size: 14px;
  color: gray;
}

.day-box {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 10px;
  box-sizing: border-box;
}

.top-search {
  position: sticky;
  top: 46px;
  background: white;
  z-index: 100;
  border-bottom: 1px solid #f5f5f5;
}

.btn-box {
  width: 100%;
  display: flex;
}

.search-list {
  position: absolute;
  top: 45px;
  height: 400px;
  overflow: auto;
  background: white;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.3);
}

.header-title {
  padding: 5px 0;
  box-sizing: border-box;
  font-size: 14px;
  color: #969799;
  text-align: center;
}

.search-item {
  border-bottom: 1px solid #f5f5f5;
  font-size: 14px;
  color: black;
  padding: 8px 0;
  box-sizing: border-box;
}

.day-item {
  width: 80px;
  height: 30px;
  border-radius: 10px;
  color: #969799;
  line-height: 30px;
  text-align: center;
  background-color: #f5f5f5;
  margin-bottom: 10px;
  margin-right: 5px;
  font-size: 14px;
}

.sel-item {
  background-color: rgb(65, 135, 242);
  color: white;
}
</style>

<style>
  .van-dropdown-menu__bar {
  box-shadow: none;
}

.van-cascader__option {
  color: black;
}

.van-cascader__header {
  color: black;
}

.van-cascader__options {
  padding: 0 0 40px 0;
}

.van-dropdown-item__content {
  max-height: 90%;
}
</style>

<route lang="json5">
{
name: 'home',
meta: {
i18n: 'menus.home',
keepAlive: true,
},
}
</route>
