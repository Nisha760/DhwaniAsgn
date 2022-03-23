import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { cardContext } from '../context/cardContext';

function CardInput() {
  const { setCardList, cardList } = useContext(cardContext);
  const [number, setNumber] = useState(['', '', '', '']);


  const handleCardInput = (e) => {
    
    if (e.target.value.length > 16) {
      e.target.value = '';
      return;
    }
    
    //checking if input is valid integer
    if (e.target.value.charCodeAt(e.target.value.length - 1) < 48 || e.target.value.charCodeAt(e.target.value.length - 1) > 57) {
      e.target.value = e.target.value.substr(0, e.target.value.length - 1);
      return;
    }
    if (e.target.name == '1' && e.target.value.length === 16) {

      let index = 0;
      let cardNumber = e.target.value;
      let card = [];
      for (let i = 1; i <= 4; i++) {
        e.currentTarget.querySelector(`input[name = '${i}']`).value = cardNumber.substr(index, 4);
        card.push(cardNumber.substr(index, 4));
        index += 4;
      }
      e.currentTarget.querySelector(`input[name = '4']`).focus();
      setNumber(card);
      return;

    }

    setNumber(prev => {
      let curr = [...prev];
      curr[e.target.name - 1] = e.target.value;

      return curr;
    })
    if (e.target.value.length === 4) {
      if (e.target.nextSibling)
        e.target.nextSibling.focus();
    }
    else if (e.target.value.length > 4) {
      let lastVal = e.target.value[e.target.value.length - 1];
      e.target.value = e.target.value.substr(0, e.target.value.length - 1);
      if (e.target.nextSibling) {
        e.target.nextSibling.focus();
        if (e.target.nextSibling.value.length === 0)
          e.target.nextSibling.value = lastVal;
      }

    }

    if (e.target.value.length === 0) {
      if (e.target.previousSibling)
        e.target.previousSibling.focus();
    }

  }

  const handleKeyShift = (e) => {
    //accessing left right arrow

    //can shift on next input only previous input is complete
    if (e.keyCode === 39 && e.target.value.length === 4) {
      if (e.target.nextSibling)
        e.target.nextSibling.focus();
    }

    if (e.keyCode === 37) {
      if (e.target.previousSibling)
        e.target.previousSibling.focus();
    }
  }


  //onsubmit
  const handleSubmit = () => {
    
    const inputArr = document.querySelectorAll('input[type="text"]')
    for(let i = 0; i < inputArr.length; i++){
      inputArr[i].value = ''
    }
    inputArr[0].focus() ;
    //emptying all input for new user input after every submit



    let cardStr = number.join(' ');
    
    if (cardStr.length === 19 && !cardList.includes(cardStr)) { // already existing card not added again
      setCardList(prev => {
        let curr = [...prev];
        curr.push(cardStr);
        return curr;
      })
    } 
  }
  return (
    <div className='card-input'>
      <h3>Enter Card Number</h3>
      <div className='input-wrapper' onChange={handleCardInput} onKeyUp={handleKeyShift}>
        <input type='text' name='1' ></input>
        <input type='text' name='2' ></input>
        <input type='text' name='3' ></input>
        <input type='text' name='4' ></input>
      </div>

      <button onClick={handleSubmit}>Save Card</button>

    </div>
  )
}

export default CardInput;