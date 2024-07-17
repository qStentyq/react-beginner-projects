import React, { useEffect, useState } from "react";
import { BlockUSD } from "./BlockUSD";
import "./index.scss";
import { BlockOthers } from "./BlockOthers";

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
            <BlockUSD value={blockValue} onChangeValue={setBlockValue} currency='USD' />
            <BlockOthers
                value={apiResponse[currency] * blockValue}
                currency={currency}
                onChangeCurrency={onChangeCurrency}
                allCurencies={apiResponse}
            />
        </div>
    );
}

export default App;
