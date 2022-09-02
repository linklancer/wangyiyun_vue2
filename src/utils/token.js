export const setToekn = (token)=>{
    localStorage.setItem('TOKEN',token)
}
export const getToken = ()=>{
  return  localStorage.getItem('TOKEN')
}
//存用户信息的account
export const setaccount = (account)=>{
  localStorage.setItem('ACCOUNT',account)
}
//取出用户信息account
export const getaccount = ()=>{
  return localStorage.getItem('ACCOUNT')
}
//存储bindings
export const setbinging = (bind)=>{
  localStorage.setItem('BINDING',bind)
}
//取出bindings
export const getbinding = ()=>{
  return localStorage.getItem('BINDING')
}
//存储profiles
export const setprofile =(profile)=>{
  localStorage.setItem('PROFILE',profile)
}
//取出profiles
export const getprofiles = ()=>{
  return localStorage.getItem('PROFILE')
}