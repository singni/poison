webpackJsonp([3],{"3IOJ":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("IcnI"),n={data:function(){return{title:a.a.state.article.title,value:a.a.state.article.content,defaultData:"preview",markdownOption:{bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,superscript:!0,subscript:!0,quote:!0,ol:!0,ul:!0,link:!0,imagelink:!1,code:!0,table:!0,fullscreen:!1,readmodel:!1,htmlcode:!1,help:!0,undo:!1,redo:!1,trash:!0,save:!0,navigation:!0,alignleft:!0,aligncenter:!0,alignright:!0,subfield:!1,preview:!0}}},methods:{saveData:function(t,e){var i=a.a.state.article.id;console.log(t+"           -  "+this.title),t&&this.title?i?(console.log(i),this.api({url:"article/updateArticle",method:"post",data:{id:i,title:this.title,content:t}}).then(function(t){})):this.api({url:"article/addArticle",method:"post",data:{title:this.title,content:t}}).then(function(t){}):this.$message({showClose:!0,message:"请输入内容和标题",type:"error"})}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-input",{staticStyle:{"margin-top":"5px"},attrs:{placeholder:"请输入标题",clearable:""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),t._v(" "),i("mavon-editor",{staticClass:"size",attrs:{toolbars:t.markdownOption,ishljs:!0},on:{save:t.saveData},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1)},staticRenderFns:[]};var s=i("VU/8")(n,l,!1,function(t){i("Blf0")},"data-v-59b6704f",null);e.default=s.exports},Blf0:function(t,e,i){var a=i("Ikc1");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("0694772b",a,!0)},Ikc1:function(t,e,i){(t.exports=i("FZ+f")(!0)).push([t.i,"\n.size[data-v-59b6704f] {\n  width: 100%;\n  height: 800px;\n}\n","",{version:3,sources:["E:/code-source/poison/storm/src/views/article/writer.vue"],names:[],mappings:";AACA;EACE,YAAY;EACZ,cAAc;CACf",file:"writer.vue",sourcesContent:["\n.size[data-v-59b6704f] {\n  width: 100%;\n  height: 800px;\n}\n"],sourceRoot:""}])}});