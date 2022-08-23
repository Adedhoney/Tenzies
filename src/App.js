import React from "react"
import DiceElement from "./Die"
import Confetti from "react-confetti"

function App() {
    const [diceValues, setDiceValues] = React.useState([])
    const [gameWon, setGameWon] = React.useState(false)
    const [rollCount, setRollCount] = React.useState(0)
    let bestGame = localStorage.getItem("Best_game")

    function resetBoard() {
        let buttonInfo = []
        for (let i = 0; i < 10; i += 1) {
            buttonInfo.push({
                buttonId: `button ${i + 1}`,
                buttonValue: rollDie(),
                buttonLocked: false,
                handleLock: lockDie,
            })
        }
        setDiceValues(buttonInfo)
        setGameWon(false)
    }

    React.useEffect(resetBoard, [])

    function rollDie() {
        return Math.floor(Math.random() * 6) + 1
    }

    function rollAllDice() {
        setRollCount((prevCount) => prevCount + 1)
        setDiceValues((prevDiceState) =>
            prevDiceState.map((dieValue) => {
                return {
                    ...dieValue,
                    buttonValue: dieValue.buttonLocked
                        ? dieValue.buttonValue
                        : rollDie(),
                }
            })
        )
    }

    function lockDie(buttonId) {
        setDiceValues((prevDiceState) =>
            prevDiceState.map((dieValue) => {
                return {
                    ...dieValue,
                    buttonLocked:
                        buttonId === dieValue.buttonId
                            ? !dieValue.buttonLocked
                            : dieValue.buttonLocked,
                }
            })
        )
    }

    let diceElements = diceValues.map((diceValue) => (
        <DiceElement key={diceValue.buttonId} params={diceValue} />
    ))

    function checkWhetherGameIsWon() {
        let islocked = diceValues.every((dieValue) => dieValue.buttonLocked)
        let isTheSame = diceValues.every(
            (dieValue) => dieValue.buttonValue === diceValues[0].buttonValue
        )
        if (diceValues[0] && islocked && isTheSame) {
            setGameWon(true)
            setRollCount(0)
            if (bestGame) {
                if (rollCount < bestGame)
                    localStorage.setItem("Best_game", rollCount)
            } else {
                localStorage.setItem("Best_game", rollCount)
            }
        }
    }
    React.useEffect(checkWhetherGameIsWon, diceValues)

    return (
        <main className="main">
            {gameWon && <Confetti />}
            <div className="upper_text">
                <h2>Tenzies</h2>
                <p>
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls
                </p>
            </div>
            <div className="dice_div"> {diceElements} </div>
            <button onClick={gameWon ? resetBoard : rollAllDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
            <div className="score">
                <span>Best Game: {bestGame ? bestGame : "--"}</span>
                <span>Roll Count: {rollCount}</span>
            </div>
        </main>
    )
}

export default App
