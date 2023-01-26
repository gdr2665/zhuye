import {useState} from 'react';
import {Link} from "react-router-dom";
import './userAttach.less'

const UserAttach = () => {

    const [drop_state, set_drop_state] = useState([false, false])

    const drop_click = (e: any, drop_idx: number) => {
        const drop_ = JSON.parse(JSON.stringify(drop_state));
        drop_[drop_idx] = !drop_[drop_idx];
        set_drop_state(drop_)
    }

    return (
        <div className="user_attach_container">

            <div className="row">
                <div className="content">
                    提问数 <span>xx</span>
                </div>
                <div className="drop">
                    <div className="drop_control" onClick={(e) => drop_click(e, 0)}>
                        <div className={drop_state[0] ? 'tran_active' : 'tran'}>
                        </div>
                        <p> {drop_state[0] ? '合上' : '展开'}</p>
                    </div>
                    <div className="dropmenu"
                         style={
                             {
                                 display: `${drop_state[0] ? 'block' : 'none'}`,
                             }
                         }
                    >
                        <div className="menu_row">
                            <Link to='/problem'>提问1</Link>
                        </div>
                        <div className="menu_row">
                            <Link to='/problem'>提问2</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="content">
                    回答数 <span>xx</span> <span>采纳数 xx</span>
                </div>
                <div className="drop">
                    <div className="drop_control" onClick={(e) => drop_click(e, 1)}>
                        <div className={drop_state[1] ? 'tran_active' : 'tran'}>
                        </div>
                        <p> {drop_state[1] ? '合上' : '展开'}</p>
                    </div>
                    <div className="dropmenu"
                         style={
                             {
                                 display: `${drop_state[1] ? 'block' : 'none'}`,
                             }
                         }
                    >
                        <div className="menu_row">
                            回答1
                        </div>
                        <div className="menu_row">
                            回答2
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="content">
                    音视频协作数 <span>xx</span>
                </div>
            </div>

        </div>
    )
}

export default UserAttach;