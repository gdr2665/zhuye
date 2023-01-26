import Asked from '../components/asked'
import Answered from '../components/answered'
import { Tabs } from 'tdesign-react'
import { Axios, Language, ProblemType, QuestionDetailDTO } from '../tools/api'
import * as $ from '../tools/kit'
import { AxiosResponse } from 'axios'
import { useParams } from 'react-router-dom'
import React from 'react'

let pFetched = false

const Problem: React.FC = () => {
  const { TabPanel } = Tabs
  let codeExample = `#include<stdio.h>
#include<math.h>
int main()
{
    int a,b,n,c,h,i,j,k;
    c=0;
    h=0;
    scanf("%d",&a);
    for(n=1;n<=a;n++)
    {
       scanf("%d",&b);
       if (b>=60) h++;
       else h=h;
       b=b+c;
       c=b;
    }
    double e;
    e=b/a;
    printf("average = %.1lf\\n count = %d",e,h);
    return 0;
}`

  const { id } = useParams()
  let data: QuestionDetailDTO = {
    code: codeExample,
    title: '为啥这个代码输出出来的平均数最后都被四舍五入了啊（？',
    language: Language['C'],
    description: '代码如上，e是double类型，a和b都是int类型，为啥输出出来e都是四舍五入后的。',
    problemType: ProblemType.Other,
    createTime: undefined
  }
  if (!pFetched) {
    pFetched = true
    Axios.get(`/question/${id}`)
      .then((response: AxiosResponse<QuestionDetailDTO>) => {
        data = response.data
      })
      .catch(err => err)
  }

  enum LanguageDisplay {
    C = 'C (gcc)',
    Cpp = 'C++ (g++)',
    Java = 'Java (javac)',
    Python = 'Python (python3)',
  }

  return <Tabs placement={'top'} size={'medium'} disabled={false} theme={'card'} defaultValue={'0'}
               style={{ height: '100%' }}>
    <TabPanel key="0" value="0" label="原问题">
      <div className="tabs-content" style={{
        margin: 20,
        height: '100%'
      }}>
        <Asked title={data.title} content={data.description}
               time={data.createTime?.toString() ?? '-'}
               language={LanguageDisplay[$.upperToCapital(data.language) as keyof typeof Language]}
               author={data.user?.username == undefined ? '提问者' : data.user?.username}
               authorFrom={'电子信息工程 · 大一 · 20班'} online={true}
               code={data.code} solved={data.solved == undefined ? false : data.solved}/>
      </div>
    </TabPanel>
    <TabPanel key="1" value="1" label="Hui Dazhe 的回答">
      <div className="tabs-content" style={{ margin: 20 }}>
        <Answered title={'为啥这个代码输出出来的平均数最后都被四舍五入了啊（？'}
                  askedTime={'今天 15:09'} asker={'Ti Wenzhe'}
                  answerer={'Hui Dazhe'} answeredTime={'今天 15:22'}
                  answererFrom={'电子信息工程 · 大一 · 17班'} online={true}
                  code={data.code}/>
      </div>
    </TabPanel>
  </Tabs>
}

export default Problem
