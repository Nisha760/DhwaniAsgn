import React from 'react'
import { useContext } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import { cardContext } from '../context/cardContext'

function Card({ value }) {
    const { setCardList } = useContext(cardContext);
    const handleDelete = () => {
        setCardList(prev => {
            let curr = [...prev];
            let index = curr.indexOf(value);
            curr.splice(index, 1);
            return curr;
        })
    }
    return (
        <div className='card'>
            {value}
            <div>
                <TiDeleteOutline onClick={handleDelete} />
            </div>

        </div>
    )
}

export default Card