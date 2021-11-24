import React, { useEffect} from 'react'
import {NavBar} from 'antd-mobile'
import {useHistory} from 'react-router-dom'
import { getAllCityInfo, getHotCity , getLocalCity} from '@/api/base'
 function CityList() {
  const history = useHistory()
  let cityArray = []
  let hotCity = []
  let currentCity = ''
  useEffect( () => {
    const myCity = new window.BMap.LocalCity()
    myCity.get( async res => {
      let result = await  getLocalCity(res.name.slice(0, 2))
      currentCity = result.body.label
    })
    getHotCity().then( res => {
      hotCity = res.body
    })
    getAllCityInfo(1).then( res => {
      cityArray = res.body
    })
  }, [])
 
  return (
    <div style={ { backgroundColor: '#ffffff', height: '100vh'}}>
      <NavBar style={ {backgroundColor: '#f4f4f4'}} onBack={ () => history.push('/home')}>城市选择</NavBar>
      <div>
        <span>当前定位</span>
      </div>
    </div>
  )
}
export default React.memo(CityList)