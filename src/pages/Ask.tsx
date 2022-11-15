import * as $ from "../tools/kit"
import React, {useState} from "react";
import {Button, Col, Input, Row, Select, SelectValue, Space, Textarea} from "tdesign-react";
import AceEditor, {InterAnnotation, InterMarker, InterPos} from "../tools/aceEditor";

function Ask() {
    // Form Set
    const [title, setTitle] = useState('');
    const [tips, setTips] = useState('');
    const [content, setContent] = useState('');
    const [lang, setLang] = useState(1);
    const onLangSet = (val: SelectValue) => {
        setLang(Number(val.toString()));
    };

    // Marking
    const editor: any = React.useRef(null)
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

    // Form Submit 
    let result = {}
    const toTempSave = (e: React.MouseEvent) => {
        result = {
            "title": title,
            "lang": lang,
            "content": content,
            "code": editor.current.getCode(),
            "mark": marker,
        }
    }
    const toSubmit = (e: React.MouseEvent) => {
        toTempSave(e)
    }

    return <$.BackBox>
        <$.LargeTitle>提问</$.LargeTitle>
        <Row>
            <Col flex={7}>
                <Space direction="vertical" style={{width: "100%"}}>
                    <Input
                        value={title}
                        onChange={setTitle}
                        maxlength={20}
                        allowInputOverMax
                        showLimitNumber
                        placeholder="在这里输入标题"
                        size={"large"}
                        tips={tips}
                        style={{width: "60%"}}
                        status={tips ? 'error' : 'default'}
                        onValidate={({error}) => {
                            console.log(error);
                            setTips(error ? '输入内容长度不允许超过 20 个字' : '');
                        }}
                    />
                    <AceEditor ref={editor} readOnly={false} marker={marker}
                               value={""} annotation={annotation}/>
                    <Space>
                        <Button theme="default" onClick={toSubmit}>公开提问</Button>
                        <Button theme="default" variant="outline" onClick={toTempSave}>草稿保存</Button>
                    </Space>
                </Space>
            </Col>
            <Col flex={3}>
                <Space direction="vertical" style={{padding: "25px 10px 0 50px", width: "calc(100% - 30px)"}}>
                    <Select value={lang} onChange={onLangSet}>
                        <Select.Option key={1} label="C" value={1}/>
                        <Select.Option key={2} label="C++" value={2}/>
                        <Select.Option key={3} label="Java" value={3}/>
                        <Select.Option key={4} label="Python" value={4}/>
                    </Select>
                    <Textarea
                        value={content}
                        onChange={setContent}
                        placeholder="在这里输入提问的描述"
                        autosize={{minRows: 8, maxRows: (window.innerHeight - 342) / 19}}
                        style={{width: "100%"}}
                    />
                </Space>
            </Col>
        </Row>
    </$.BackBox>
}

export default Ask