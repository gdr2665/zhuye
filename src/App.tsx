import { Button, Divider, Layout, Menu } from 'tdesign-react'
import '@/App.less'
import logo from '@/assets/logo-compact.png'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import React, { useState } from 'react'
import { ThinkingProblem, Palace, SignalTower, Me, MessageEmoji } from '@icon-park/react'
import { useAppSelector } from './tools/slices'
import AuthWrapper from '@@/AuthWrapper'

import loadable from '@loadable/component'

const App: React.FC = () => {
  const {
    Content,
    Footer,
    Aside
  } = Layout
  const { MenuItem } = Menu
  const navigate = useNavigate()
  // const dispatch = useAppDispatch()
  const logon = useAppSelector((state) => state.user.logon)
  // const logout = () => {
  //   void Axios.get('/user/logout')
  //   dispatch(setLogout())
  //   void MessagePlugin.success('登出成功！')
  //   navigate('/', { replace: true })
  // }
  // TODO 移入用户主页

  const Ask = loadable(() => import('@/pages/Ask'))
  const Explore = loadable(() => import('@/pages/Explore'))
  const Square = loadable(() => import('@/pages/Square'))
  const Report = loadable(() => import('@/pages/Report'))
  const Login = loadable(() => import('@/pages/Login'))
  const Register = loadable(() => import('@/pages/Register'))
  const Problem = loadable(() => import('@/pages/Problem'))
  const UserCenter = loadable(() => import('@/pages/UserCenter'))

  enum NavRoute {
    '/' = 1,
    '/ask',
    '/explore',
    '/problem/1',
    '/user',
    '/login',
    '/register',
    '/report',
  }

  const locationPath = useLocation().pathname
  let currentIndex: number | undefined = undefined
  if (locationPath in NavRoute) {
    currentIndex = NavRoute[locationPath as keyof typeof NavRoute].valueOf()
  }
  const [active, setActive] = useState(currentIndex)

  return (
    <Layout>
      <Aside width={'72'}>
        <Menu
          value={active}
          onChange={value => {
            setActive(Number(value))
            navigate(NavRoute[Number(value)])
          }}
          style={{
            height: '100vh',
            width: '72px'
          }}
          logo={<Button
            size={'large'}
            variant={'text'}
            onClick={() => {
              setActive(NavRoute['/'])
              navigate('/')
            }}
            icon={<img src={logo} alt={'logo'} width={'35'}/>}
            style={{
              width: '100%',
              height: '100%'
            }}
          />}
        >
          <MenuItem value={NavRoute['/ask']} icon={<ThinkingProblem size={24}/>}/>
          <MenuItem value={NavRoute['/']} icon={<Palace size={24}/>}/>
          <MenuItem value={NavRoute['/explore']} icon={<SignalTower size={24}/>}/>
          <MenuItem value={NavRoute['/problem/1']}>temp</MenuItem>
          <Divider className={'leftDown'}></Divider>
          <MenuItem value={NavRoute[logon ? '/user' : '/login']} icon={<Me size={24}/>}/>
          <MenuItem value={NavRoute['/report']} icon={<MessageEmoji size={24}/>}/>
        </Menu>
      </Aside>
      <Layout>
        <Content style={{
          height: '100%',
          padding: 20
        }}>
          <Routes>
            <Route path="/" element={<Square/>}/>
            <Route path="ask" element={<AuthWrapper><Ask/></AuthWrapper>}/>
            <Route path="explore" element={<Explore/>}/>
            <Route path="user" element={<AuthWrapper><UserCenter/></AuthWrapper>}/>
            <Route path="report" element={<Report/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="problem/:id" element={<Problem/>}/>
          </Routes>
        </Content>
        <Footer style={{ paddingTop: 4 }}>测试版 / © 2022 EZCoding 团队 / 北邮国际学院</Footer>
      </Layout>
    </Layout>
  )
}

export default App
