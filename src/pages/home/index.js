import React, { useEffect, useState } from 'react'
import SwiperList from '../../compontents/swiper/index'
import myContextContext from '../../utils/createContext'
import { getSwiperUrl, getRendGroups } from '../../api/base'
import url from '../../const/url'
import NavGiat from '../../compontents/navgiat/index'
import TabBarList from '../../compontents/tabBar/index'
import RentGroups from '../../compontents/rentGroups/index'
function Home() {
  let [imgUrl, setImgUrl] = useState([])
  let [rentGroupsList, setRentGroupsList] = useState([])
  useEffect(() => {
    getSwiperUrl().then(res => {
      res.body.forEach(item => {
        item.imgSrc = url + item.imgSrc
      })
      setImgUrl(res.body)
    })
    getRendGroups().then( res => {
      setRentGroupsList(res.body)
      console.log( res )
    })
  }, [])
  return (
    <>
      <myContextContext.Provider value={{
        imgUrl,
      }}>
        <TabBarList></TabBarList>
        <SwiperList></SwiperList>
        <NavGiat></NavGiat>
        <RentGroups></RentGroups>
      </myContextContext.Provider>
    </>
  )
}
export default Home