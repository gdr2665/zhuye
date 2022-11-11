import React from "react";

type propsType = React.PropsWithChildren<{}>

/// Display primary title.
export function Title(props: propsType) {
    return (
        <div className={"title"}>
            {props.children}
        </div>
    )
}

/// Display primary info.
export function Info(props: propsType) {
    return (
        <div className={"info"}>
            {props.children}
        </div>
    )
}

/// Display name or secondary title.
export function Name(props: propsType) {
    return (
        <div className={"name"}>
            {props.children}
        </div>
    )
}

/// Display secondary info.
export function SecondaryInfo(props: propsType) {
    return (
        <div className={"secondary-info"}>
            {props.children}
        </div>
    )
}

/// Display a paragraph of normal text.
export function Str(props: propsType) {
    return (
        <div className={"text"}>
            {props.children}
        </div>
    )
}

type nbspPropsType = { width: string }

/// Display a blank block. (the name is from `#nbsp;`)
export function Nbsp(props: nbspPropsType) {
    return (
        <div style={{width: props.width + "px"}}></div>
    )
}

type widthBoxPropsType = React.PropsWithChildren<{ width: string }>

/// Display a box with a width.
export function WidthBox(props: widthBoxPropsType) {
    return (
        <div style={{width: props.width}}>
            {props.children}
        </div>
    )
}

/// Display a box with a gesture-detecting usage. (the name is from Flutter)
export function GestureDetector(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
    return (
        <div {...props}>
            {props.children}
        </div>
    )
}

/// Display a normal box, just like the original `<div>`.
export function Box(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return (
        <div {...props}>
            {props.children}
        </div>
    )
}