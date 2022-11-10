import {Col, Row, Space} from "tdesign-react"
import "./kit"
import * as k from "./kit"
import online from "./assets/online.png"

import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/ext-language_tools"

function Asked() {
    const Online = () => <img width="60" src={online} alt="online"/>
    return <>
        <Row>
            <Col flex={"auto"}>
                <Space direction={"vertical"} style={{width: "calc(100% - 20px)"}}>
                    <Space direction={"vertical"} size={"small"}>
                        <k.Title>
                            为啥这个代码输出出来的平均数最后都被四舍五入了啊（？
                        </k.Title>
                        <k.Info>
                            发布于：今天 15:22
                        </k.Info>
                    </Space>
                    <AceEditor
                        mode="c_cpp"
                        theme="github"
                        placeholder="在这里输入你的代码 ..."
                        fontSize={14}
                        style={{width: "100%"}}
                        value={`#include<stdio.h>
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
}`}
                    />
                </Space>
            </Col>
            <Col flex={"240px"}>
                <Space direction={"vertical"} size={"large"}>
                    <Space className={"vertical-center"}>
                        <Space direction={"vertical"} size={0} style={{width: "160px"}}>
                            <k.Name>
                                Ti Wenzhe
                            </k.Name>
                            <k.SecondaryInfo>
                                电信工程与管理 · 大一 · 7班
                            </k.SecondaryInfo>
                        </Space>
                        <Online></Online>
                    </Space>
                    <Space direction={"vertical"}>
                        <k.Str>
                            代码如上，e是double类型，a和b都是int类型，为啥输出出来e都是四舍五入后的。
                        </k.Str>
                    </Space>
                </Space>
            </Col>
        </Row>
    </>;
}

export default Asked
