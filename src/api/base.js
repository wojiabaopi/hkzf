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