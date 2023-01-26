import * as $ from '../tools/kit'
import React, { useState } from 'react'
import { Form, Button, Cascader, Input, MessagePlugin, Space } from 'tdesign-react'

const {
  FormItem
} = Form

const Register: React.FC = () => {
  const [form] = Form.useForm()
  const [stuCode, setStuCode] = useState('')
  const stuCodeReg = /^[1-9]\d{9}$/g
  const stuCodeInputStatus = stuCode === '' ? undefined : !stuCodeReg.test(stuCode) ? 'error' : undefined
  const stuCodeTips = stuCodeInputStatus ? '请输入10位学号' : ''
  const comeFrom = [
    {
      children: [
        {
          label: '17班',
          value: '1.1'
        },
        {
          label: '18班',
          value: '1.2'
        },
        {
          label: '19班',
          value: '1.3'
        },
        {
          label: '20班',
          value: '1.4'
        }
      ],
      label: '电信 · 大一',
      value: '1'
    },
    {
      children: [
        {
          label: '21班',
          value: '2.1'
        },
        {
          label: '22班',
          value: '2.2'
        },
        {
          label: '23班',
          value: '2.3'
        },
        {
          label: '24班',
          value: '2.4'
        }
      ],
      label: '智科 · 大一',
      value: '2'
    },
    {
      children: [
        {
          label: '1班',
          value: '3.1'
        },
        {
          label: '2班',
          value: '3.2'
        },
        {
          label: '3班',
          value: '3.3'
        },
        {
          label: '4班',
          value: '3.4'
        },
        {
          label: '5班',
          value: '3.5'
        },
        {
          label: '6班',
          value: '3.6'
        },
        {
          label: '7班',
          value: '3.7'
        },
        {
          label: '8班',
          value: '3.8'
        }
      ],
      label: '电管 · 大一',
      value: '3'
    }
  ]
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const usernameInputStatus = username == '' ? undefined : username == 'admin' ? 'error' : undefined
  const usernameTips = usernameInputStatus ? '这个用户名已被占用' : ''
  const [password, setPassword] = useState('')
  const [rewritePassword, setRewritePassword] = useState('')
  const toRegister = (e: React.MouseEvent) => {
    if (stuCodeInputStatus == undefined && usernameInputStatus == undefined) {

    } else {
      MessagePlugin.warning('请检查填写是否有误')
    }
  }

  return <$.SmallerBackBox>
    <$.LargeTitle>注册</$.LargeTitle>
    <Form form={form}>
      <FormItem label="学号" name={['stuCode']} rules={[{ required: true }]}>
        <Input placeholder="请输入10位学号（激励机制认证用）"/>
      </FormItem>

      <Cascader
        lazy
        loading={false}
        options={comeFrom}
        placeholder={'请选择你的组织（激励机制认证用）'}
        showAllLevels
      />
      <Input
        value={name}
        onChange={setName}
        placeholder="请输入姓名（激励机制认证用）"
      />
      <Input
        value={username}
        onChange={setUsername}
        status={usernameInputStatus}
        tips={usernameTips}
        placeholder="请输入用户名（登录用的账号名）"
      />
      <Input
        type={'password'}
        value={password}
        onChange={setPassword}
        placeholder="请输入密码"
      />
      <Input
        type={'password'}
        value={rewritePassword}
        onChange={setRewritePassword}
        placeholder="请重新输入密码"
      />
      <Space>
        <Button onClick={toRegister}> 注册</Button>
        <Button theme="default" href={'/login'}>登录</Button>
      </Space>
    </Form>
  </$.SmallerBackBox>
}

export default Register
