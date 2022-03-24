import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import { cardContext } from '../context/cardContext'
import Card from './Card';

function CardList() {
    const {cardList} = useContext(cardContext) ;
    
  return (
    <div className='card-list'>
        <h3>Your Cards</h3>

        <div className='list'>
            {
                cardList.map((ele)=>{
                    return (
                        <Card key={ele} value={ele}/>
                    )
                })
            }
        </div>
        
    </div>
  )
}

export default CardList