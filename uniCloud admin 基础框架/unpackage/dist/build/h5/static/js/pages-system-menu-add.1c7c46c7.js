(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-system-menu-add","pages-demo-icons-icons"],{"00ca":function(e,a,t){"use strict";(function(e){var i=t("4ea4");t("caad"),t("d3b7"),t("2532"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i(t("5530")),l=i(t("9857")),o=i(t("fc8b")),r=t("2f62"),s=e.database();s.command;function u(e){var a={};for(var t in l.default)e.includes(t)&&(a[t]=l.default[t]);return a}var c={components:{Icons:o.default},data:function(){return{formData:{menu_id:"",name:"",icon:"",url:"",sort:null,parent_id:"",permission:[],enable:!0},rules:(0,n.default)({},u(["menu_id","name","icon","url","sort","parent_id","permission","enable"]))}},onLoad:function(e){e.parent_id&&(this.formData.parent_id=e.parent_id)},methods:(0,n.default)((0,n.default)({},(0,r.mapActions)({init:"app/init"})),{},{submitForm:function(){this.$refs.form.submit()},submit:function(e){var a=this,t=e.detail,i=t.value,n=t.errors;n||(uni.showLoading({title:"提交中...",mask:!0}),this.$request("system/menu/add",i).then((function(e){uni.showToast({title:"新增成功"}),a.init(),a.getOpenerEventChannel().emit("refreshData"),setTimeout((function(){return uni.navigateBack()}),500)})).finally((function(){uni.hideLoading()})))},showIconPopup:function(){this.$refs.iconPopup.open()}})};a.default=c}).call(this,t("a9ff")["default"])},"0549":function(e,a,t){var i=t("24fb");a=i(!1),a.push([e.i,".icon-modal-box[data-v-51242571]{padding-top:var(--top-window-height)}.icon-modal[data-v-51242571]{width:350px;background-color:#fff;height:500px;overflow-y:scroll}@media screen and (min-width:768px){.icon-modal-pc[data-v-51242571]{width:600px}}",""]),e.exports=a},"1e0d":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=["pulldown","refreshempty","back","forward","more","more-filled","scan","qq","weibo","weixin","pengyouquan","loop","refresh","refresh-filled","arrowthindown","arrowthinleft","arrowthinright","arrowthinup","undo-filled","undo","redo","redo-filled","bars","chatboxes","camera","chatboxes-filled","camera-filled","cart-filled","cart","checkbox-filled","checkbox","arrowleft","arrowdown","arrowright","smallcircle-filled","arrowup","circle","eye-filled","eye-slash-filled","eye-slash","eye","flag-filled","flag","gear-filled","reload","gear","hand-thumbsdown-filled","hand-thumbsdown","hand-thumbsup-filled","heart-filled","hand-thumbsup","heart","home","info","home-filled","info-filled","circle-filled","chat-filled","chat","mail-open-filled","email-filled","mail-open","email","checkmarkempty","list","locked-filled","locked","map-filled","map-pin","map-pin-ellipse","map","minus-filled","mic-filled","minus","micoff","mic","clear","smallcircle","close","closeempty","paperclip","paperplane","paperplane-filled","person-filled","contact-filled","person","contact","images-filled","phone","images","image","image-filled","location-filled","location","plus-filled","plus","plusempty","help-filled","help","navigate-filled","navigate","mic-slash-filled","search","settings","sound","sound-filled","spinner-cycle","download-filled","personadd-filled","videocam-filled","personadd","upload","upload-filled","starhalf","star-filled","star","trash","phone-filled","compose","videocam","trash-filled","download","chatbubble-filled","chatbubble","cloud-download","cloud-upload-filled","cloud-upload","cloud-download-filled","headphones","shop"];a.default=i},"2fc1":function(e,a,t){"use strict";var i=t("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i(t("1e0d")),l={data:function(){return{icons:n.default}},props:{tag:{type:Boolean,default:!0},fixWindow:{type:Boolean,default:!0}},methods:{setClipboardData:function(e,a){var t="uni-icons-"+a;this.tag&&"tag"===e&&(t='<view class="'+t+'"></view>'),uni.setClipboardData({data:t,success:function(e){uni.showToast({icon:"none",title:"复制 "+t+" 成功！"})},fail:function(e){uni.showModal({content:"复制 "+t+" 失败！",showCancel:!1})}})}}};a.default=l},"33c1":function(e,a,t){"use strict";t.r(a);var i=t("cac8"),n=t("4cfa");for(var l in n)"default"!==l&&function(e){t.d(a,e,(function(){return n[e]}))}(l);t("de45");var o,r=t("f0c5"),s=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"51242571",null,!1,i["a"],o);a["default"]=s.exports},"4cfa":function(e,a,t){"use strict";t.r(a);var i=t("00ca"),n=t.n(i);for(var l in i)"default"!==l&&function(e){t.d(a,e,(function(){return i[e]}))}(l);a["default"]=n.a},"527d":function(e,a,t){"use strict";var i;t.d(a,"b",(function(){return n})),t.d(a,"c",(function(){return l})),t.d(a,"a",(function(){return i}));var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("v-uni-view",[t("v-uni-view",{staticClass:"uni-header"},[t("v-uni-view",{staticClass:"uni-group"},[t("v-uni-view",{staticClass:"uni-title"},[e._v("图标（uni-icons）")]),t("v-uni-view",{staticClass:"uni-sub-title"},[e._v("点击图标即可复制图标代码")])],1)],1),t("v-uni-view",{staticClass:"uni-container"},[t("v-uni-view",{staticClass:"icons"},e._l(e.icons,(function(a){return t("v-uni-view",{key:a,staticClass:"icon-item pointer"},[t("v-uni-view",{class:"uni-icons-"+a,on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.setClipboardData("tag",a)}}}),t("v-uni-text",{staticClass:"icon-text",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.setClipboardData("class",a)}}},[e._v("uni-icons-"+e._s(a))])],1)})),1)],1)],1)},l=[]},8712:function(e,a,t){"use strict";var i=t("ebc2"),n=t.n(i);n.a},9857:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i={menu_id:{rules:[{required:!0},{format:"string"}]},name:{rules:[{required:!0},{format:"string"}]},icon:{rules:[{format:"string"}]},url:{rules:[{format:"string"}]},sort:{rules:[{format:"int"}]},parent_id:{rules:[{format:"string"}]},permission:{rules:[{format:"array"}]},enable:{rules:[{format:"bool"}]}};a.default=i},a569:function(e,a,t){var i=t("24fb");a=i(!1),a.push([e.i,"\n.icons[data-v-26399a8c]{display:flex;flex-wrap:wrap}.icon-item[data-v-26399a8c]{display:flex;width:16.6%;height:120px;font-size:30px;text-align:center;justify-content:center;align-items:center;flex-direction:column}.icon-item[data-v-26399a8c]:hover,\n.icon-item:hover .icon-text[data-v-26399a8c]{color:#007aff}.icon-text[data-v-26399a8c]{color:#99a9bf;font-size:12px;text-align:center;height:1em;line-height:1em;margin-top:15px}\n@media only screen and (max-width:500px){.icon-item[data-v-26399a8c]{width:33.3%}}\n",""]),e.exports=a},b2c2:function(e,a,t){"use strict";t.r(a);var i=t("2fc1"),n=t.n(i);for(var l in i)"default"!==l&&function(e){t.d(a,e,(function(){return i[e]}))}(l);a["default"]=n.a},cac8:function(e,a,t){"use strict";t.d(a,"b",(function(){return n})),t.d(a,"c",(function(){return l})),t.d(a,"a",(function(){return i}));var i={uniForms:t("6296").default,uniFormsItem:t("a6a9").default,uniEasyinput:t("a907").default,uniLink:t("7040").default,uniDataCheckbox:t("9309").default,uniPopup:t("87b1").default},n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("v-uni-view",{staticClass:"uni-container"},[t("uni-forms",{ref:"form",attrs:{labelWidth:"80",rules:e.rules,validateTrigger:"bind"},on:{submit:function(a){arguments[0]=a=e.$handleEvent(a),e.submit.apply(void 0,arguments)}},model:{value:e.formData,callback:function(a){e.formData=a},expression:"formData"}},[t("uni-forms-item",{attrs:{name:"menu_id",label:"标识",required:!0}},[t("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入菜单项的ID，不可重复"},model:{value:e.formData.menu_id,callback:function(a){e.$set(e.formData,"menu_id",a)},expression:"formData.menu_id"}})],1),t("uni-forms-item",{attrs:{name:"name",label:"显示名称",required:!0}},[t("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入菜单名称"},model:{value:e.formData.name,callback:function(a){e.$set(e.formData,"name",a)},expression:"formData.name"}})],1),t("uni-forms-item",{staticStyle:{"margin-bottom":"10px"},attrs:{name:"icon",label:"图标 class"}},[t("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入菜单图标css样式类名"},model:{value:e.formData.icon,callback:function(a){e.$set(e.formData,"icon",a)},expression:"formData.icon"}},[t("span",{staticStyle:{color:"#007aff",cursor:"pointer","padding-right":"10px"},attrs:{slot:"right"},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.showIconPopup.apply(void 0,arguments)}},slot:"right"},[e._v("内置图标")])]),t("uni-link",{staticClass:"uni-form-item-tips",attrs:{"font-size":"12",href:"https://uniapp.dcloud.net.cn/uniCloud/admin?id=icon-%e5%9b%be%e6%a0%87",text:"如何使用自定义图标？"}})],1),t("uni-forms-item",{attrs:{name:"url",label:"页面URL"}},[t("uni-easyinput",{attrs:{clearable:!1,placeholder:"URL为空代表是目录而不是叶子节点"},model:{value:e.formData.url,callback:function(a){e.$set(e.formData,"url",a)},expression:"formData.url"}})],1),t("uni-forms-item",{attrs:{name:"sort",label:"序号"}},[t("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入菜单序号（越大越靠后）"},model:{value:e.formData.sort,callback:function(a){e.$set(e.formData,"sort",a)},expression:"formData.sort"}})],1),t("uni-forms-item",{attrs:{name:"parent_id",label:"父菜单标识"}},[t("uni-easyinput",{attrs:{disabled:!0,clearable:!1,placeholder:"新增菜单时自动填充, 一级菜单不需要填写"},model:{value:e.formData.parent_id,callback:function(a){e.$set(e.formData,"parent_id",a)},expression:"formData.parent_id"}})],1),t("uni-forms-item",{staticStyle:{"margin-bottom":"60px"},attrs:{name:"permission",label:"权限列表"}},[t("uni-data-checkbox",{attrs:{multiple:!0,collection:"uni-id-permissions",field:"permission_name as text, permission_id as value"},model:{value:e.formData.permission,callback:function(a){e.$set(e.formData,"permission",a)},expression:"formData.permission"}}),t("v-uni-view",{staticClass:"uni-form-item-tips"},[e._v("当用户拥有以上被选中的权限时，可以访问此菜单。建议仅对子菜单配置权限，父菜单会自动包含。如不选择权限，意味着仅超级管理员可访问本菜单")])],1),t("uni-forms-item",{attrs:{name:"enable",label:"是否启用"}},[t("v-uni-switch",{attrs:{checked:e.formData.enable},on:{change:function(a){arguments[0]=a=e.$handleEvent(a),e.binddata("enable",a.detail.value)}}})],1),t("v-uni-view",{staticClass:"uni-button-group"},[t("v-uni-button",{staticClass:"uni-button",staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.submitForm.apply(void 0,arguments)}}},[e._v("提交")]),t("v-uni-navigator",{staticStyle:{"margin-left":"15px"},attrs:{"open-type":"navigateBack"}},[t("v-uni-button",{staticClass:"uni-button",staticStyle:{width:"100px"}},[e._v("返回")])],1)],1)],1),t("uni-popup",{ref:"iconPopup",staticClass:"icon-modal-box",attrs:{type:"center"}},[t("v-uni-view",{staticClass:"icon-modal icon-modal-pc"},[t("Icons",{attrs:{tag:!1,"fix-window":!1}})],1)],1)],1)},l=[]},de45:function(e,a,t){"use strict";var i=t("e59d"),n=t.n(i);n.a},e59d:function(e,a,t){var i=t("0549");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=t("4f06").default;n("1ea96a38",i,!0,{sourceMap:!1,shadowMode:!1})},ebc2:function(e,a,t){var i=t("a569");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=t("4f06").default;n("4cd38266",i,!0,{sourceMap:!1,shadowMode:!1})},fc8b:function(e,a,t){"use strict";t.r(a);var i=t("527d"),n=t("b2c2");for(var l in n)"default"!==l&&function(e){t.d(a,e,(function(){return n[e]}))}(l);t("8712");var o,r=t("f0c5"),s=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"26399a8c",null,!1,i["a"],o);a["default"]=s.exports}}]);