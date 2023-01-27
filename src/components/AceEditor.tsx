import Editor from 'react-ace'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-crimson_editor'
import 'ace-builds/src-noconflict/ext-language_tools'
import React from 'react'
import PropTypes from 'prop-types'

export interface InterPos {
  startRow: number
  startCol: number
  endRow: number
  endCol: number
}

export interface InterMarker {
  startRow: number
  startCol: number
  endRow: number
  endCol: number
  type: string
  active: boolean
}

export interface InterAnnotation {
  row: number
  column: number
  text: string
  type: string
}

interface InterState {
  language: string
  markers: InterMarker[]
}

const MarkerTranslator = {
  active: 'ace-active-marker',
  warning: 'ace-warning-marker',
  error: 'ace-error-marker',
}

export default class AceEditor extends React.Component<any, any> {
  private readonly editor: React.RefObject<Editor>

  static propTypes = {
    marker: PropTypes.array,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
    className: PropTypes.string,
    annotation: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    marker: [],
    annotation: [],
    readOnly: false,
    value: '',
    className: 'main-ace',
    onChange: null,
  }

  constructor(props: InterState) {
    super(props)
    this.editor = React.createRef()
    this.state = {
      minLine: this.props.readOnly
        ? (window.innerHeight - 247) / 19
        : (window.innerHeight - 307) / 19,
      language: 'c_cpp',
      marker: this.props.marker,
      annotation: this.props.annotation,
      onChange: this.props.onChange,
    }
  }

  setLanguage = (language: string) => {
    this.setState({ language })
  }

  setMarker = (marker: InterMarker[]) => {
    this.setState({ marker })
    this.editor.current?.editor.clearSelection()
  }

  setAnnotation = (annotation: InterAnnotation[]) => {
    this.setState({ annotation })
    this.editor.current?.editor.clearSelection()
  }

  setMinLines = (minLines: number) => {
    this.setState({ minLine: minLines })
  }

  getMinLines = () => this.state.minLine

  getLines = () => this.editor.current?.editor.session.getLength()

  getCode = () => this.editor.current?.editor.getValue()

  getSelected = () => {
    const selection = this.editor.current?.editor.getSelectionRange()
    const pos: InterPos = {
      startRow: selection?.start.row ?? 0,
      startCol: selection?.start.column ?? 0,
      endRow: selection?.end.row ?? 0,
      endCol: selection?.end.column ?? 0,
    }
    return pos
  }

  render() {
    return (
      <Editor
        mode={this.state.language}
        theme='crimson_editor'
        ref={this.editor}
        placeholder='// 在这里输入你的代码 ...'
        fontSize={14}
        minLines={this.state.minLine}
        maxLines={100}
        readOnly={this.props.readOnly}
        className={this.props.className}
        highlightActiveLine={!this.props.readOnly}
        markers={this.state.marker.map((element: InterMarker) => ({
          startRow: element.startRow,
          startCol: element.startCol,
          endRow: element.endRow,
          endCol: element.endCol,
          className: [
            MarkerTranslator[element.type as keyof typeof MarkerTranslator],
            element.active ? MarkerTranslator.active : '',
          ].join(' '),
          type: 'text',
        }))}
        annotations={this.state.annotation.map((element: InterAnnotation, index: number) => ({
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          className: `ace-n ace-${element.type} ace-n-${this.state.marker
            .at(index)
            .type.toString()}`,
          column: element.column,
          row: element.row,
          text: element.text,
          type: 'info',
        }))}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    )
  }
}
