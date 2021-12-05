import React from 'react'
import './index.scss'
import { NavBar } from 'antd-mobile'
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
  componentDidMount() {
    let { label, value } = JSON.parse(localStorage.getItem('currentCity'))
    const map = new window.BMap.Map("container");

    const myGeo = new window.BMap.Geocoder()
    myGeo.getPoint(label, (point) => {
      if (point) {
        map.centerAndZoom(point, 11)
        // map.enableScrollWheelZoom()  // 开启鼠标滚动缩放地图
        map.addControl(new window.BMap.ScaleControl())
        map.addControl(new window.BMap.NavigationControl())
        const opts = {
          position: point,
          offset: new window.BMap.Size(-35, -35)
        }
        const LabelDeo = new window.BMap.Label('', opts);
        LabelDeo.setContent(`
          <div class='bubble'> 
            <p class='name'>浦东</p>
            <p>99套</p>
          </div>
          `)
        LabelDeo.setStyle({
          labelStyle
        });
        LabelDeo.addEventListener('click', (e) => {
          console.log(e);

        })
        map.addOverlay(LabelDeo)
        // map.addOverlay( new window.BMap.Marker(point))
      }
    }, label)
    // const point = new window.BMap.Point(116.404, 39.915);
    // map.centerAndZoom(point, 15); 
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