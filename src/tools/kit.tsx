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

/// This is used as a base box, which stretch fully.
export function BackBox(props: propsType) {
    return (
        <Box style={{backgroundColor: "white", height: "calc(100% - 60px)", padding: "30px"}}>
            {props.children}
        </Box>
    )
}

/// This is used as a base box, which won't stretch to the maximum size of a page.
/// We're using it in pages for example `report`, `register` and `login`.
export function SmallerBackBox(props: propsType) {
    return (
        <Box
            style={{backgroundColor: "white", padding: "30px", margin: "10% 20% 5% 20%"}}>
            {props.children}
        </Box>
    )
}

type linkPropsType = React.PropsWithChildren<{ to: string }>

/// This is a wrapper for `<a>`.
export function Link(props: linkPropsType) {
    return (
        <a href={props.to}>{props.children}</a>
    )
}

// Below are the definition of all icons.

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

export function Communication() {
    return <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                className={"leftSideSvg"}>
        <path d="M33 38H22V30H36V22H44V38H39L36 41L33 38Z" stroke="#333" strokeWidth="3" strokeLinecap="round"
              strokeLinejoin="round"/>
        <path d="M4 6H36V30H17L13 34L9 30H4V6Z" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round"
              strokeLinejoin="round"/>
        <path d="M19 18H20" stroke="#333" strokeWidth="3" strokeLinecap="round"/>
        <path d="M26 18H27" stroke="#333" strokeWidth="3" strokeLinecap="round"/>
        <path d="M12 18H13" stroke="#333" strokeWidth="3" strokeLinecap="round"/>
    </svg>
}

export function Me() {
    return <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                className={"leftSideSvg"}>
        <path fillRule="evenodd" clipRule="evenodd"
              d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
              stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path
            d="M24 23C26.7614 23 29 20.7614 29 18C29 15.2386 26.7614 13 24 13C21.2386 13 19 15.2386 19 18C19 20.7614 21.2386 23 24 23Z"
            fill="none" stroke="#333" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M10.022 38.332C10.3657 33.1206 14.7016 29 20 29H28C33.2914 29 37.6229 33.1097 37.9767 38.3113"
              stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
}

export function MessageEmoji() {
    return <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                className={"leftSideSvg"}>
        <path d="M44 7H4V37H11V42L21 37H44V7Z" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round"
              strokeLinejoin="round"/>
        <path d="M31 16V17" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 16V17" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M31 25C31 25 29 29 24 29C19 29 17 25 17 25" stroke="#333" strokeWidth="3" strokeLinecap="round"
              strokeLinejoin="round"/>
    </svg>
}

export function upperToCapital(upper: string): string {
    var upArr = upper.split("");
    var capArr: Array<String> = [];
    for (var _i = 0; _i < upArr.length; _i++) {
        if (_i == 0 || upArr[_i - 1] == "_") capArr.push(upArr[_i].toUpperCase());
        else capArr.push(upArr[_i].toLowerCase());
    }
    return capArr.join("");
}