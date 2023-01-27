import * as $ from '../tools/kit'
import React, { useState } from 'react'
import { Button, Input, MessagePlugin, Space } from 'tdesign-react'
import { Axios, type DataMessageResponse, type UserLoginDTO } from '@/tools/api'
import { type AxiosResponse } from 'axios'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { setLogin, useAppDispatch } from '@/tools/slices'
import { useEffectOnce } from '@/tools/useEffectOnce'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const { state } = useLocation()
  const navigate = useNavigate()
  const toLogin = async () => {
    if (username === '' || password === '') {
      await MessagePlugin.warning('用户名、密码不能为空')
      return
    }
    const data: UserLoginDTO = {
      username,
      password,
    }
    Axios.post('/user/login', data)
      .then(async (response: AxiosResponse<DataMessageResponse>) => {
        console.log(response.data)
        dispatch(setLogin())
        await MessagePlugin.success('登录成功！')
        navigate('/')
      })
      .catch((err) => err)
  }

  useEffectOnce(() => {
    if (state === 'redirect') {
      void MessagePlugin.error('该页面需要登录后才能访问')
    }
  }, [state])

  return (
    <$.SmallerBackBox>
      <$.LargeTitle>登录</$.LargeTitle>
      <Space direction={'vertical'} style={{ width: '100%' }} size={'large'}>
        <Input
          value={username}
          onChange={setUsername}
          placeholder='请输入用户名（登录用的账号名）'
          size={'large'}
        />
        <Input
          type={'password'}
          value={password}
          onChange={setPassword}
          placeholder='请输入密码'
          size={'large'}
        />
        <Space>
          <Button onClick={toLogin}>登录</Button>
          <Button theme='default'>
            <NavLink to={'/register'}>注册</NavLink>
          </Button>
        </Space>
      </Space>
    </$.SmallerBackBox>
  )
}

export default Login
