import {Layout, Menu} from 'tdesign-react'
import 'tdesign-react/es/style/index.css';
import './App.css';
import logo from './assets/logo.png'

function App() {
    const {Content, Footer, Aside} = Layout;
    const {MenuItem} = Menu;
    const Logo = () => <img width="116" src={logo} alt="logo"
                            style={{paddingLeft: 25}}/>;

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
                    <div>Content</div>
                </Content>
                <Footer>Copyright @ 2022 EZCoding Team. All Rights Reserved.</Footer>
            </Layout>
        </Layout>
    )
}

export default App
