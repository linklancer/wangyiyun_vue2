export default[
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        name:'home',
        component:()=>import('@/views/MyHome')
    },
    {
        path:'/search',
        name:'search',
        component:() =>import('@/views/MySearch')
    },
    {
        path:'/detail',
        name:'detail',
        component:
        ()=>import('@/views/MyDetail')
    }
]
   
