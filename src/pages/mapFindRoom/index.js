import React from 'react'
import './index.scss'
import { NavBar } from 'antd-mobile'
import { getHouseInfo } from '@/api/base'
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255,0,0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255,255,255)',
  textAlign: 'center'
}

export default class MapFindRoom extends React.Component {
  // 渲染覆盖物
  async renderOverlays(id) {
    let res = await getHouseInfo(id)
    let { nextZoom, type } = this.getTypeAndZoom()
    res.body.forEach(item => {
      this.createOverlays(item, nextZoom, type)
    })
  }
  // 获取地图级别 和 覆盖物类型
  getTypeAndZoom() {
    let zoom = this.map.getZoom()
    let nextZoom, type
    if (zoom === 11) {
      nextZoom = 13
      type = 'circle'
    } else if (zoom === 13) {
      nextZoom = 15
      type = 'circle'
    } else {
      nextZoom = 15
      type = 'rect'
    }
    return {
      nextZoom,
      type,
    }
  }
  // 创建覆盖物
  createOverlays(data, nextZoom, type) {
    const { coord: { latitude, longitude }, count, label, value } = data
    const areaPoint = new window.BMap.Point(longitude, latitude)
    if (type === 'circle') {
      this.createCircle(areaPoint, label, value, count, nextZoom)
    } else {
      this.createRect(areaPoint, label, value, count,)
    }
  }
  // 创建区、镇覆盖物
  createCircle(areaPoint, label,value, count, nextZooom) {
    const opts = {
      position: areaPoint,
      offset: new window.BMap.Size(-35, -35)
    }
    let LabelDeo = new window.BMap.Label('', opts);
    LabelDeo.id = value
    LabelDeo.setContent(`
      <div class='bubble'> 
        <p class='name'>${label}</p>
        <p>${count}套</p>
      </div>
      `)
    LabelDeo.setStyle({
      labelStyle
    });
    LabelDeo.addEventListener('click', (e) => {
      this.map.centerAndZoom(areaPoint, nextZooom)
      // 解决清除标注报错error
      setTimeout(() => {
        this.map.clearOverlays()
        this.renderOverlays(LabelDeo.id)
      }, 0)
    })
    this.map.addOverlay(LabelDeo)
  }
  // 创建社区覆盖物
  createRect( areaPoint, label, value, count) {
    console.log(label)
    const opts = {
      position: areaPoint,
      offset: new window.BMap.Size(-50, -28)
    }
    let LabelDeo = new window.BMap.Label('', opts);
    LabelDeo.id = value
    LabelDeo.setContent(`
    <div class='rect'> 
    <span class='housename'>${label}</span>
    <span class='housenum'>${count}套</span>
    <i class='arrow'></i>
  </div>
      `)
    LabelDeo.setStyle({
      labelStyle
    });
    LabelDeo.addEventListener('click', (e) => {
      console.log(e)
    })
    this.map.addOverlay(LabelDeo)
  }
  // 初始化地图
  initMap() {
    let { label, value } = JSON.parse(localStorage.getItem('currentCity'))
    const map = new window.BMap.Map("container");
    this.map = map
    const myGeo = new window.BMap.Geocoder()
    myGeo.getPoint(label, (point) => {
      if (point) {
        map.centerAndZoom(point, 11)
        // 开启鼠标滚动缩放地图
        // map.enableScrollWheelZoom()  
        map.addControl(new window.BMap.ScaleControl())
        map.addControl(new window.BMap.NavigationControl())

        this.renderOverlays(value)

        getHouseInfo(value).then(res => {
          res.body.forEach(item => {
            const { coord: { latitude, longitude }, count, label, value } = item
            const areaPoint = new window.BMap.Point(longitude, latitude)
          
            const opts = {
              position: areaPoint,
              offset: new window.BMap.Size(-35, -35)
            }
            let LabelDeo = new window.BMap.Label('', opts);
            LabelDeo.id = value
            LabelDeo.setContent(`
              <div class='bubble'> 
                <p class='name'>${label}</p>
                <p>${count}套</p>
              </div>
              `)
              LabelDeo.setStyle({
                labelStyle
              });
            LabelDeo.addEventListener('click', (e) => {
              map.centerAndZoom(areaPoint, 13)
              // 解决清除标注报错error
              setTimeout(() => {
                map.clearOverlays()
                this.renderOverlays(LabelDeo.id)
              }, 0)
            })
            map.addOverlay(LabelDeo)
          })
        })

        // map.addOverlay( new window.BMap.Marker(point))
      }
    }, label)
    // const point = new window.BMap.Point(116.404, 39.915);
    // map.centerAndZoom(point, 15); 
  }
  componentDidMount() {
    this.initMap()
  }
  render() {
    return (
      <div className='map'>
        <NavBar style={{ backgroundColor: '#f4f4f4', marginTop: '-45px' }} onBack={() => this.props.history.push('/home')}>地图找房</NavBar>
        <div id='container'></div>
      </div>
    )
  }
}