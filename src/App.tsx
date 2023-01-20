import {Divider, Layout, Menu} from 'tdesign-react'
import './App.less'
import logo from './assets/logo-compact.png'
import * as $ from "./tools/kit";
import {Me, MessageEmoji, Palace, SignalTower, ThinkingProblem} from "./tools/kit";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Ask from "./pages/Ask";
import React from "react";
import Explore from "./pages/Explore";
import Square from "./pages/Square";
import User from "./pages/User";
import Report from "./pages/Report";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Problem from "./pages/Problem";

function App() {
    const {Content, Footer, Aside} = Layout
    const {MenuItem} = Menu
    const Logo = () => <img width="24" src={logo} alt="logo"
                            style={{marginLeft: 25}}/>
    let logon = false;

    return (
        <Layout>
            <Aside width={"72"}>
                <Menu style={{height: '100vh', padding: 0, width: '72px'}} logo={<$.Link to={"/"}><Logo/></$.Link>}>
                    <MenuItem value="1" href={"/ask"}><ThinkingProblem/></MenuItem>
                    <MenuItem value="2" href={"/"}><Palace/></MenuItem>
                    <MenuItem value="3" href={"/explore"}><SignalTower/></MenuItem>
                    <MenuItem value="10" href={"/problem"}>temp</MenuItem>
                    <Divider className={"leftDown"}></Divider>
                    <MenuItem value="4" href={logon ? "/user" : "/register"}><Me/></MenuItem>
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
                            <Route path="user" element={<User/>}/>
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
