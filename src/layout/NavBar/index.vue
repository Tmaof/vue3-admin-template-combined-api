<template>
  <div :class="{ 'navbar-container-fixed': settings.narBarFixed }">
    <div
      :class="{
        'navbar-container': true,
        'navbar-container-mobile': $store.getters.screenInfo.isMobile
      }"
    >
      <div class="left">
        <Transition mode="out-in">
          <SvgIcon
            hoverScale
            icon="my-menu-collapse"
            :title="$t('NavBar.index.808363-0')"
            v-if="!$store.getters.isCollapseSideBar"
            @click="setIsCollSideBar(true)"
          ></SvgIcon>
          <SvgIcon
            hoverScale
            icon="my-menu"
            :title="$t('NavBar.index.808363-1')"
            v-else
            @click="setIsCollSideBar(false)"
          ></SvgIcon>
        </Transition>
        <!-- 面包屑 -->
        <Breadcrumb
          class="breadcrumb"
          :separator="settings.narBarSeparator"
        ></Breadcrumb>
      </div>
      <div class="right">
        <ul class="shortcut">
          <li><PageSearch></PageSearch></li>
          <li>
            <LanguageSwitch
              :langList="langList"
              @langChange="changeGlobalLanguage"
            ></LanguageSwitch>
          </li>
          <li><LightDarkSwitch :normalMode="true"></LightDarkSwitch></li>
          <li>
            <ScreenFull></ScreenFull>
          </li>
          <li>
            <el-popconfirm
              :title="$t('NavBar.index.808363-2')"
              @confirm="$store.dispatch('user/logout')"
            >
              <template #reference>
                <SvgIcon
                  hoverScale
                  :title="$t('NavBar.index.808363-3')"
                  icon="my-logout"
                ></SvgIcon>
              </template>
            </el-popconfirm>
          </li>
        </ul>
        <el-avatar
          shape="circle"
          :src="$store.getters.userInfo ? $store.getters.userInfo.avatar : ''"
          fit="cover"
        >
          <SvgIcon icon="my-user"></SvgIcon>
        </el-avatar>
      </div>
    </div>
    <TagsView></TagsView>
  </div>
</template>

<script setup>
import TagsView from '@/components/TagsView'
import { useStore } from 'vuex'
import settings from '@/settings'
import Breadcrumb from '@/components/Breadcrumb'
import ScreenFull from '@/components/ScreenFull'
import LightDarkSwitch from '@/components/LightDarkSwitch'
import PageSearch from '@/components/PageSearch'
import LanguageSwitch from '@/components/LanguageSwitch'
import { langList, changeGlobalLanguage } from '@/i18n'

const store = useStore()
function setIsCollSideBar(value) {
  store.commit('layout/SET_isCollapseSideBar', value)
}
</script>

<style lang="scss" scoped>
@import '@/style/index.scss';
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.6);
}
.v-enter-to,
.v-leave-from {
  transform: scale(1);
}

.navbar-container {
  padding: 0 10px;
  height: $narBarHeight;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;

    .breadcrumb {
      margin-left: 10px;
    }
  }
  .right {
    display: flex;
    .shortcut {
      display: flex;
      margin: 0 10px;
      border-radius: 50px;
      li {
        display: flex;
        height: 100%;
        margin: 0 5px;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.navbar-container-fixed {
  position: sticky;
  top: 0;
  z-index: 999;
}
/**
移动端时，不显示面包屑
 */
.navbar-container-mobile {
  .left {
    .breadcrumb {
      display: none;
    }
  }
}
</style>
