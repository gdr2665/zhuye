import {Layout, Menu, Tabs} from 'tdesign-react'
import './App.less'
import logo from './assets/logo.png'
import Asked from "./asked";
import Answered from "./answered"

function App() {
    const {Content, Footer, Aside} = Layout
    const {MenuItem} = Menu
    const {TabPanel} = Tabs
    const Logo = () => <img width="116" src={logo} alt="logo"
                            style={{paddingLeft: 25}}/>

    return (
        <Layout>
            <Aside>
                <Menu style={{height: '100vh', padding: 0}} logo={<Logo/>}>
                    <MenuItem value="1">求助</MenuItem>
                    <MenuItem value="2">广场</MenuItem>
                    <MenuItem value="3">探索</MenuItem>
                </Menu>
            </Aside>
            <Layout>
                <Content style={{height: '100%', padding: 20}}>
                    <Tabs placement={'top'} size={'medium'} disabled={false} theme={'card'} defaultValue={'0'}
                          style={{height: '100%'}}>
                        <TabPanel key='0' value='0' label='原问题'>
                            <div className="tabs-content" style={{margin: 20, height: '100%'}}>
                                <Asked></Asked>
                            </div>
                        </TabPanel>
                        <TabPanel key='1' value='1' label='Hui Dazhe 的回答'>
                            <div className="tabs-content" style={{margin: 20}}>
                                <Answered></Answered>
                            </div>
                        </TabPanel>
                        <TabPanel key='2' value='2' label='Ling Yiren 的回答'>
                            <div className="tabs-content" style={{margin: 20}}>
                                <Answered></Answered>
                            </div>
                        </TabPanel>
                    </Tabs>
                </Content>
                <Footer style={{paddingTop: 4}}>© 2022 EZCoding Team, International School of BUPT.</Footer>
            </Layout>
        </Layout>
    )
}

export default App
