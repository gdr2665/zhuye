import React from 'react'

type propsType = React.PropsWithChildren

/// Display primary title.
export function Title (props: propsType) {
  return (
    <div className={'title'}>
      {props.children}
    </div>
  )
}

/// Display title of a Page.
export function LargeTitle (props: propsType) {
  return (
    <div className={'large-title'}>
      {props.children}
    </div>
  )
}

/// Display primary info.
export function Info (props: propsType) {
  return (
    <div className={'info'}>
      {props.children}
    </div>
  )
}

/// Display name or secondary title.
export function Name (props: propsType) {
  return (
    <div className={'name'}>
      {props.children}
    </div>
  )
}

/// Display secondary info.
export function SecondaryInfo (props: propsType) {
  return (
    <div className={'secondary-info'}>
      {props.children}
    </div>
  )
}

/// Display a paragraph of normal text.
export function Str (props: propsType) {
  return (
    <div className={'text'}>
      {props.children}
    </div>
  )
}

interface nbspPropsType {
  width: string
}

/// Display a blank block. (the name is from `#nbsp;`)
export function Nbsp (props: nbspPropsType) {
  return (
    <div style={{ width: props.width + 'px' }}></div>
  )
}

type widthBoxPropsType = React.PropsWithChildren<{ width: string }>

/// Display a box with a width.
export function WidthBox (props: widthBoxPropsType) {
  return (
    <div style={{ width: props.width }}>
      {props.children}
    </div>
  )
}

/// Display a box with a gesture-detecting usage. (the name is from Flutter)
export function GestureDetector (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div {...props}>
      {props.children}
    </div>
  )
}

/// Display a normal box, just like the original `<div>`.
export function Box (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div {...props}>
      {props.children}
    </div>
  )
}

/// This is used as a base box, which stretch fully.
export function BackBox (props: propsType) {
  return (
    <Box style={{
      backgroundColor: 'white',
      height: 'calc(100% - 60px)',
      padding: '30px'
    }}>
      {props.children}
    </Box>
  )
}

/// This is used as a base box, which won't stretch to the maximum size of a page.
/// We're using it in pages for example `report`, `register` and `login`.
export function SmallerBackBox (props: propsType) {
  return (
    <Box
      style={{
        backgroundColor: 'white',
        padding: '30px',
        margin: '10% 20% 5% 20%'
      }}>
      {props.children}
    </Box>
  )
}

type linkPropsType = React.PropsWithChildren<{ to: string }>
