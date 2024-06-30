import React, { useState, useEffect} from 'react';
import Card from "./Card";
import axios from "axios";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck(){
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);


    useEffect(function fetchDeckWhenMounted(){
        async function fetchDeck(){
            const deckResult = await axios.get(`${BASE_URL}/new/shuffle`);
            setDeck(deckResult.data);
        }
        fetchDeck();
    }, []);

    async function drawCard(){
        try{
            const drawResp = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/`);
            if (drawResp.data.remaining === 0) throw new Error("Deck is empty!");
            const drawnCard = drawResp.data.cards[0];
            setDrawn(d => [
                ...d,
                {
                    id: drawCard.code,
                    name: drawnCard.value + " of " + drawnCard.suit,
                    image: drawnCard.image
                }
            ]);
        }catch(err){
            alert(err);
        }
    }

    async function shuffleDeck(){
        try{
            setIsShuffling(true);
            const shuffleResp = await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle`);
            setDrawn([]);
        }catch(err){
            alert(err);
        }finally{
            setIsShuffling(false);
        }
    }

    function renderShuffleButton(){
        if (!deck) return null;
        return(
            <button
                onClick={shuffleDeck}
                disabled={isShuffling}>
                Shuffle Deck
            </button>
        )
    }

    function renderDrawButton(){
        if (!deck) return null;
        return(
            <button
                onClick={drawCard}
                disabled={isShuffling}>
                Draw Card
            </button>
        )
    }

    return(
        <div className='Deck'>
            {renderDrawButton}
            {renderShuffleButton}
            {drawn.map(c => (
                <Card key={c.id} name={c.name} image={c.image}/>
            )
            )}
        </div>
    );
}

export default Deck;