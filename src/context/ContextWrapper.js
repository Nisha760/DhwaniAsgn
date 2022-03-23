import React from 'react';
import { useState } from 'react';
import { cardContext } from './cardContext';

function ContextWrapper({ children }) {
    const [cardList, setCardList] = useState([]) ;
    return (
        <cardContext.Provider value={{cardList, setCardList}}>
            {children}
        </cardContext.Provider>
    )
}

export default ContextWrapper