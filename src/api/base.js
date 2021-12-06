import axios from '../utils/server'

// 轮播图获取
export const getSwiperUrl = () => {
  return axios({
    method: 'get',
    url: '/home/swiper'
  })
}

// 租房小组数据
export const getRendGroups = () => {
  return axios({
    method: 'get',
    url: '/home/groups'
  })
}
// 最新资讯
export const getNewsList = () => {
  return axios({
    method: 'get',
    url: '/home/news'
  })
}

// 当前城市信息
export const getLocalCity = (name) => {
  return axios({
    method: 'get',
    url: '/area/info',
    params: {
      name
    }
  })
}
// 获取所有城市信息
export const getAllCityInfo = (level) => {
  return axios({
    method: 'get',
    url: '/area/city',
    params: {
      level,
    }
  })
}
// 获取热门城市
export const getHotCity = () => {
  return axios({
    method: 'get',
    url: '/area/hot',
  })
}

// 地图找房 房源信息
export const getHouseInfo = (id) => {
  return axios({
    method: 'get',
    url: '/area/map',
    params: {
      id,
    }
  })
}