import {Layout, Menu} from 'tdesign-react'
import './App.less'
import logo from './assets/logo-compact.png'
import {Palace, SignalTower, ThinkingProblem} from "./tools/kit";
import Problem from "./pages/Problem";

function App() {
    const {Content, Footer, Aside} = Layout
    const {MenuItem} = Menu
    const Logo = () => <img width="24" src={logo} alt="logo"
                            style={{paddingLeft: 25}}/>

    return (
        <Layout>
            <Aside width={"72"}>
                <Menu style={{height: '100vh', padding: 0, width: '72px'}} logo={<Logo/>}>
                    <MenuItem value="1"><ThinkingProblem/></MenuItem>
                    <MenuItem value="2"><Palace/></MenuItem>
                    <MenuItem value="3"><SignalTower/></MenuItem>
                </Menu>
            </Aside>
            <Layout>
                <Content style={{height: '100%', padding: 20}}>
                    <Problem></Problem>
                </Content>
                <Footer style={{paddingTop: 4}}>© 2022 EZCoding Team, International School of BUPT.</Footer>
            </Layout>
        </Layout>
    )
}

export default App
