<template>
  <div>
    <el-input style="margin-top: 5px"
              placeholder="请输入标题"
              v-model="title"
              clearable>
    </el-input>
    <mavon-editor class="size" :toolbars="markdownOption"
                  :ishljs="true" v-model="value" @save="saveData"/>
  </div>
</template>

<script>
  import store from '../../store'

  export default {
    data() {
      return {
        title: store.state.article.title,
        value: store.state.article.content,
        defaultData: "preview",
        markdownOption: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: false, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: false, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: false, // 上一步
          redo: false, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: false, // 单双栏模式
          preview: true, // 预览
        }
      }
    }, methods: {
      saveData(v, r) {
        let id = store.state.article.id;
        console.log(v + "           -  " + this.title);
        if (v && this.title) {
          if (!id) {
            this.api({
              url: "article/addArticle",
              method: "post",
              data: {
                title: this.title,
                content: v
              }
            }).then((data) => {

            })

          } else {
            console.log(id);
            this.api({
              url: "article/updateArticle",
              method: "post",
              data: {
                id: id,
                title: this.title,
                content: v
              }
            }).then((data) => {

            })
          }
        } else {
          this.$message({
            showClose: true,
            message: '请输入内容和标题',
            type: 'error'
          });
        }
      }

    },
  };
</script>
<style scoped>

  .size {
    width: 100%;
    height: 800px;
  }
</style>
