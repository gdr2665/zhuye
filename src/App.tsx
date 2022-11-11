import {Layout, Menu, Tabs} from 'tdesign-react'
import './App.less'
import logo from './assets/logo.png'
import Asked from "./asked";
import Answered from "./answered"

function App() {
    const {Content, Footer, Aside} = Layout
    const {MenuItem} = Menu
    const {TabPanel} = Tabs
    const Logo = () => <img width="116" src={logo} alt="logo"
                            style={{paddingLeft: 25}}/>

    return (
        <Layout>
            <Aside width={"225"}>
                <Menu style={{height: '100vh', padding: 0, width: '225px'}} logo={<Logo/>}>
                    <MenuItem value="1">求助</MenuItem>
                    <MenuItem value="2">广场</MenuItem>
                    <MenuItem value="3">探索</MenuItem>
                </Menu>
            </Aside>
            <Layout>
                <Content style={{height: '100%', padding: 20}}>
                    <Tabs placement={'top'} size={'medium'} disabled={false} theme={'card'} defaultValue={'0'}
                          style={{height: '100%'}}>
                        <TabPanel key='0' value='0' label='原问题'>
                            <div className="tabs-content" style={{margin: 20, height: '100%'}}>
                                <Asked title={"为啥这个代码输出出来的平均数最后都被四舍五入了啊（？"}
                                       time={"今天 15:09"} author={"Ti Wenzhe"}
                                       authorFrom={"电子信息工程 · 大一 · 20班"} online={true}
                                       content={"代码如上，e是double类型，a和b都是int类型，为啥输出出来e都是四舍五入后的。"}
                                       code={`#include<stdio.h>
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
}`}/>
                            </div>
                        </TabPanel>
                        <TabPanel key='1' value='1' label='Hui Dazhe 的回答'>
                            <div className="tabs-content" style={{margin: 20}}>
                                <Answered title={"为啥这个代码输出出来的平均数最后都被四舍五入了啊（？"}
                                          askedTime={"今天 15:09"} asker={"Ti Wenzhe"}
                                          answerer={"Hui Dazhe"} answeredTime={"今天 15:22"}
                                          answererFrom={"电子信息工程 · 大一 · 17班"} online={true}
                                          code={`#include<stdio.h>
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
}`}/>
                            </div>
                        </TabPanel>
                        <TabPanel key='2' value='2' label='Ling Yiren 的回答'>
                            <div className="tabs-content" style={{margin: 20}}>
                            </div>
                        </TabPanel>
                    </Tabs>
                </Content>
                <Footer style={{paddingTop: 4}}>© 2022 EZCoding Team, International School of BUPT.</Footer>
            </Layout>
        </Layout>
    )
}

export default App
