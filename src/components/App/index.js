import React, { useState } from 'react';
import superagent from 'superagent'


function App() {

    const [textField, setTextField] = React.useState('')
    const [cardResults, setCardResults] = React.useState([])



    const enter = (e) => {
        if (e.key === "Enter") { submitting(e) }
    }

    const submitting = (e) => {
        e.preventDefault();
        const Data = []
        const url = 'https://api.scryfall.com/cards/search'
        console.log({textField: textField, cardResults: cardResults})
            superagent.get(url)
            .query({
                "q": `${textField}`
            })
            .then((rez)=>{
                let core = JSON.parse(rez.text)
                console.log("in call", core.data)
                core.data.map(el =>{
                    Data.push([el.name, el.image_uris.small, el.artist])
                })
                setCardResults(Data)
                console.log("end of call", cardResults)

            })
            .catch((error) =>{
                console.log('try harder', error)
            })

    }


    return (
        <>
        <div style={{"alignContent": "center", "display": "flex-column", "alignContent": "center"}} className="app-container">
            <div style={{"display": "grid", "justify-self": "center", "alignSelf": "center"}} className="search-container">
                <input onChange={(el) => setTextField(el.target.value)} onKeyDown={e => enter(e)}></input>
                <button key="gallery-button" onClick={(e) => submitting(e)}> click me</button>
            </div>
              {/* <>  {textField}</> */}
            <div className="card-gallery" style={{"border": "2px solid red", "minHeight": "1.3em"}}>
                {cardResults.map((el) => {
                    return(
                        <>
                    <li key={el.name}>Name: {el}</li>
                    <li key={el.artist}>Artist: {el}</li>
                    <br />
                    </>
                    )
                })}
            </div>
        </div>
        </>
    )

};

export default App;