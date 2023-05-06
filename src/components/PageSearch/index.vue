<template>
  <div class="page-seach-container" @click.stop>
    <el-popover :visible="isShowRes" v-if="isSeach" width="auto">
      <template #reference>
        <el-input
          ref="inputRef"
          v-model.trim="searchValue"
          @input="onInputChange"
          @click.stop
        >
          <template #suffix>
            <SvgIcon
              icon="my-seach"
              @click="onIptBlur"
              :title="$t('PageSearch.index.961440-0')"
            ></SvgIcon>
          </template>
        </el-input>
      </template>
      <!-- 搜索结果 -->
      <template #default>
        <ul class="search-list" @click.stop>
          <li v-for="item of resList" :key="item.item.path">
            <router-link :to="item.item.path">{{
              item.item.title
            }}</router-link>
          </li>
          <li v-show="!resList.length">
            {{ $t('PageSearch.index.961440-1') }}
          </li>
        </ul>
      </template>
    </el-popover>
    <SvgIcon
      v-else
      icon="my-seach"
      @click="onSeach"
      :title="$t('PageSearch.index.961440-2')"
    ></SvgIcon>
  </div>
</template>
<script setup>
import { ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import getFuse from './fuse'
const store = useStore()
const routes = store.getters.routes
const fuse = getFuse(routes)
const isSeach = ref(false)
const inputRef = ref({})
const searchValue = ref('')
const resList = ref([])
const isShowRes = ref(false)
// 点击搜索按钮
function onSeach() {
  isSeach.value = true
  nextTick(() => {
    inputRef.value.focus()
  })
  // 点击页面其他部分时，也关闭搜索框
  // 点击搜索框时，需要阻止事件冒泡
  document.addEventListener('click', onIptBlur)
}
// 关闭输入框
function onIptBlur() {
  isSeach.value = false
  isShowRes.value = false
  searchValue.value = '' // 清空输入
  document.removeEventListener('click', onIptBlur)
}
// 输入内容改变
function onInputChange(value) {
  isShowRes.value = true
  resList.value = fuse.value.search(value)
}
</script>
<style lang="scss">
//el-popover元素被element-plus注入到了最外层的html中想要修改其插槽元素(.search-list)的样式则不能声明scoped

.page-seach-container {
  display: flex;
}
.search-list {
  width: 100%;
  font-size: 1.2em;
  li {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid gainsboro;
    margin-bottom: 5px;
  }
}
</style>
