type propsType = React.PropsWithChildren<{}>

export function Title(props: propsType) {
    return (
        <div className={"title"}>
            {props.children}
        </div>
    )
}

export function Info(props: propsType) {
    return (
        <div className={"info"}>
            {props.children}
        </div>
    )
}

export function Name(props: propsType) {
    return (
        <div className={"name"}>
            {props.children}
        </div>
    )
}

export function SecondaryInfo(props: propsType) {
    return (
        <div className={"secondary-info"}>
            {props.children}
        </div>
    )
}

export function Str(props: propsType) {
    return (
        <div className={"text"}>
            {props.children}
        </div>
    )
}