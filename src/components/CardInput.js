import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { cardContext } from '../context/cardContext';

function CardInput() {
  const { setCardList, cardList } = useContext(cardContext); //cardList is an array that stores all the cards 
  const [number, setNumber] = useState(['', '', '', '']); //stores current entered card number
  const [exist, setExists] = useState(false); //stores state for existing card
  const [valid, setValid] = useState(true); // stores vaid or invalid state for card number


  const handleCardInput = (e) => {

    //check for not entering number greater than length 16
    if (e.target.value.length > 16) {
      e.target.value = '';
      return;
    }

    //checking if input is valid integer
    if (e.target.value.charCodeAt(e.target.value.length - 1) < 48 || e.target.value.charCodeAt(e.target.value.length - 1) > 57) {
      e.target.value = e.target.value.substr(0, e.target.value.length - 1);
      return;
    }


    // logic for pasting card number of length 16
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

    // setting state for card number 
    setNumber(prev => {
      let curr = [...prev];
      curr[e.target.name - 1] = e.target.value;
      return curr;
    })


    //handling focus if more than 4 digit is entered
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

    //handling focus for previous element when all digits in an input is deleted
    if (e.target.value.length === 0) {
      if (e.target.previousSibling)
        e.target.previousSibling.focus();
    }

  }

  const handleKeyShift = (e) => {
    //accessing left right arrow

    //can shift on next input only if previous input is complete
    if (e.keyCode === 39 && e.target.value.length === 4) {
      if (e.target.nextSibling)
        e.target.nextSibling.focus();
    }

    if (e.keyCode === 37) {
      if (e.target.previousSibling)
        e.target.previousSibling.focus();
    }
  }



  const handleSubmit = () => {

    let cardStr = number.join(' ');

    // already existing card not added again
    if (cardList.includes(cardStr)) {
      setExists(true);
      setValid(true) ;
      return;
    }
    //check for correct input
    if (cardStr.length !== 19) {
      setValid(false);
      setExists(false);
      return ;
    }
     
      setCardList(prev => {
        let curr = [...prev];
        curr.push(cardStr);
        return curr;
      })
      setExists(false) ;
      setValid(true) ;

    //setting all input to empty string after submition of card number
    const inputArr = document.querySelectorAll('input[type="text"]')
    for (let i = 0; i < inputArr.length; i++) {
      inputArr[i].value = ''
    }
    inputArr[0].focus();
  }



  return (
    <div className='card-input'>
      <h3>Enter Card Number</h3>
      {
        exist &&
        <div className='exist'>
          This card is already added
        </div>
      }
      {
        !valid &&
        <div className='valid'>
          Please enter a valid card number
        </div>
      }

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