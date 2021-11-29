import React, { useEffect, useState } from 'react'
import { NavBar } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import { getAllCityInfo, getHotCity, getLocalCity } from '@/api/base'

import { AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

// List data as an array of strings
// const list = Array(100).fill('我要妹子妹子妹子');

const TITLE_HEIGHT = 36
const NAME_HEIGHT = 50


function CityList() {
  const history = useHistory()
  let [currentCity, setCurrentCity] = useState('')
  let [cityArray, setCityArray] = useState({})
  let [cityIndex, setCityIndex] = useState([])

  const cityLetterFormat = (letter) => {
    switch(letter) {
      case '#': return '当前定位';
      case 'hot': return '热门城市';
      default: return letter.toUpperCase()

    }
  }
 


  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) 
  {
    let letter = cityIndex[index]
    return (
      <div key={key} style={style} className='city'>
        <div className='title'>{cityLetterFormat(letter)}</div>
        {
         cityArray[letter].map( item => <div className='name' key={item.value}> {item.label} </div>)
        }
      </div>
    );
  }
  const getRoWHeight = ({index}) => {
    return TITLE_HEIGHT + cityArray[cityIndex[index]].length * NAME_HEIGHT
  }


  const cityDataFormat = (list) => {
    let cityList = {}
    let cityIndex = []
    list.forEach( item => {
        const firstLetter = item.short.slice(0, 1)
        cityIndex.push(firstLetter)
        if (!cityList[firstLetter]) {
          cityList[firstLetter] = []
          cityList[firstLetter].push(item)
        } else {
          cityList[firstLetter].push(item)
        }
    })
    return {
      cityList,
      cityIndex
    }
  }
  useEffect(async () => {
    const myCity = new window.BMap.LocalCity()
    myCity.get(async res => {
      let result = await getLocalCity(res.name.slice(0, 2))
      setCurrentCity(result.body)
      const { body: hot } = await getHotCity()
      const { body: all } = await getAllCityInfo(1)
      const { cityList, cityIndex } = cityDataFormat(all)
      cityList['hot'] = hot
      cityList['#'] = [result.body]
      cityIndex.unshift('hot')
      cityIndex.unshift('#')
      setCityArray(cityList)
      setCityIndex(cityIndex)

    })
  
  }, [])

  return (
    <div style={{ backgroundColor: '#ffffff', height: '100%',paddingTop: '45px' }}>
      <NavBar style={{ backgroundColor: '#f4f4f4',marginTop: '-45px' }} onBack={() => history.push('/home')}>城市选择</NavBar>
      {/* <div className='cityPosition'>
        <div className='locaalPosition'>
          <span className='color-gray'>当前定位</span>
          <span className='icon1'>#</span>
        </div>
        <div className='hotPosition'>
          <span>{currentCity}</span>
          <span className='hotTitle'>热</span>
        </div>
        <div>
        </div>
      </div> */}


      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            rowCount={cityIndex.length}
            rowHeight={getRoWHeight}
            rowRenderer={rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>

    </div>
  )
}
export default React.memo(CityList)