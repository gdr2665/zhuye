import React, { useEffect, useRef, useState } from 'react'
import { Col, Dialog, Row } from 'tdesign-react'
import * as $ from '@/tools/ui'
import UserAttach from '@@/UserAttach'
import onlineImg from '@/assets/online.png'
import { Axios } from '@/tools/api'
import { setUserDetail, setUserSaving, useAppDispatch, useAppSelector } from '@/tools/data'

const UserCenter: React.FC = () => {
  const effectCalled = useRef(false)
  const [visibleBtn, setVisibleBtn] = useState(false)
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (effectCalled.current) return
    // 获取用户信息
    Axios.get('/user/detail')
      .then(async (response) => {
        // handle success
        console.log(response)
        dispatch(setUserDetail(response.data))
        return await Axios.get('/user/saving')
      })
      .then((response) => {
        // handle success
        console.log(response)
        dispatch(setUserSaving(response.data))
      })
      .catch((err) => err)
    effectCalled.current = true
  }, [])

  return (
    <$.BackBox>
      <$.LargeTitle>用户中心</$.LargeTitle>
      {/* 用户基本信息 */}
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
        }}
      >
        <Col span={5}>
          <Row
            justify='space-between'
            align='middle'
            style={{
              backgroundColor: 'gray',
              padding: '0 10px 0 10px',
              height: '40px',
              borderRadius: '8px',
            }}
          >
            <Col span={8}>
              <div
                style={{
                  display: 'flex',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    marginRight: '10px',
                    fontSize: '26px',
                    color: '#ffffff',
                  }}
                >
                  {user.detail.username}
                </span>
                <span
                  style={{
                    display: 'block',
                    marginRight: '10px',
                  }}
                >
                  2022.1.18
                </span>
              </div>
            </Col>
            <Col
              span={4}
              style={{
                maxHeight: '40px',
                display: 'flex',
                justifyContent: 'right',
              }}
            >
              <div
                style={{
                  maxHeight: '40px',
                  display: 'flex',
                }}
              >
                <img
                  src={onlineImg}
                  alt=''
                  style={{
                    display: 'block',
                    height: '30px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row
            justify='start'
            align='middle'
            style={{
              backgroundColor: 'lightgray',
              margin: '10px 0 0 0',
              padding: '0 10px 0 10px',
              height: '30px',
              borderRadius: '8px',
            }}
          >
            <Col span={6}>{user.detail.realName}</Col>
            <Col span={6}>{user.detail.studentId}</Col>
          </Row>
        </Col>

        <Col
          span={4}
          style={{
            height: '80px',
          }}
        >
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
            }}
          >
            <Col
              span={6}
              style={{
                backgroundColor: 'lightgray',
                height: '80px',
                padding: '15px 0 0 15px',
                borderRadius: '8px',
              }}
            >
              <$.Str>金币数 {user.saving.coins}</$.Str>
              <div style={{ height: '10px' }}></div>
              <$.Str>经验数 {user.saving.exps}</$.Str>
            </Col>
            <Col
              span={6}
              style={{
                height: '80px',
                paddingTop: '50px',
              }}
            >
              <button
                style={{
                  display: 'block',
                  width: '100%',
                  height: '30px',
                  color: '#ffffff',
                  backgroundColor: '#333333',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setVisibleBtn(true)
                }}
              >
                修改个人资料
              </button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
        }}
      >
        <Col span={9}>
          <UserAttach />
        </Col>
      </Row>

      <Dialog
        header='个人资料更新'
        visible={visibleBtn}
        onEscKeydown={() => {
          setVisibleBtn(false)
        }}
        onCloseBtnClick={() => {
          setVisibleBtn(false)
        }}
        onOverlayClick={() => {
          setVisibleBtn(false)
        }}
        footer={<></>}
      >
        {/* <UpdateUserForm user={user} setUser={setUser}></UpdateUserForm> */}
      </Dialog>
    </$.BackBox>
  )
}

export default UserCenter
