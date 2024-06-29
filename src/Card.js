import React from 'react';

function Card({ name, image }){
    return(
        <img
            src={image}
            alt={name}
        />
    );
}

export default Card;