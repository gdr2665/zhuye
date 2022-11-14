import Asked from "../components/asked";
import Answered from "../components/answered";
import {Tabs} from "tdesign-react";

function Problem() {
    const {TabPanel} = Tabs
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

    return <Tabs placement={'top'} size={'medium'} disabled={false} theme={'card'} defaultValue={'0'}
                 style={{height: '100%'}}>
        <TabPanel key='0' value='0' label='原问题'>
            <div className="tabs-content" style={{margin: 20, height: '100%'}}>
                <Asked title={"为啥这个代码输出出来的平均数最后都被四舍五入了啊（？"}
                       time={"今天 15:09"} author={"Ti Wenzhe"}
                       authorFrom={"电子信息工程 · 大一 · 20班"} online={true}
                       content={"代码如上，e是double类型，a和b都是int类型，为啥输出出来e都是四舍五入后的。"}
                       code={codeExample}/>
            </div>
        </TabPanel>
        <TabPanel key='1' value='1' label='Hui Dazhe 的回答'>
            <div className="tabs-content" style={{margin: 20}}>
                <Answered title={"为啥这个代码输出出来的平均数最后都被四舍五入了啊（？"}
                          askedTime={"今天 15:09"} asker={"Ti Wenzhe"}
                          answerer={"Hui Dazhe"} answeredTime={"今天 15:22"}
                          answererFrom={"电子信息工程 · 大一 · 17班"} online={true}
                          code={codeExample}/>
            </div>
        </TabPanel>
    </Tabs>
}

export default Problem