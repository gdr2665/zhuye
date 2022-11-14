import {Button, Card, Col, Comment, Divider, Layout, Row, Space, Textarea, Tooltip} from "tdesign-react"
import "../tools/kit"
import * as $ from "../tools/kit"
import online from "../assets/online.png"

import AceEditor, {InterAnnotation, InterMarker, InterPos} from '../tools/aceEditor'
import React, {useEffect, useState} from "react";

type propsType = {
    title: string, askedTime: string, code: string, asker: string,
    answerer: string, answererFrom: string, online: boolean, answeredTime: string,
}

function Answered(props: propsType) {
    const Online = () => <img width="60" src={online} alt="online"/>
    const Content = Layout
    let [upVotes, setUpVotes] = useState(0)

    /* Part 1, Comments Initializing */
    let [replyData, setReplayData] = useState('')
    const replyForm = (
        <$.Box style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
            <Textarea
                placeholder="请输入评论内容 ..."
                value={replyData}
                onChange={(value) => {
                    setReplayData(value);
                }}
            />
            <Button style={{marginTop: '8px'}} onClick={submitReply}>
                回复
            </Button>
        </$.Box>
    )

    function submitReply() {
        setReplayData("")
    }

    /* Part 2, Code Marker Initializing */
    const editor: any = React.useRef(null)
    const rightFloat: any = React.useRef(null)
    let [marker, setMarker] = React.useState<Array<InterMarker>>([])
    let [annotation, setAnnotation] = React.useState<Array<InterAnnotation>>([])
    let [markerMessage, setMarkerMessage] = React.useState<Array<string>>([])
    const goMark = (selection: InterPos, type: string) => {
        if (selection.startRow == selection.endRow && selection.startCol == selection.endCol) return
        const mark: InterMarker = {...selection, type, active: false}
        const newMarker = [...marker, mark]
        setMarker(newMarker)
        editor.current.setMarker(newMarker)
        const annotate: InterAnnotation = {
            row: selection.startRow,
            column: selection.startCol - 1, type: newMarker.length.toString(), text: ""
        }
        const newAnnotation = [...annotation, annotate]
        setAnnotation(newAnnotation)
        editor.current.setAnnotation(newAnnotation)
    }
    const setMarkActive = (index: number, state: boolean) => {
        const newMarker = marker.map((value, idx) => {
            if (idx === index) value.active = state
            return value
        })
        setMarker(newMarker)
        editor.current.setMarker(newMarker)
    }
    useEffect(() => {
        setUpVotes(201)
        goMark({
            startRow: 17, startCol: 4,
            endRow: 17, endCol: 10,
        }, "error");
        let newMarkerMessage = markerMessage.concat(["int 除以 int 结果还是 int，所以结果就错误了。你把 a 和 b 都乘 1.0 试试？"])
        setMarkerMessage(newMarkerMessage)
        editor.current.setMinLines((window.innerHeight - 247) / 19)
        rightFloat.current.style.height = (Math.max(editor.current.getLines(), editor.current.getMinLines()) * 19).toString() + "px"
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
                            由 {props.asker} 提问于 {props.askedTime}
                        </$.Info>
                    </Space>
                    <$.WidthBox width={"calc(100% + 20px)"}>
                        <AceEditor ref={editor} readOnly={true} marker={marker}
                                   value={props.code} annotation={annotation}/>
                        <Space direction={"vertical"} className={"right-float"} ref={rightFloat}>
                            {marker.map((mark, index) => (
                                <$.GestureDetector key={index}
                                                   onMouseOver={() => setMarkActive(index, true)}
                                                   onMouseLeave={() => setMarkActive(index, false)}>
                                    <Card title={"# " + (index + 1).toString()} bordered hoverShadow
                                          style={{width: '200px', fontSize: '14px'}}
                                          className={"ace-side-card ace-side-card-" + mark.type}>
                                        {markerMessage.at(index)}
                                    </Card>
                                </$.GestureDetector>
                            ))}
                        </Space>
                        <$.Box className={"origin-float"} id={"ace-comments-push-to"}></$.Box>
                    </$.WidthBox>
                </Space>
            </Col>
            <Col flex={"290px"}>
                <Space direction={"vertical"} size={"medium"}>
                    <Space className={"vertical-center"} size={0}>
                        <Space direction={"vertical"} size={0} style={{width: "165px"}}>
                            <$.Name>
                                {props.answerer}
                            </$.Name>
                            <$.SecondaryInfo>
                                {props.answererFrom}
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
                    <Space className={"vertical-center"}>
                        <Button variant={"outline"} theme={"primary"}
                                onClick={() => setUpVotes(upVotes + 1)}>赞 {upVotes}</Button>
                        <Tooltip content="语音答疑功能暂未开放" trigger="click">
                            <Button variant={"outline"} disabled={!props.online}>语音答疑</Button>
                        </Tooltip>
                        <$.SecondaryInfo>回答于{props.answeredTime}</$.SecondaryInfo>
                    </Space>
                </Space>
                <Divider></Divider>
                <Space direction={"vertical"}>
                    <Comment
                        author="Ti Wenzhe"
                        datetime="今天 15:23"
                        content="把b和a都转成double也没用啊（挠头"
                    />
                    <Comment
                        author="Ping Lun"
                        datetime="今天 15:27"
                        content="你改成 (b*1.0)/(a*1.0) 试试？"
                    />
                </Space>
                <Divider></Divider>
                <Comment content={replyForm}/>
            </Col>
        </Row>
    </>
}

export default Answered

