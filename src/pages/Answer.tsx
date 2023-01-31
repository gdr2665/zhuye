import * as $ from '@/tools/ui'
import React, { useEffect } from 'react'
import { Button, Card, MessagePlugin, Row, Space, Textarea } from 'tdesign-react'
import AceEditor, { InterAnnotation, InterMarker, InterPos } from '@@/AceEditor'
import { Axios, type DataIdResponse } from '@/tools/api'
import { type AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { setSolutionToAnswer, useAppDispatch, useAppSelector } from '@/tools/data'
import { Delete, TextUnderline } from '@icon-park/react'

const Answer: React.FC = () => {
  /* Part 1, Interface Initializing */
  const saved = useAppSelector((state) => state.solutionToAnswer.data)
  const tempCode = useAppSelector((state) => state.solutionToAnswer.tempCode)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const toTempSave = () => {
    dispatch(setSolutionToAnswer({ accepted: false, annotations: '', likeCount: 0 }))
  }
  const toTempSaveAndResponse = () => {
    toTempSave()
    void MessagePlugin.success('当前解答数据在本地保存成功')
  }
  const toSubmit = () => {
    toTempSave()
    Axios.post('/question', saved)
      .then(async (response: AxiosResponse<DataIdResponse>) => {
        const id: number = response.data.id
        console.log(id)
        await MessagePlugin.success('解答已发布，感谢解答！')
        dispatch(setSolutionToAnswer({ accepted: false, annotations: '', likeCount: 0 }))
        navigate('/problem/2' + id.toString())
      })
      .catch((err) => err)
  }
  /* Part 2, Code Marker Initializing */
  const editor: any = React.useRef(null)
  const rightFloat: any = React.useRef(null)
  const [marker, setMarker] = React.useState<InterMarker[]>([])
  const [annotation, setAnnotation] = React.useState<InterAnnotation[]>([])
  const [markerMessage, setMarkerMessage] = React.useState<string[]>([])
  const goMark = (selection: InterPos, type: string) => {
    if (selection.startRow === selection.endRow && selection.startCol === selection.endCol) return
    const mark: InterMarker = { ...selection, type, active: false }
    const newMarker = [...marker, mark]
    setMarker(newMarker)
    editor.current.setMarker(newMarker)
    const annotate: InterAnnotation = {
      row: selection.startRow,
      column: selection.startCol - 1,
      type: newMarker.length.toString(),
      text: '',
    }
    const newAnnotation = [...annotation, annotate]
    setAnnotation(newAnnotation)
    editor.current.setAnnotation(newAnnotation)
  }
  const setMarkActive = (index: number, state: boolean) => {
    const newMarker = marker.map((value, idx) => {
      if (idx === index) value.active = state
      return value
    })
    setMarker(newMarker)
    editor.current.setMarker(newMarker)
  }
  useEffect(() => {
    rightFloat.current.style.height =
      (Math.max(editor.current.getLines(), editor.current.getMinLines()) * 19).toString() + 'px'
  }, [])
  return (
    <$.BackBox>
      <$.LargeTitle>解答</$.LargeTitle>
      <Row>
        <Space direction='vertical' style={{ width: '100%' }}>
          <$.WidthBox width={'calc(100% + 20px)'}>
            <AceEditor
              ref={editor}
              readonly={true}
              marker={marker}
              value={tempCode}
              annotation={annotation}
            />
            <Space direction={'vertical'} className={'right-float'} ref={rightFloat}>
              <Card
                hoverShadow
                style={{ width: '200px', fontSize: '14px' }}
                className={'ace-side-card underline'}
              >
                <Space>
                  <Button
                    shape='square'
                    variant='text'
                    onClick={() => goMark(editor.current.getSelected(), 'warning')}
                  >
                    <TextUnderline fill={'#F39B00'} />
                  </Button>
                  <Button
                    shape='square'
                    variant='text'
                    onClick={() => goMark(editor.current.getSelected(), 'error')}
                  >
                    <TextUnderline fill={'#E12221'} />
                  </Button>
                </Space>
              </Card>
              {marker.map((mark, index) => (
                <$.GestureDetector
                  key={index}
                  onMouseOver={() => {
                    setMarkActive(index, true)
                  }}
                  onMouseLeave={() => {
                    setMarkActive(index, false)
                  }}
                >
                  <Card
                    title={'# ' + (index + 1).toString()}
                    bordered
                    hoverShadow
                    style={{ width: '200px', fontSize: '14px' }}
                    className={'ace-side-card ace-side-card-' + mark.type}
                    actions={
                      <Button
                        shape='square'
                        variant='text'
                        onClick={() => goMark(editor.current.getSelected(), 'error')}
                      >
                        <Delete fill={'#E12221'} />
                      </Button>
                    }
                  >
                    <Textarea />
                  </Card>
                </$.GestureDetector>
              ))}
            </Space>
            <$.Box className={'origin-float'} id={'ace-comments-push-to'}></$.Box>
          </$.WidthBox>
          <Space>
            <Button theme='default' onClick={toSubmit}>
              公开解答
            </Button>
            <Button theme='default' variant='outline' onClick={toTempSaveAndResponse}>
              草稿保存
            </Button>
          </Space>
        </Space>
      </Row>
    </$.BackBox>
  )
}

export default Answer
