import { getBannerList ,getHomeList} from "@/api"
const state={
    banners:[],
    blockdata:{},
    loginshow:false,
    personalshow:false
}
const mutations ={
    //获取轮播图数据
    GETBANNER(state,banner){
        if(banner){
             state.banners = banner
        }
       else{
        state.banner = []
       }
    },
    //获取首页数据
    GETHOMEINFO(state,blockdata){
        state.blockdata = blockdata
    }
}
const actions = {
 //获取轮播图数据
 async getbanner(context){
    let result = await getBannerList()
   if(result.code == 200){
    //console.log(result) //typeTitle,titleColor
    context.commit('GETBANNER',result.banners)
    return 'ok'
   }else{
    return Promise.reject(new Error('fail'))
   }
 },
 //获取首页信息
 async gethomeinfo(context){
  let result = await getHomeList()
  // console.log(result)
  if(result.code == 200){
    context.commit('GETHOMEINFO',result.data)
    return 'ok'
  }else{
    return Promise.reject(new Error('fail'))
  }
 }
}
const getters ={
    //推荐歌单区的数据
    Creatives(state){
        if(state.blockdata.blocks){
            return state.blockdata.blocks[1].creatives || []
        } 
    },
    //热门播客的数据
    Hotplaylist(state){
        if(state.blockdata.blocks){
            return state.blockdata.blocks[2].creatives || []
        } 
    }
   
}
export default{
    state,
    mutations,
    actions,
    getters
}
