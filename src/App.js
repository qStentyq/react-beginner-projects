import React, { useEffect, useState } from "react";
import "./index.scss";
import Collection from "./Components/collection";

function App() {
    const [catId, setCatId] = useState(0);
    const [data, setData] = useState([]);
    const [inputVal, setInputVal] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(
            `https://669b1f41276e45187d34aa4f.mockapi.io/collection?page=${page}&limit=3&${
                catId ? `category=${catId}` : ""
            }`
        )
            .then((data) => data.json())
            .then((json) => {
                console.log(json);
                setData(json);
            })
            .catch((err) => {
                console.log(err);
                alert("Ошиб ка");
            });
    }, [catId, page]);

    const categories = [
        { name: "Все" },
        { name: "Море" },
        { name: "Горы" },
        { name: "Архитектура" },
        { name: "Города" },
    ];
    return (
        <div className='App'>
            <h1>Моя коллекция фотографий</h1>
            <div className='top'>
                <ul className='tags'>
                    {categories.map((category, i) => (
                        <li onClick={() => setCatId(i)} key={i} className={catId === i ? "active" : ""}>
                            {category.name}
                        </li>
                    ))}
                </ul>
                <input
                    onChange={(event) => setInputVal(event.target.value)}
                    className='search-input'
                    placeholder='Поиск по названию'
                />
            </div>
            <div className='content'>
                {data
                    .filter((coll) => coll.name.toLowerCase().includes(inputVal.toLowerCase()))
                    .map((collection) => {
                        return <Collection name={collection.name} images={collection.photos} />;
                    })}
            </div>
            <ul className='pagination'>
                {/* <li>1</li>
                <li className='active'>2</li>
                <li>3</li> */}
                {[...Array(5)].map((_, i) => {
                    return (
                        <li onClick={() => setPage(i + 1)} key={i + 1} className={page === i + 1 ? "active" : ""}>
                            {i + 1}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default App;
