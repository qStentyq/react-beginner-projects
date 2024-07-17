import React, { useEffect, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
    const [blockValue, setBlockValue] = useState(0);
    const [apiResponse, setAPIResponse] = useState({});
    const [currency, setCurrency] = useState("RUB");
    useEffect(() => {
        fetch("https://open.er-api.com/v6/latest/USD")
            .then((resp) => resp.json())
            .then((json) => {
                setAPIResponse(json.rates);
                console.log(json.rates);
            });
    }, []);

    const onChangeCurrency = (cur) => {
        setCurrency(cur);
    };
    return (
        <div className='App'>
            <Block
                value={blockValue}
                onChangeValue={setBlockValue}
                currency='USD'
                onChangeCurrency={(cur) => console.log(cur)}
            />
            <Block value={apiResponse[currency] * blockValue} currency={currency} onChangeCurrency={onChangeCurrency} />
        </div>
    );
}

export default App;
