import {Divider, Layout, Menu, MessagePlugin} from 'tdesign-react'
import './App.less'
import logo from './assets/logo-compact.png'
import * as $ from "./tools/kit";
import {Me, MessageEmoji, Palace, redirect, SignalTower, ThinkingProblem} from "./tools/kit";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Ask from "./pages/Ask";
import React from "react";
import Explore from "./pages/Explore";
import Square from "./pages/Square";
import Report from "./pages/Report";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Problem from "./pages/Problem";
import UserCenter from './pages/UserCenter';
import SubMenu from "tdesign-react/es/menu/SubMenu";
import {Axios} from "./tools/apifox";

const App = () => {
    const {Content, Footer, Aside} = Layout
    const {MenuItem} = Menu
    const Logo = () => <img width="24" src={logo} alt="logo"
                            style={{marginLeft: 25}}/>
    let logon = localStorage.getItem("logon") == String(true)
    const logout = async (context: { e: React.MouseEvent; }) => {
        await Axios.get("/user/logout", {
            headers: {
                'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
                'Content-Type': 'application/json',
            }
        });
        localStorage.setItem("logon", String(false))
        await MessagePlugin.success('登出成功！')
        redirect("/");
    }

    return (
        <Layout>
            <Aside width={"72"}>
                <Menu collapsed={true} expandMutex={false} style={{height: '100vh', width: '72px'}}
                      logo={<$.Link to={"/"}><Logo/></$.Link>}>
                    <MenuItem value="1" href={"/ask"}><ThinkingProblem/></MenuItem>
                    <MenuItem value="2" href={"/"}><Palace/></MenuItem>
                    <MenuItem value="3" href={"/explore"}><SignalTower/></MenuItem>
                    <MenuItem value="10" href={"/problem"}>temp</MenuItem>
                    <Divider className={"leftDown"}></Divider>
                    <SubMenu value="4" icon={<Me/>}>
                        <MenuItem value="4-1" href={logon ? "/user" : "/login"}>{logon ? "用户中心" : "登录"}</MenuItem>
                        {logon ? <MenuItem value="4-2" onClick={logout}>登出</MenuItem> :
                            <MenuItem value="4-2" href={"/register"}>注册</MenuItem>}
                    </SubMenu>
                    <MenuItem value="5" href={"/report"}><MessageEmoji/></MenuItem>
                </Menu>
            </Aside>
            <Layout>
                <Content style={{height: '100%', padding: 20}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Square/>}/>
                            <Route path="ask" element={<Ask/>}/>
                            <Route path="explore" element={<Explore/>}/>
                            <Route path="user" element={<UserCenter/>}/>
                            <Route path="report" element={<Report/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="register" element={<Register/>}/>
                            <Route path="problem/*" element={<Problem/>}/>
                        </Routes>
                    </BrowserRouter>
                </Content>
                <Footer style={{paddingTop: 4}}>测试版 / © 2022 EZCoding 团队 / 北邮国际学院</Footer>
            </Layout>
        </Layout>
    )
}

export default App
