<template>
	<n-spin :show="loading">
		<div class="index">
			<div class="top">
				<div class="explain">
					<div class="left">
						<h6>潮种看这！</h6>
						<h6>只能是图片类型相互转换</h6>
						<h6>
							你可以将文件/文件夹拖到中间区域<br />
							放错一个你试试!!!
						</h6>
					</div>
					<div class="right">
						<img :src="nssImg" alt="" />
					</div>
				</div>
				<div class="drop" draggable="true" @dragover="dragover" @drop="drop"></div>
				<div class="tools">
					<div class="item">
						<label>图片质量</label>
						<div class="slider">
							<n-slider v-model:value="quality" :step="1" />
						</div>
					</div>
					<div class="item">
						<label>转换后的格式:</label>
						<n-space>
							<n-button v-for="i in imgType" :key="i" @click.stop="setFormatType(i)" :type="formatType === i ? 'primary' : 'default'">
								{{ i }}
							</n-button>
							<n-button type="primary" @click.stop="startTransform(inputList)">开始转换</n-button>
						</n-space>
					</div>
				</div>
			</div>
			<div class="bottom">
				<div class="left">
					<h4>
						<span>选中的图片</span>
						<n-popconfirm @positive-click="remove(true)">
							<template #trigger>
								<n-button type="error">清空</n-button>
							</template>
							是否确认要清空列表?
						</n-popconfirm>
					</h4>
					<ul class="removeScrollbar">
						<li v-for="(i, index) in inputList" :key="i">
							<div class="one">{{ i }}</div>
							<n-popconfirm @positive-click="remove(index)">
								<template #trigger>
									<n-button type="error">删除</n-button>
								</template>
								是否确认要删除?
							</n-popconfirm>
						</li>
					</ul>
				</div>
				<div class="right">
					<h4>
						<span>转换后的图片</span>
						<n-tooltip trigger="hover">
							<template #trigger>
								<n-button type="primary" @click.stop="selectOutput">{{ outputPath || "选择转换后文件储存路径" }}</n-button>
							</template>
							选择转换后文件储存路径
						</n-tooltip>

						<n-button type="error" @click.stop="clearList">清空</n-button>
					</h4>
					<ul class="removeScrollbar">
						<li v-for="i in outputList" :key="i">
							<div class="one">{{ i }}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</n-spin>
</template>

<script lang="ts" setup>
import nssImg from "./images/nss.jpeg";
import imgType from "../../../public/config/imgType.ts";
import useHandleDrop from "./hooks/useHandlerDrop.ts";
import useLoading from "views/index/hooks/useLoading.ts";
import useSize from "views/hooks/useSize.ts";
import useOutput from "views/index/hooks/useOutput.ts";
useSize();
const { setLoading, loading } = useLoading();
const { drop, dragover, inputList, remove } = useHandleDrop({ setLoading });
const { selectOutput, outputPath, startTransform, outputList, quality, setFormatType, formatType, clearList } = useOutput({ setLoading });
</script>

<style lang="stylus" scoped>

.index
  display grid
  grid-template-rows minmax(100px, 1.3fr) minmax(300px, 3fr)
  overflow hidden
  background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
  > div
    display grid
    box-sizing border-box

    &.top
      grid-template-columns repeat(3, minmax(150px, 1fr))
      background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);
      > div
        box-sizing border-box
        padding 16px
        user-select none
        &.explain
          display grid
          grid-template-columns repeat(2, minmax(75px, 1fr))

          > .left
            display grid
            grid-template-rows repeat(3, 1fr)
            background-image linear-gradient(to top, #30cfd0 0%, #330867 100%);
            background-clip text
            color transparent

            > h6
              font-size 16px
              display flex
              align-items center
              justify-content center

          > .right
            display flex
            align-items center
            justify-content center

            > img
              max-width 100%
              max-height 100%
              user-select none
        &.drop
          position: relative
          &::after
            position absolute
            content "请将文件/文件夹拖入此处"
            top 50%
            left 50%
            transform translate(-50%, -50%)
            font-size 30px
            width 100%
            text-align center
            background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color transparent
            background-clip text

        &.tools
          overflow hidden

          > .item
            width 100%
            min-height 40px
            display flex
            flex-wrap wrap

            > label
              flex none
              width 100px

            > .slider
              flex 1

            > ul
              display flex
              flex-wrap wrap
              flex 1

              > li
                min-width 60px
                height 40px

    &.bottom
      padding 16px
      display grid
      grid-template-columns 420px auto
      grid-column-gap 10px

      > div
        height 100%
        overflow hidden

        &.left
          height 100%
          overflow hidden
          border 1px solid #eee
          box-sizing border-box
          display flex
          flex-direction column
          background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
        > h4
          width 100%
          box-sizing border-box
          padding-left 8px
          flex none
          display flex
          align-items center
          justify-content space-between
          border-bottom 1px solid #000

        > ul
          width 100%
          flex 1
          overflow-y auto
          box-sizing border-box

          > li
            height 40px
            display flex
            width 100%
            justify-content space-between
            align-items center
            box-sizing border-box
            padding-left 8px
            border-bottom 1px solid #000

            > button
              width 56px
              flex none
              margin-left 8px

            > div
              flex 1

        &.right
          height 100%
          background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%);
          display flex
          flex-direction column
</style>
