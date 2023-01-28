import Asked from '@@/Asked'
import Answered from '@@/Answered'
import { Tabs } from 'tdesign-react'
import { Axios, type QuestionDetailDTO } from '@/tools/api'
import { type AxiosResponse } from 'axios'
import { useParams } from 'react-router-dom'
import React, { useState } from 'react'
import { timeToUsable } from '@/tools/func'
import { LanguageMapping } from '@/tools/const'

const Problem: React.FC = () => {
  const { TabPanel } = Tabs
  const { id } = useParams()
  const [usableTime, setUsableTime] = useState('-')
  const [data, setData] = useState<QuestionDetailDTO>({
    code: ' ',
    title: '',
    language: 'C',
    description: '',
    problemType: 'OTHER',
    createTime: undefined,
  })
  Axios.get(`/question/${id ?? ''}`)
    .then((response: AxiosResponse<QuestionDetailDTO>) => {
      setData(response.data)
      setUsableTime(timeToUsable(response.data.createTime))
    })
    .catch((err) => err)

  return (
    <Tabs
      placement={'top'}
      size={'medium'}
      disabled={false}
      theme={'card'}
      defaultValue={'0'}
      style={{ height: '100%' }}
    >
      <TabPanel key='0' value='0' label='原问题'>
        <div
          className='tabs-content'
          style={{
            margin: 20,
            height: '100%',
          }}
        >
          <Asked
            title={data.title}
            content={data.description}
            time={usableTime}
            language={LanguageMapping.get(data.language) ?? 'C (gcc)'}
            author={data.user?.username ?? '提问者'}
            authorFrom={'电子信息工程 · 大一 · 20班'}
            online={true}
            code={data.code}
            solved={data.solved ?? false}
          />
        </div>
      </TabPanel>
      <TabPanel key='1' value='1' label='Hui Dazhe 的回答'>
        <div className='tabs-content' style={{ margin: 20 }}>
          <Answered
            title={'为啥这个代码输出出来的平均数最后都被四舍五入了啊（？'}
            askedTime={'今天 15:09'}
            asker={'Ti Wenzhe'}
            answerer={'Hui Dazhe'}
            answeredTime={'今天 15:22'}
            answererFrom={'电子信息工程 · 大一 · 17班'}
            online={true}
            code={data.code}
          />
        </div>
      </TabPanel>
    </Tabs>
  )
}

export default Problem
