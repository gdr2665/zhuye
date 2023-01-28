import { Button, Divider, Layout, Menu, MessagePlugin } from 'tdesign-react'
import '@/App.less'
import logo from '@/assets/logo-compact.png'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import React, { Suspense, useLayoutEffect, useState } from 'react'
import { Me, MessageEmoji, Palace, SignalTower, ThinkingProblem } from '@icon-park/react'
import { setLogout, useAppDispatch, useAppSelector } from '@/tools/data'
import AuthWrapper from '@@/AuthWrapper'
import Loading from '@@/Loading'

import { lazy } from '@loadable/component'
import SubMenu from 'tdesign-react/es/menu/SubMenu'
import { Axios } from '@/tools/api'

const App: React.FC = () => {
  const { Content, Footer, Aside } = Layout
  const { MenuItem } = Menu
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const logon = useAppSelector((state) => state.user.logon)
  const user = useAppSelector((state) => state.user)
  const logout = () => {
    void Axios.get('/user/logout')
    dispatch(setLogout())
    void MessagePlugin.success('登出成功！')
    navigate('/', { replace: true })
  }

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
    '/problem/2',
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
          expandType={'popup'}
          collapsed={true}
          expandMutex={false}
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
          <MenuItem value={NavRoute['/problem/2']}>临时</MenuItem>
          <Divider className={'leftDown'}></Divider>
          <SubMenu
            value={NavRoute[logon ? '/user' : '/login']}
            icon={<Me size={24} />}
            className={'t-is-opened'}
          >
            {logon ? <MenuItem disabled>{user.detail.username}</MenuItem> : null}
            <MenuItem value={NavRoute[logon ? '/user' : '/login']}>
              {logon ? '用户中心' : '登录'}
            </MenuItem>
            {logon ? (
              <MenuItem value='4-2' onClick={logout}>
                登出
              </MenuItem>
            ) : (
              <MenuItem value={NavRoute['/register']}>注册</MenuItem>
            )}
          </SubMenu>
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
            <Route path='answer/:id' element={<LazyPage page={'Answer'} />} />
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
