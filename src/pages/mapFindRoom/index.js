import React from 'react'
import './index.scss'
import { NavBar, Toast } from 'antd-mobile'
import { getHouseInfo, getHouseList } from '@/api/base'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import url from '@/const/url'
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
  state = {
    isShow: false,
    isTag: true,
    isTag1: true,
    isTag2: false,
    isTag3: false,
    houseList: []
  }
  // 渲染覆盖物
  async renderOverlays(id) {
    Toast.show({
      icon: 'loading',
      content: '数据加载中....',
      duration: 0,
      maskClickable: false
    })
    let res = await getHouseInfo(id)
    Toast.clear()
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
  createCircle(areaPoint, label, value, count, nextZooom) {
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
  // 获取小区房源数据列表
  async getHousesList(id) {
    Toast.show({
      icon: 'loading',
      content: '数据加载中....',
      duration: 0,
      maskClickable: false
    })
    let params = {
      cityId: id,
    }
    const res = await getHouseList(params)
    Toast.clear()
    this.setState({
      houseList: res.body.list,
      isShow: true
    })
  }
  // 创建社区覆盖物
  createRect(areaPoint, label, value, count) {
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
      this.getHousesList(value)
      const target = e.changedTouches[0]
      this.map.panBy(
        window.innerWidth / 2 - target.clientX,
        ( window.innerHeight - 330) / 2 - target.clientY
      )
    })
    this.map.addOverlay(LabelDeo)
  }
  // 渲染房屋列表数据
  renderHouseList() {
    return  this.state.houseList.map( (item,index) => <div  key={index} className='house'>
    <div className='imgWrap'>
      <img
        className='img'
        src={url+item.houseImg}
        alt=''
      ></img>
    </div>
    <div className='content'>
      <h3 className='title'>
        {item.title}
      </h3>
      <div className='desc'>{item.desc}</div>
      <div>
        {item.tags.map( (item2,index2) => <span key={index2} className={classNames({
          tag: true,
          tag1: index2 === 1,
          tag2: index2 === 2,
          tag3: index2 === 3
        })}>
          {item2}
        </span>)}
      </div>
      <div className='price'>
      <span className='priceNum'>{item.price}</span> 元/月
      </div>
    </div>
  </div>)
  }
  // 初始化地图
  initMap() {
    let { label, value } = JSON.parse(localStorage.getItem('currentCity'))
    const map = new window.BMap.Map("container");
    // 添加地图移动事件
    map.addEventListener('movestart', () => {
      if(this.state.isShow) this.setState({
        isShow: false
      })
    })
    this.map = map
    const myGeo = new window.BMap.Geocoder()
    myGeo.getPoint(label, (point) => {
      if (point) {
        map.centerAndZoom(point, 11)
        // 开启鼠标滚动缩放地图
        map.enableScrollWheelZoom()  
        // map.addControl(new window.BMap.ScaleControl())
        // map.addControl(new window.BMap.NavigationControl())

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

        <div className={classNames({
          houseList: true,
          show: this.state.isShow
        })}>
          <div className='titleWrap'>
            <h1 className='listTitle'>房屋列表</h1>
            <Link className='titleMore' to='/home/list'>
              更多房源
            </Link>
          </div>
          <div className='houseItems'>
            {this.renderHouseList()}
          </div>
        </div>
      </div>
    )
  }
}