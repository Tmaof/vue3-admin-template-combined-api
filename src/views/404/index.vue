<template>
  <div class="not-find-container">
    <div class="text">
      <div>
        <p>糟糕 没找到该页面</p>
        <p>Oops Page not found</p>
        <p>
          <router-link to="/">回到首页</router-link>
        </p>
      </div>
    </div>
    <SvgIcon class="svg" icon="my-404" :hoverScale="false"></SvgIcon>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.not-find-container {
  height: 100vh;
  width: 100vw;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
    text-align: center;
    p {
      margin: 20px 0;
      font-family: Fantasy;
      font-size: larger;
      font-weight: bold;
    }
    a {
      font-size:small;
      text-decoration-line: none;
      color: rgb(0, 110, 255);
    }
  }
  .svg {
    height: 70vh;
    width: 100%;
    :deep(svg) {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
