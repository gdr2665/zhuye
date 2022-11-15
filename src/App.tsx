import {Layout, Menu} from 'tdesign-react'
import './App.less'
import logo from './assets/logo-compact.png'
import * as $ from "./tools/kit";
import {Palace, SignalTower, ThinkingProblem} from "./tools/kit";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Ask from "./pages/Ask";
import React from "react";
import Explore from "./pages/Explore";
import Square from "./pages/Square";

function App() {
    const {Content, Footer, Aside} = Layout
    const {MenuItem} = Menu
    const Logo = () => <img width="24" src={logo} alt="logo"
                            style={{marginLeft: 25}}/>

    return (
        <Layout>
            <Aside width={"72"}>
                <Menu style={{height: '100vh', padding: 0, width: '72px'}} logo={<$.Link to={"/"}><Logo/></$.Link>}>
                    <MenuItem value="1" href={"/ask"}><ThinkingProblem/></MenuItem>
                    <MenuItem value="2" href={"/"}><Palace/></MenuItem>
                    <MenuItem value="3" href={"/explore"}><SignalTower/></MenuItem>
                </Menu>
            </Aside>
            <Layout>
                <Content style={{height: '100%', padding: 20}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Square/>}/>
                            <Route path="ask" element={<Ask/>}/>
                            <Route path="explore" element={<Explore/>}/>
                        </Routes>
                    </BrowserRouter>
                </Content>
                <Footer style={{paddingTop: 4}}>© 2022 EZCoding Team, International School of BUPT.</Footer>
            </Layout>
        </Layout>
    )
}

export default App
