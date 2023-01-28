import * as $ from '@/tools/ui'
import React, { useState } from 'react'
import { Button, MessagePlugin, Row, Space } from 'tdesign-react'
import AceEditor from '@@/AceEditor'
import { Axios, type DataIdResponse } from '@/tools/api'
import { type AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { setSolutionToAnswer, useAppDispatch, useAppSelector } from '@/tools/data'

const Answer: React.FC = () => {
  // todo: finish it
  const saved = useAppSelector((state) => state.solutionToAnswer.data)
  const [code, setCode] = useState('')
  const editor: any = React.useRef(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const toTempSave = () => {
    dispatch(setSolutionToAnswer({ accepted: false, annotations: '', likeCount: 0 }))
  }
  const toTempSaveAndResponse = () => {
    toTempSave()
    void MessagePlugin.success('当前解答数据在本地保存成功')
  }
  const toSubmit = () => {
    toTempSave()
    Axios.post('/question', saved)
      .then(async (response: AxiosResponse<DataIdResponse>) => {
        const id: number = response.data.id
        console.log(id)
        await MessagePlugin.success('解答已发布，感谢解答！')
        dispatch(setSolutionToAnswer({ accepted: false, annotations: '', likeCount: 0 }))
        navigate('/problem/2' + id.toString())
      })
      .catch((err) => err)
  }
  return (
    <$.BackBox>
      <$.LargeTitle>解答</$.LargeTitle>
      <Row>
        <Space direction='vertical' style={{ width: '100%' }}>
          <AceEditor ref={editor} readOnly={false} value={code} onChange={setCode} />
          <Space>
            <Button theme='default' onClick={toSubmit}>
              公开解答
            </Button>
            <Button theme='default' variant='outline' onClick={toTempSaveAndResponse}>
              草稿保存
            </Button>
          </Space>
        </Space>
      </Row>
    </$.BackBox>
  )
}

export default Answer
