"use strict";(self["webpackChunkselfwangyiyun"]=self["webpackChunkselfwangyiyun"]||[]).push([[62],{8062:function(s,t,i){i.r(t),i.d(t,{default:function(){return u}});var a=function(){var s=this,t=s._self._c;return t("div",{staticClass:"search-name"},[t("div",{staticClass:"total"},[this.songCount?t("span",[s._v("找到"+s._s(this.songCount)+"首歌曲")]):s._e()]),t("h1",[s._v(" 搜索 "),s.Songs[0]?t("span",[s._v(s._s(s.Songs[0].al.name)+" ")]):s._e()]),s._m(0),t("div",{staticClass:"music-list"},[t("div",{staticClass:"imglist"},[this.Songs[0]?t("img",{attrs:{src:this.Songs[0].al.picUrl}}):s._e()]),t("div",{staticClass:"detail-songer"},[s.Songs[0]?t("span",[s._v("歌单: "+s._s(s.Songs[0].al.name))]):s._e(),t("span",[s._v("歌曲 "+s._s(this.songCount)+", 播放:"+s._s(s.music.listensum)+"万")])])]),t("div",{staticClass:"menu-list"},[t("ul",s._l(s.ListTitle,(function(i,a){return t("li",{key:a,on:{click:function(t){return s.changetitle(a)}}},[s._v(" "+s._s(i)+" "),t("span",{directives:[{name:"show",rawName:"v-show",value:a==s.showline,expression:"index == showline"}],staticClass:"markline"})])})),0)]),t("div",{ref:"MYaui",staticClass:"play-total"},[s._m(1),s._m(2)]),s._m(3),t("div",{staticClass:"music-container"},s._l(this.Songs,(function(i,a){return t("ul",{directives:[{name:"show",rawName:"v-show",value:s.isshow,expression:"isshow"}],key:i.id,staticClass:"song-detail",on:{click:function(t){return s.playmusic(i)}}},[t("li",{staticClass:"li-only"},[t("span",[a<9?t("span",[s._v(" 0")]):s._e(),s._v(s._s(a+1))]),t("span",{staticClass:"iconfont icon-aixin1"}),t("span",{staticClass:"iconfont icon-xiazai"})]),i?t("li",{staticClass:"li-one"},[s._v(s._s(i.alia[0]||i.name))]):s._e(),i.ar[0]?t("li",{staticClass:"li-two"},[s._v(" "+s._s(i.ar[0].name||i.ar[1].name)+" ")]):s._e(),i?t("li",{staticClass:"li-three"},[s._v(s._s(i.al.name)+"P")]):s._e(),t("li",{staticClass:"li-four"},[s._v(s._s(s._f("durationTimeformat")(i.dt)))]),t("li",{staticClass:"li-five"})])})),0),t("div",{staticClass:"pagination"},[this.Songs?t("el-pagination",{attrs:{small:!0,background:"",layout:"prev, pager, next","page-size":30,total:this.songCount}}):s._e()],1)])},n=[function(){var s=this,t=s._self._c;return t("div",{staticClass:"intrest-text"},[t("span",[s._v("你可能感兴趣")])])},function(){var s=this,t=s._self._c;return t("div",{staticClass:"play-left"},[t("span",{staticClass:"iconfont icon-bofang1"}),t("span",[s._v("播放全部")]),t("span",{staticClass:"iconfont icon-jiahao"})])},function(){var s=this,t=s._self._c;return t("div",{staticClass:"play-right"},[t("span",{staticClass:"iconfont icon-xiazai"}),t("span",[s._v("下载全部")])])},function(){var s=this,t=s._self._c;return t("ul",{staticClass:"song-title"},[t("li",{staticClass:"li-one"},[s._v("音乐标题")]),t("li",{staticClass:"li-two"},[s._v("歌手")]),t("li",{staticClass:"li-three"},[s._v("专辑")]),t("li",{staticClass:"li-four"},[s._v("时长")]),t("li",{staticClass:"li-five"},[s._v("热度")])])}],e=i(3822),l={name:"MySearch",data(){return{ListTitle:["单曲","歌手","专辑","视频","歌单","歌词","博客","声音","用户"],showline:0,keyword:" ",music:{listensum:135},imgurl:"",isshow:!1}},created(){},methods:{playmusic(s){const{id:t}=s;this.$store.dispatch("GetMusicurl",t),this.$store.dispatch("GetMusicLyric",t),this.$store.state.music.MyAudio.autoplay=!0,this.$store.state.music.MyAudio.play(),this.$store.state.music.SongList=s},changetitle(s){this.showline=s}},computed:{...(0,e.rn)({songCount(s){return s.music.songList.songCount||10},Songs(s){return this.isshow=!0,s.music.songList.songs||{}}})},filters:{durationTimeformat:function(s){if(!s)return"00:00";let t=Math.floor(s/1e3),i=Math.floor(t/60).toString().padStart(2,"0"),a=(t%60).toString().padStart(2,"0");return`${i}:${a}`}}},o=l,c=i(1001),r=(0,c.Z)(o,a,n,!1,null,"bba9a000",null),u=r.exports}}]);