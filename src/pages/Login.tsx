import * as $ from "../tools/kit"
import React, {useState} from "react";
import axios from "axios";
import {Button, Input, MessagePlugin, Space} from "tdesign-react";
import {Convert, UserLoginDTO} from "../tools/apifox";
import {useNavigate} from "react-router-dom";

function Login() {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const toLogin = (e: React.MouseEvent) => {
        if (username != "" && password != "") {
            var uld: UserLoginDTO = {
                username: username,
                password: password,
            };
            var data = Convert.userLoginDTOToJson(uld);
            var config = {
                method: 'post',
                url: 'https://tc.yxzl.top/user/login',
                headers: {
                    'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
                    'Content-Type': 'application/json',
                },
                data: data
            };
            axios(config)
                .then(function (response: { data: any; }) {
                    MessagePlugin.success('登录成功！');
                    console.log(JSON.stringify(response.data));
                    navigate("/");
                })
                .catch(function (error: any) {
                    MessagePlugin.error('登录失败！');
                    console.log(error);
                });

        } else {
            var cconfig = {
                method: 'get',
                url: 'https://tc.yxzl.top/question',
                headers: {
                    'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
                }
            };

            axios(cconfig)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });

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