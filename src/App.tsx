import { Button, Divider, Layout, Menu } from 'tdesign-react'
import '@/App.less'
import logo from '@/assets/logo-compact.png'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import React, { useState, useLayoutEffect, Suspense } from 'react'
import { ThinkingProblem, Palace, SignalTower, Me, MessageEmoji } from '@icon-park/react'
import { useAppSelector } from '@/tools/slices'
import AuthWrapper from '@@/AuthWrapper'
import Loading from '@@/Loading'

import { lazy } from '@loadable/component'

const App: React.FC = () => {
  const { Content, Footer, Aside } = Layout
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

  const LazyPage = ({ page }: { page: string }) => {
    const Loader = lazy(() => import(`./pages/${page}.tsx`))
    return (
      <Suspense fallback={<Loading />}>
        <Loader />
      </Suspense>
    )
  }

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

  const location = useLocation()
  const [active, setActive] = useState<number | undefined>(undefined)

  useLayoutEffect(() => {
    if (location.pathname in NavRoute) {
      setActive(NavRoute[location.pathname as keyof typeof NavRoute].valueOf())
    }
  }, [location])

  const switchPage = (path: string) => {
    if (location.pathname !== path) {
      navigate(path)
    }
  }

  return (
    <Layout>
      <Aside width={'72'}>
        <Menu
          value={active}
          onChange={(value) => switchPage(NavRoute[Number(value)])}
          style={{
            height: '100vh',
            width: '72px',
          }}
          logo={
            <Button
              size={'large'}
              variant={'text'}
              onClick={() => switchPage('/')}
              icon={<img src={logo} alt={'logo'} width={'35'} />}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          }
        >
          <MenuItem value={NavRoute['/ask']} icon={<ThinkingProblem size={24} />} />
          <MenuItem value={NavRoute['/']} icon={<Palace size={24} />} />
          <MenuItem value={NavRoute['/explore']} icon={<SignalTower size={24} />} />
          <MenuItem value={NavRoute['/problem/1']}>temp</MenuItem>
          <Divider className={'leftDown'}></Divider>
          <MenuItem value={NavRoute[logon ? '/user' : '/login']} icon={<Me size={24} />} />
          <MenuItem value={NavRoute['/report']} icon={<MessageEmoji size={24} />} />
        </Menu>
      </Aside>
      <Layout>
        <Content
          style={{
            height: '100%',
            padding: 20,
          }}
        >
          <Routes>
            <Route path='/' element={<LazyPage page={'Square'} />} />
            <Route path='ask' element={<AuthWrapper element={<LazyPage page={'Ask'} />} />} />
            <Route path='explore' element={<LazyPage page={'Explore'} />} />
            <Route
              path='user'
              element={<AuthWrapper element={<LazyPage page={'UserCenter'} />} />}
            />
            <Route path='report' element={<LazyPage page={'Report'} />} />
            <Route path='login' element={<LazyPage page={'Login'} />} />
            <Route path='register' element={<LazyPage page={'Register'} />} />
            <Route path='problem/:id' element={<LazyPage page={'Problem'} />} />
          </Routes>
        </Content>
        <Footer style={{ paddingTop: 4 }}>测试版 / © 2022 EZCoding 团队 / 北邮国际学院</Footer>
      </Layout>
    </Layout>
  )
}

export default App
