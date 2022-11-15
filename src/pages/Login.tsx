import * as $ from "../tools/kit"
import React, {useState} from "react";
import {Button, Input, MessagePlugin, Space} from "tdesign-react";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const toLogin = (e: React.MouseEvent) => {
        if (username != "" && password != "") {
        } else {
            MessagePlugin.warning('用户名、密码不能为空');
        }
    }

    return <$.SmallerBackBox>
        <$.LargeTitle>登录</$.LargeTitle>
        <Space direction={"vertical"} style={{width: "100%"}} size={"large"}>
            <Input
                value={username}
                onChange={setUsername}
                placeholder="请输入用户名（登录用的账号名）"
                size={"large"}
            />
            <Input
                type={"password"}
                value={password}
                onChange={setPassword}
                placeholder="请输入密码"
                size={"large"}
            />
            <Space>
                <Button onClick={toLogin}>登录</Button>
                <Button theme="default" href={"/register"}>注册</Button>
            </Space>
        </Space>
    </$.SmallerBackBox>
}

export default Login