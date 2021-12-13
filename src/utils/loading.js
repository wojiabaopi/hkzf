import { Toast } from 'antd-mobile'

export const LoadingShow = () => {
  Toast.show({
    icon: 'loading',
    content: '数据加载中....',
    duration: 0,
    maskClickable: false
  })
}
export const LoadingHide = () => {
  Toast.clear()
}