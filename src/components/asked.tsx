import {Button, Col, Row, Space, Tooltip} from "tdesign-react"
import "../tools/kit"
import * as $ from "../tools/kit"
import online from "../assets/online.png"
import AceEditor from '../tools/aceEditor'
import React, {useEffect} from "react";

type propsType = {
    title: string, time: string, code: string,
    author: string, authorFrom: string, content: string,
    online: boolean
}

function Asked(props: propsType) {
    const Online = () => <img width="60" src={online} alt="online"/>
    const editor: any = React.useRef(null)
    useEffect(() => {
        editor.current.setMinLines((window.innerHeight - 247) / 19)
    }, [])

    return <>
        <Row>
            <Col flex={"auto"}>
                <Space direction={"vertical"} style={{width: "calc(100% - 20px)"}}>
                    <Space direction={"vertical"} size={"small"}>
                        <$.Title>
                            {props.title}
                        </$.Title>
                        <$.Info>
                            发布于 {props.time}
                        </$.Info>
                    </Space>
                    <AceEditor ref={editor} readOnly={true} value={props.code}/>
                </Space>
            </Col>
            <Col flex={"290px"}>
                <Space direction={"vertical"} size={"large"} style={{width: "290px"}}>
                    <Space className={"vertical-center"} size={0}>
                        <Space direction={"vertical"} size={0} style={{width: "165px"}}>
                            <$.Name>
                                {props.author}
                            </$.Name>
                            <$.SecondaryInfo>
                                {props.authorFrom}
                            </$.SecondaryInfo>
                        </Space>
                        <$.Nbsp width={"3"}/>
                        <Tooltip content="举报功能暂未开放，请向老师举报" trigger="click">
                            <Button variant={"text"} size={"small"} theme={"danger"}
                                    style={{opacity: "0.6"}}>举报</Button>
                        </Tooltip>
                        <$.Nbsp width={"18"}/>
                        {props.online && <Online></Online>}
                    </Space>
                    <Space direction={"vertical"} size={"small"}>
                        <$.Info>C (gcc)</$.Info>
                        <$.Str>
                            {props.content}
                        </$.Str>
                    </Space>
                </Space>
            </Col>
        </Row>
    </>
        ;
}

export default Asked
