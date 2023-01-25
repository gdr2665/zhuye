import {Button, Col, Dialog, DialogCloseContext, Input, Row, Space, Tooltip} from "tdesign-react"
import "../tools/kit"
import * as $ from "../tools/kit"
import online from "../assets/online.png"
import AceEditor from '../tools/aceEditor'
import React, {useEffect, useState} from "react";

type propsType = {
    title: string, time: string, code: string,
    author: string, authorFrom: string, content: string,
    online: boolean, solved: boolean, language: string,
}

function Asked(props: propsType) {
    const [reportDialogVisible, setReportDialogVisible] = useState(false);
    const toSetRDV_T = (e: React.MouseEvent) => {
        setReportDialogVisible(true);
    }
    const toSetRDV_F_M = (context: { e: React.MouseEvent<HTMLButtonElement, MouseEvent>; }) => {
        setReportDialogVisible(false);
    }
    const toSetRDV_F_D = (context: DialogCloseContext) => {
        setReportDialogVisible(false);
    }
    const Online = () => <img width="60" src={online} alt="online"/>
    const editor: any = React.useRef(null)
    useEffect(() => {
        editor.current.setMinLines((window.innerHeight - 247) / 19)
    }, [])

    return <>
        <Row>
            <Col flex={"auto"} className={"problem-left"}>
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
            <Col flex={"290px"} className={"problem-right"}>
                <Space direction={"vertical"} size={"large"} style={{width: "290px"}} className={"problem-right-child"}>
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
                        <Button variant={"text"} size={"small"} theme={"danger"}
                                style={{opacity: "0.6"}} onClick={toSetRDV_T}>举报</Button>
                        <Dialog header="请输入举报理由" visible={reportDialogVisible} onClose={toSetRDV_F_D}
                                onCancel={toSetRDV_F_M}>
                            <Input placeholder={"暂未开放，请向老师举报"}></Input>
                        </Dialog>
                        <$.Nbsp width={"18"}/>
                        {props.online && <Online></Online>}
                    </Space>
                    <Space direction={"vertical"} size={"small"}>
                        <$.Info>{props.language}</$.Info>
                        <$.Str>
                            {props.content}
                        </$.Str>
                        <$.Box className={props.solved ? "solved" : "not-solved"}>
                            {props.solved ? "问题已得到解决" : "问题暂未解决"}
                        </$.Box>
                    </Space>
                </Space>
            </Col>
        </Row>
    </>
        ;
}

export default Asked
