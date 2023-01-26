import * as $ from '@/tools/kit'
import React, { useEffect } from 'react'
import { Button, Cascader, Form, Input, MessagePlugin, SubmitContext } from 'tdesign-react'
import { Axios, type UserRegisterDTO } from '@/tools/api'
import { NavLink, useNavigate } from 'react-router-dom'
import { comeFrom } from '@/tools/const'
import { setLogin, useAppDispatch } from '@/tools/slices'

const { FormItem } = Form
type errorType = 'error' | 'warning' | undefined

const Register: React.FC = () => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.validate()
  }, [form])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const stuCode = Form.useWatch('stuCode', form)
  const name = Form.useWatch('name', form)
  const username = Form.useWatch('username', form)
  const email = Form.useWatch('email', form)
  const password = Form.useWatch('password', form)
  const rules = {
    stuCode: [
      {
        required: true,
        message: '必填',
        type: 'error' as errorType
      },
      { validator: /^[1-9]\d{9}$/g.test }
    ],
    name: [{
      required: true,
      message: '必填',
      type: 'error' as errorType
    }],
    username: [{
      required: true,
      message: '必填',
      type: 'error' as errorType
    }],
    password: [{
      required: true,
      message: '必填',
      type: 'error' as errorType
    }],
    rewritePassword: [
      {
        required: true,
        message: '必填',
        type: 'error' as errorType
      },
      { validator: (val: string) => password == val }
    ],
  }
  const onSubmit = (e: SubmitContext) => {
    console.log(e)
    if (e.validateResult === true) {
      const data: UserRegisterDTO = {
        email: email,
        username: username,
        realName: name,
        password: password
      }
      Axios.post('/user/register', data).then(async () => {
        dispatch(setLogin())
        await MessagePlugin.info('提交成功')
        navigate('/')
      }).catch(err => err)
    } else {
      void MessagePlugin.warning('请检查填写是否有误')
    }
  }

  return <$.SmallerBackBox>
    <$.LargeTitle>注册</$.LargeTitle>
    <Form form={form} onSubmit={onSubmit} rules={rules}>
      <FormItem name={['stuCode']}>
        <Input placeholder="请输入10位学号（激励机制认证用）"/>
      </FormItem>
      <FormItem name={['comeFrom']}>
        <Cascader
          lazy
          loading={false}
          options={comeFrom}
          placeholder={'请选择你的组织（激励机制认证用）'}
          showAllLevels
        />
      </FormItem>
      <FormItem name={['name']}>
        <Input placeholder="请输入姓名（激励机制认证用）"/>
      </FormItem>
      <FormItem name={['username']}>
        <Input placeholder="请输入用户名（登录用的账号名）"/>
      </FormItem>
      <FormItem name={['email']}>
        <Input placeholder="请输入邮箱"/>
      </FormItem>
      <FormItem name={['password']}>
        <Input type="password" placeholder="请输入密码"/>
      </FormItem>
      <FormItem name={['rewritePassword']}>
        <Input type="password" placeholder="请重新输入密码"/>
      </FormItem>
      <FormItem>
        <Button type="submit" block>注册</Button>
        <Button theme="default">
          <NavLink to={'/login'}>登录</NavLink>
        </Button>
      </FormItem>
    </Form>
  </$.SmallerBackBox>
}

export default Register
