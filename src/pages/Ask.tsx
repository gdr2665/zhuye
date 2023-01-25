// 1.13 记：本代码到目前为止部分采用详细的知识点备注，以利初期阅读，对代码进行修改的时候不用这么备注
// 本文件实现了提问页功能

// import ... from 可以引用我这个页面用到了的别的包
import * as $ from "../tools/kit"
import React, {useEffect, useState} from "react"
import {Button, Col, Input, MessagePlugin, Row, Select, SelectValue, Space, Textarea} from "tdesign-react"
import AceEditor, {InterAnnotation, InterMarker, InterPos} from "../tools/aceEditor"
import {Language, ProblemType, QuestionDetailDTO, Convert, Axios} from "../tools/apifox";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Ask() {
    // Form Set
    // useState 表示一个值，用前者访问这个值，后者修改这个值
    let strSaved = localStorage.getItem("questionToBeAsked");
    var saved = {code: "", reward: "", language: "JAVA", description: "", title: ""};
    if (strSaved != null) {
        saved = JSON.parse(strSaved);
    }
    const [title, setTitle] = useState(saved.title);
    const [code, setCode] = useState(saved.code);
    const [titleTips, setTitleTips] = useState('');
    const [content, setContent] = useState(saved.description);
    let rewardStr = "";
    if (saved.reward != null) rewardStr = saved.reward.toString();
    const [reward, setReward] = useState(rewardStr);
    const rewardInputStatus = isNaN(+reward) ? 'error' : undefined;
    let rewardTips = rewardInputStatus ? '请输入数字' : '';
    // 下面是 useState 用于枚举类型的范例
    const [lang, setLang] = useState(Language[$.upperToCapital(saved.language) as keyof typeof Language]);
    const onLangSet = (val: SelectValue) => {
        setLang(Language[$.upperToCapital(val.toString()) as keyof typeof Language]);
    };

    // Marking
    // useRef 赋予变量实际渲染出页面中的一个元素
    const editor: any = React.useRef(null)
    // useState 后面的尖括号表明类型的预定义
    let [marker, setMarker] = React.useState<Array<InterMarker>>([])
    let [annotation, setAnnotation] = React.useState<Array<InterAnnotation>>([])
    let [markerMessage, setMarkerMessage] = React.useState<Array<string>>([])
    // ( ... ) => { ... } 是一种将函数调用过程用于给变量赋值等用途时简写的标记
    // 以下两个 const 用于操作新建代码中的高亮标记，具体实现方式可以自己研究下，不过也可以略过
    // InterMarker，InterAnnotation 等是在项目内别的文件中手动定义的类型
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
    // 这几个是提交问题时用的函数以及变量
    let navigate = useNavigate();
    let data: QuestionDetailDTO = {
        code: "",
        title: "",
        language: Language['C'],
        description: "",
        problemType: ProblemType.Other,
    };
    const toTempSave = (e: React.MouseEvent) => {
        let rewardInt: number | null = null;
        if (reward != "") rewardInt = parseInt(reward);
        data = {
            code: editor.current.getCode(),
            title: title,
            language: lang,
            description: content,
            problemType: ProblemType.Other,
            reward: rewardInt,
        };
        localStorage.setItem("questionToBeAsked", Convert.questionDetailDTOToJson(data));
    }
    const toTempSaveAndResponse = (e: React.MouseEvent) => {
        toTempSave(e);
        MessagePlugin.success('当前提问数据在本地保存成功。');
    }
    const toSubmit = (e: React.MouseEvent) => {
        toTempSave(e);
        var rconfig = {
            method: 'get',
            url: '/user/saving',
            headers: {
                'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
            }
        };
        Axios(rconfig)
            .then(function (rresponse) {
                var coins: number = rresponse.data.coins;
                var coinsEnough = true;
                if (data.reward != null) {
                    if (coins < data.reward) coinsEnough = false;
                }
                if (coinsEnough) {
                    var raw = Convert.questionDetailDTOToJson(data);
                    var config = {
                        method: 'post',
                        url: '/question',
                        headers: {
                            'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
                            'Content-Type': 'application/json'
                        },
                        data: raw
                    };
                    Axios(config)
                        .then(function (response) {
                            let id: number = JSON.parse(response.data).id;
                            console.log(id);
                            MessagePlugin.success('提问成功！');
                            localStorage.removeItem("questionToBeAsked");
                            // TODO: 悬赏从用户的金币里扣除（API暂无）
                            navigate("/");
                        })
                        .catch(function (error) {
                            console.log('error', error);
                            MessagePlugin.error('提问失败：' + error);
                        });
                } else {
                    MessagePlugin.error('提问失败，当前金币数量小于设定的悬赏额');
                }
            })
            .catch(function (rerror) {
                console.log(rerror);
                MessagePlugin.error('提问失败：' + rerror);
            });

    }

    // 最后这个 return 内内容契合 html 语法
    // <$.XXX> 是我在 /tools/kit.tsx 中定义的一些 ui 组件
    // 如果你需要一些这里没有的 ui 组件，可以在 /tools/kit.tsx 中手动定义
    // Row，Col 等是 TDesign 定义的 ui 元素
    // something="" 表明后面填写的内容是 html 直接可以解析的（正常 html）
    // 而 something={} 表明后面填写的将会在按照 js 代码进行解析后再被填充到 html 中
    return <$.BackBox>
        <$.LargeTitle>提问</$.LargeTitle>
        <Row>
            <Col flex={7} className={"ask-left"}>
                <Space direction="vertical" style={{width: "100%"}}>
                    <Input
                        value={title}
                        onChange={setTitle}
                        maxlength={20}
                        allowInputOverMax
                        showLimitNumber
                        placeholder="在这里输入标题"
                        size={"large"}
                        tips={titleTips}
                        style={{width: "60%"}}
                        status={titleTips ? 'error' : 'default'}
                        onValidate={({error}) => {
                            if (error != undefined) {
                                console.log(error);
                                setTitleTips(error ? '输入内容长度不允许超过 20 个字' : '');
                            }
                        }}
                    />
                    <AceEditor ref={editor} readOnly={false} marker={marker}
                               value={code} onChange={setCode} annotation={annotation}/>
                    <Space>
                        <Button theme="default" onClick={toSubmit}>公开提问</Button>
                        <Button theme="default" variant="outline" onClick={toTempSaveAndResponse}>草稿保存</Button>
                    </Space>
                </Space>
            </Col>
            <Col flex={3} className={"ask-right"}>
                <Space direction="vertical" style={{padding: "25px 10px 0 50px", width: "calc(100% - 30px)"}}>
                    <Select value={lang} onChange={onLangSet}>
                        <Select.Option label="C (gcc)" value={Language.C}/>
                        <Select.Option label="C++ (g++)" value={Language.Cpp}/>
                        <Select.Option label="Python (python3)" value={Language.Python}/>
                        <Select.Option label="Java (javac)" value={Language.Java}/>
                    </Select>
                    <Input
                        value={reward}
                        onChange={setReward}
                        status={rewardInputStatus}
                        tips={rewardTips}
                        placeholder="在这里输入悬赏金币数量"
                        style={{width: "100%"}}
                    />
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
