import * as $ from "../tools/kit"
import React, {useState} from "react";
import {Button, MessagePlugin, Space, Textarea} from "tdesign-react";

const Report = () => {
    const [content, setContent] = useState('');
    const toSubmit = (e: React.MouseEvent) => {
        if (content != "") {
        } else {
            MessagePlugin.warning('输入内容不能为空');
        }
    }

    return <$.SmallerBackBox>
        <$.LargeTitle>反馈</$.LargeTitle>
        <Space direction={"vertical"} style={{width: "100%"}}>
            <$.Info>为了尽快服务到同学们，我们提早进行了项目的试运行。时间所限，试运行期间项目很多功能还在计划中，已上线的功能也还不完善，如果你发现了什么问题，有什么疑问或者建议，欢迎联系我们！谢谢你！</$.Info>
            <Textarea
                value={content}
                onChange={setContent}
                placeholder="请在这里输入反馈内容。"
                autosize={{minRows: 8, maxRows: (window.innerHeight - 342) / 19}}
                style={{width: "100%"}}
            />
            <Button onClick={toSubmit}>提交</Button>
        </Space>
    </$.SmallerBackBox>
}

export default Report