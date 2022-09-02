import {getMusicList,getMusicUrl,getMusicLyric} from '@/api'
const state = {
  songList:{},
  SongList:{},
  musicdata:[],
  MyAudio:'',//audio的ref
  Clickduration:322,//当前歌曲总时间
  Currenttime:0, //当前播放时间
  Lyric:{},
  mask:'',//转盘的ref
  LyRic:'',//歌词的ref
  Swiper:'',//转盘上面的ref
  UlList:'',//歌词容器ref
  ListCon:'',//每句歌词
  showdeg:0 + 'deg',//指针旋转度数
  lyricIndex:0, //歌词索引
  listen: "bofang1",//播放暂停图标
  isshow:false,//控制歌词页面
  musicUrl:"http://m801.music.126.net/20220802210222/405f8cb02f09b7ad29029cf9828d8d5d/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096417088/7201/4169/7c75/e4a63c65d9acbf03940d32540d1996e2.mp3"
}
const mutations ={
  //得到搜索音乐
  GETSEARCHMUSIC(state,songLisst){
    state.songList = songLisst || {}
  },
  GETMUSICURL(state,musicdata){
    if(musicdata){
        state.musicdata = musicdata
        state.musicUrl = musicdata[0].url
    }
  },
  //存取audio属性
  LOCATIONAUDIO(state,refaudio){
    state.MyAudio = refaudio
     
  },
  //存取时间
  LOCTIONTINE(state){
     state.Clickduration = state.MyAudio.duration
     state.Currenttime = state.MyAudio.currentTime
  },
  //获取歌词
  GETMUSICLYRIC(state,Lyric){
    state.Lyric = Lyric

  }
}
const actions ={
  //搜索音乐
 async getsearchmusic(context,data){
  const  {keyword,limit,offset,type} = data
  let result = await getMusicList( keyword,limit,offset,type)
  console.log(result)
     if(result.code == 200){
      //console.log(result)
      context.commit('GETSEARCHMUSIC',result.result)
     }
  },
  //获取音乐url
  async GetMusicurl(context,id){
    let result = await  getMusicUrl(id)
    if(result.code == 200){
     // console.log(result.data)
      context.commit('GETMUSICURL',result.data)
      return 'ok'
    } else{
      return Promise.reject(new Error(fail))
    }
  },
  //获取歌词
  async GetMusicLyric(context,id){
    let result = await getMusicLyric(id)
      if(result.code == 200){
        context.commit('GETMUSICLYRIC',result)
        return 'ok'
      }else{
        return Promise.reject(new error('fail'))
      }
  },
}
const getters={
  songList(state){
    if( !(JSON.stringify(state.songList) === '{}')){
      return  state.songList 
    }
      
  },
  songs(state){
    if(  !(JSON.stringify(state.songList) === '{}') ){
      return state.songList.songs 
    }
  },
  urldata(state){
    return state.musicUrl
    //  return state.musicdata[0].url
  },
  //计算得到处理的新歌词
  newLyric(state){

     let lyrics = state.Lyric.lrc.lyric.split("\n") //根据返回的数据，含有\n。以此拆分每一句歌词
     let ArrayLyric = new Array() //定义一个新数组
     let count = 0
     //console.log(lyrics)
     if(lyrics.length){
     lyrics.forEach(item => {
      //得到当前歌词播放时间
       let t = item.substring(item.indexOf('[') + 1,item.indexOf("]"))
       ArrayLyric.push({
        time: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
        words: item.substring(item.indexOf("]") + 1,item.length),
        index:count
       })
       count++
     })
    // console.log(ArrayLyric)
     return ArrayLyric
    }else{
       return  []
    }
    
  }
    
}
export default{
    state,
    mutations,
    actions,
    getters
}
