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

/// Display title of a Page.
export function LargeTitle(props: propsType) {
    return (
        <div className={"large-title"}>
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

export function BackBox(props: propsType) {
    return (
        <Box style={{backgroundColor: "white", height: "calc(100% - 60px)", padding: "30px"}}>
            {props.children}
        </Box>
    )
}

type linkPropsType = React.PropsWithChildren<{ to: string }>

export function Link(props: linkPropsType) {
    return (
        <a href={props.to}>{props.children}</a>
    )
}

export function ThinkingProblem() {
    return <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                className={"leftSideSvg"}>
        <path
            d="M38 21L43 30L38 31V37H35L29 36L28 43H13L11 32.619C7.92077 29.7028 6 25.5757 6 21C6 12.1634 13.1634 5 22 5C30.8366 5 38 12.1634 38 21Z"
            fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round"
            strokeLinejoin="round"/>
        <path
            d="M17 19C17 16.2386 19.2386 14 22 14C24.7614 14 27 16.2386 27 19C27 21.7614 24.7614 24 22 24V27"
            stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 33V34" stroke="#333" strokeWidth="3" strokeLinecap="round"
              strokeLinejoin="round"/>
    </svg>;
}

export function SignalTower() {
    return <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                className={"leftSideSvg"}>
        <path
            d="M17.0812 6.00005C10.9612 10.2853 9.47386 18.7205 13.7591 24.8405C18.0444 30.9605 26.4796 32.4479 32.5996 28.1626L17.0812 6.00005Z"
            fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 31V42" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 24.5L6 42H42" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40 6L25 17" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 6H40L33 27.5" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>;
}

export function Palace() {
    return <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                className={"leftSideSvg"}>
        <path d="M4 18H44L24 6L4 18Z" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round"
              strokeLinejoin="round"/>
        <path d="M44 42L4 42" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 18V42" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 18V42" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M29 18V42" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M39 18V42" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
}

export enum LangEnum {
    'Lang_1' = 'C',
    'Lang_2' = 'C++',
    'Lang_3' = 'Java',
    'Lang_4' = 'Python'
}

export enum LangEnumFromLang {
    'C' = '1',
    'C++' = '2',
    'Java' = '3',
    'Python' = '4'
}