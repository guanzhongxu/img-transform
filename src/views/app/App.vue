<template>
	<NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
		<n-message-provider>
			<router-view />
		</n-message-provider>
	</NConfigProvider>
</template>
<script setup lang="ts">
import { NConfigProvider } from "naive-ui";
import { zhCN, dateZhCN } from "naive-ui";
import useSize from "views/app/hooks/useSize.ts";
import "views/app/hooks/useInitStyle.ts";
import "views/app/hooks/useSize.ts";
useSize();
</script>

<style scoped lang="stylus">
#app
  > .n-config-provider
    width 100%
    height 100%
</style>
