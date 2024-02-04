<template>
	<div class="initPage">
		<main @keyup.enter="submit">
			<h6>请输入潮种密码</h6>
			<n-input v-model:value="password" placeholder="请输入潮种密码"></n-input>
			<n-button type="primary" @click="submit">潮种确认</n-button>
		</main>
	</div>
</template>

<script lang="ts" setup>
import router from "@/router/index.ts";

const password = ref("");
const message = useMessage();
const submit = () => {
	if (password.value === "不愧是我 我真牛逼") {
		message.success("真是你啊，潮种！");
		router.push("/index");
	} else {
		message.error("密码错误");
	}
};
</script>

<style lang="stylus" scoped>
.initPage
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  background url("./img/bg.jpg") no-repeat center center
  -webkit-background-size: 100% 100%
  background-size: 100% 100%
  > main
    width 350px
    height 300px
    border-radius 16px
    background-color rgba(255,255,255,.1)
    backdrop-filter blur(10px)
    box-sizing border-box
    display flex
    flex-direction column
    justify-content space-around
    align-items center
    padding 0 30px
    > h6
      width 100%
      text-align center
      font-size 36px
      color #fff
</style>
