import React, { useEffect, useState } from 'react'
import SwiperList from '@/compontents/swiper/index'
import myContextContext from '@/utils/createContext'
import { getSwiperUrl, getRendGroups, getNewsList, getLocalCity } from '@/api/base'
import url from '@/const/url'
import NavGiat from '@/compontents/navgiat/index'
import TabBarList from '@/compontents/tabBar/index'
import RentGroups from '@/compontents/rentGroups/index'
import Newest from './child/newest'
function Home() {
  let [imgUrl, setImgUrl] = useState([])
  let [rentGroupsList, setRentGroupsList] = useState([])
  let [newsList, setNewsList] = useState([])
  let [city, setCity] = useState('')
  useEffect(() => {
    const myCity = new window.BMap.LocalCity()
    myCity.get( async res => {
      let result = await  getLocalCity(res.name.slice(0, 2))
      setCity(result.body.label)
    })
    getSwiperUrl().then(res => {
      res.body.forEach(item => {
        item.imgSrc = url + item.imgSrc
      })
      setImgUrl(res.body)
    })
    getRendGroups().then(res => {
      res.body.forEach(item => {
        item.imgSrc = url + item.imgSrc
      })
      setRentGroupsList(res.body)
    })
    getNewsList().then(res => {
      res.body.forEach(item => {
        item.imgSrc = url + item.imgSrc
      })
      setNewsList(res.body)
    })
  }, [])
  return (
    <div className='paddBtm'>
      <myContextContext.Provider value={{
        imgUrl,
        rentGroupsList,
        newsList,
        city
      }}>
        <TabBarList></TabBarList>
        <SwiperList></SwiperList>
        <NavGiat></NavGiat>
        <RentGroups></RentGroups>
        <Newest></Newest>
      </myContextContext.Provider>
    </div>
  )
}
export default React.memo(Home) 