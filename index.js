const data = [
    {id: "clear", value: "AC"},
    {id: "divide", value: "/"},
    {id: "multiply", value: "x"},
    {id: "seven", value: 7},
    {id: "eight", value: 8},
    {id: "nine", value: 9},
    {id: "subtract", value: "-"},
    {id: "four", value: 4},
    {id: "five", value: 5},
    {id: "six", value: 6},
    {id: "add", value: "+"},
    {id: "one", value: 1},
    {id: "two", value: 2},
    {id: "three", value: 3},
    {id: "equals", value: "="},
    {id: "zero", value: 0},
    {id: "decimal", value: "."},

]

const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const operators = ["AC", "/", "x", "+", "-", "="];

const Display = ({ input, output }) => (
    <div className="output">
        <span className="result">{output}</span>
        <span id="display" className="input">{input}</span>
    </div>
    
);

const Key = ({keyData: {id, value}, handleInput}) => (
    <button id={id} className="btn" onClick={() => handleInput(value)}>
        {value}
    </button>
);

const Keyboard = ({ handleInput }) => (
    <div className="keys">
        {data.map((key) => (
            <Key key={key.id} keyData={key} handleInput={handleInput} />
        ))}
    </div>
);


const App = () => {
    const [input, setInput] = React.useState("0");
    const [output, setOutput] = React.useState("");
    const [calculatorData, setCalculatorData] = React.useState("");

    const handleSubmit = () => {
        const total = eval(calculatorData)
        setInput(`${total}`);
        setOutput(`${total} = ${total}`);
        setCalculatorData(`${total}`);
    }

    const handleClear = () => {
        setInput("0");
        setCalculatorData("")
    }

    const handleNumbers = (value) => {

        if (!calculatorData.length) {
            setInput(`${value}`);
            setCalculatorData(`${value}`);
        } else {
            if (value === 0 && (calculatorData === "0" || input === "0")) {
                setCalculatorData(`${calculatorData}`);
            } else {
                const lastChat = calculatorData.charAt(calculatorData.length - 1);
                const isLastChatOperator =
                    lastChat === "*" || operators.includes(lastChat);
                
                setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
                setCalculatorData(`${calculatorData}${value}`)
            }
        }
    }
    
    const dotOperator = () => {
        
        const lastChat = calculatorData.charAt(calculatorData.length - 1);
            if (!calculatorData.length) {
                setInput("0.");
                setCalculatorData("0.");
            } else {
                if (lastChat === "*" || operators.includes(lastChat)) {
                    setInput("0.");
                    setCalculatorData(`${calculatorData}0.`);
                } else {
                    setInput(
                        lastChat === "." || input.includes(".") ? `${input}`: `${input}.`
                    );
                    const formattedValue =
                        lastChat === "." || input.includes(".")
                            ? `${calculatorData}`
                            : `${calculatorData}.`;
                    setCalculatorData(formattedValue);
                }
            }
    }

    const handleOperators = (value) => {
        if (calculatorData.length) {
            setInput(`${value}`);
            const befLastChat = calculatorData.charAt(calculatorData.length - 2);

            const befLastChatIsOp = 
                operators.includes(befLastChat) || befLastChat === "*";

            const lastChat = calculatorData.charAt(calculatorData.length - 1);

            const lastChatIsOp = operators.includes(lastChat) || lastChat === "*";

            const validOp = value === "x" ? "*" : value;
            if (
                (lastChatIsOp && value !== "-") ||
                befLastChatIsOp && lastChatIsOp
            ) {
                if (befLastChatIsOp) {
                    const updatedValue = `${calculatorData.substring(
                        0,
                        calculatorData.length - 2
                    )}${value}`;
                    setCalculatorData(updatedValue);
                } else {
                    setCalculatorData(`${calculatorData.substring(0, calculatorData.length - 1)}${validOp}`);
                }
            } else {
                setCalculatorData(`${calculatorData}${validOp}`);
            }
        }
    }

    const handleInput = (value) => {
        const num = nums.find((num) => num === value);
        const op = operators.find((op) => op === value);

        switch(value){
            case "=":
                handleSubmit();
                break;
            case "AC":
                handleClear();
                break;
            case num:
                handleNumbers(value);
                break;
            case ".":
                dotOperator(value);
                break;
            case op:
                handleOperators(value);
                break;
            default:
                break;
        };
    }

    const handleOutput = () => {
        setOutput(calculatorData);
    }
    
    React.useEffect(() => {
    handleOutput();
    }, [calculatorData]);

    return (
    <div className="container">
        <h4>React JavaScript Calculator</h4>
        <div className="calculator">
        <Display input={input} output={output}/>
        <Keyboard handleInput={handleInput}/>
        </div>
        <p>Made by @fdezar</p>
        <a href="https://github.com/fdezar/react-javascript-calculator">https://github.com/fdezar/react-javascript-calculator</a>
    </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));