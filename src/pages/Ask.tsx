// 1.13 记：本代码到目前为止部分采用详细的知识点备注，以利初期阅读，对代码进行修改的时候不用这么备注
// 本文件实现了提问页功能

// import ... from 可以引用我这个页面用到了的别的包
import * as $ from '@/tools/ui'
import React, { useState } from 'react'
import { Button, Col, Input, MessagePlugin, Row, Select, Space, Textarea } from 'tdesign-react'
import AceEditor from '@@/AceEditor'
import { Axios, type DataIdResponse, type Language } from '@/tools/api'
import { type AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { LanguageMapping } from '@/tools/const'
import { setQuestionToAsk, useAppDispatch, useAppSelector } from '@/tools/data'

interface Saved {
  title: string
  code: string
  reward: string
  language: Language
  description: string
}

const Ask: React.FC = () => {
  // Form Set
  // useState 表示一个值，用前者访问这个值，后者修改这个值
  const strSaved = localStorage.getItem('questionToBeAsked')
  let saved: Saved = {
    title: '',
    code: '',
    reward: '',
    language: 'JAVA',
    description: '',
  }
  if (strSaved != null) {
    saved = JSON.parse(strSaved)
  }
  const [title, setTitle] = useState(saved.title)
  const [code, setCode] = useState(saved.code)
  const [titleTips, setTitleTips] = useState('')
  const [content, setContent] = useState(saved.description)
  let rewardStr = ''
  if (saved.reward != null) rewardStr = saved.reward.toString()
  const [reward, setReward] = useState(rewardStr)
  const rewardInputStatus = isNaN(+reward) ? 'error' : undefined
  const rewardTips = rewardInputStatus !== undefined ? '请输入数字' : ''
  // 下面是 useState 用于枚举类型的范例
  const [lang, setLang] = useState<Language>(saved.language)

  // Marking
  // useRef 赋予变量实际渲染出页面中的一个元素
  const editor: any = React.useRef(null)
  // useState 后面的尖括号表明类型的预定义
  // ( ... ) => { ... } 是一种将函数调用过程用于给变量赋值等用途时简写的标记
  // 以下两个 const 用于操作新建代码中的高亮标记，具体实现方式可以自己研究下，不过也可以略过
  // InterMarker，InterAnnotation 等是在项目内别的文件中手动定义的类型
  // Form Submit
  // 这几个是提交问题时用的函数以及变量
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const questionData = useAppSelector((state) => state.questionToAsk)
  const toTempSave = () => {
    let rewardInt: number | null = null
    if (reward !== '') rewardInt = parseInt(reward)
    dispatch(
      setQuestionToAsk({
        code: editor.current.getCode(),
        title,
        language: lang,
        description: content,
        problemType: 'OTHER',
        reward: rewardInt,
      }),
    )
  }
  const toTempSaveAndResponse = () => {
    toTempSave()
    void MessagePlugin.success('当前提问数据在本地保存成功。')
  }
  const toSubmit = () => {
    toTempSave()
    Axios.post('/question', questionData)
      .then(async (response: AxiosResponse<DataIdResponse>) => {
        const id: number = response.data.id
        console.log(id)
        await MessagePlugin.success('提问成功！')
        localStorage.removeItem('questionToBeAsked')
        // TODO: 悬赏从用户的金币里扣除（API暂无）
        navigate('/')
      })
      .catch((err) => err)
  }

  // 最后这个 return 内内容契合 html 语法
  // <$.XXX> 是我在 /tools/ui.tsx 中定义的一些 ui 组件
  // 如果你需要一些这里没有的 ui 组件，可以在 /tools/ui.tsx 中手动定义
  // Row，Col 等是 TDesign 定义的 ui 元素
  // something="" 表明后面填写的内容是 html 直接可以解析的（正常 html）
  // 而 something={} 表明后面填写的将会在按照 js 代码进行解析后再被填充到 html 中
  return (
    <$.BackBox>
      <$.LargeTitle>提问</$.LargeTitle>
      <Row>
        <Col flex={7} className={'ask-left'}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Input
              value={title}
              onChange={setTitle}
              maxlength={20}
              allowInputOverMax
              showLimitNumber
              placeholder='在这里输入标题'
              size={'large'}
              tips={titleTips}
              style={{ width: '60%' }}
              status={titleTips !== '' ? 'error' : 'default'}
              onValidate={({ error }) => {
                if (error !== undefined) {
                  console.log(error)
                  setTitleTips(error.length > 0 ? '输入内容长度不允许超过 20 个字' : '')
                }
              }}
            />
            <AceEditor ref={editor} readOnly={false} value={code} onChange={setCode} />
            <Space>
              <Button theme='default' onClick={toSubmit}>
                公开提问
              </Button>
              <Button theme='default' variant='outline' onClick={toTempSaveAndResponse}>
                草稿保存
              </Button>
            </Space>
          </Space>
        </Col>
        <Col flex={3} className={'ask-right'}>
          <Space
            direction='vertical'
            style={{
              padding: '25px 10px 0 50px',
              width: 'calc(100% - 30px)',
            }}
          >
            <Select value={lang} onChange={(option) => setLang(option as Language)}>
              {Array.from(LanguageMapping).map((data) => (
                <Select.Option key={data[0]} label={data[1]} value={data[0]} />
              ))}
            </Select>
            <Input
              value={reward}
              onChange={setReward}
              status={rewardInputStatus}
              tips={rewardTips}
              placeholder='在这里输入悬赏金币数量'
              style={{ width: '100%' }}
            />
            <Textarea
              value={content}
              onChange={setContent}
              placeholder='在这里输入提问的描述'
              autosize={{
                minRows: 8,
                maxRows: (window.innerHeight - 342) / 19,
              }}
              style={{ width: '100%' }}
            />
          </Space>
        </Col>
      </Row>
    </$.BackBox>
  )
}

export default Ask
