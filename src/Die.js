import React from "react"

function DiceElement(props) {
    props = props.params

    let dotsArray = []
    for (let i = 0; i < props.buttonValue; i++) {
        dotsArray.push(<DieDot key={`Dot ${i}`} />)
    }

    return (
        <div
            id={props.buttonId}
            className={`die_button ${
                props.buttonLocked ? "locked" : ""
            } die_face${props.buttonValue}`}
            onClick={() => props.handleLock(props.buttonId)}
        >
            {dotsArray}
        </div>
    )
}

function DieDot() {
    return <span className="dot"></span>
}

export default DiceElement
