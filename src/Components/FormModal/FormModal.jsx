/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useId } from 'react'
import { useAuthContext } from './../../hooks/useAuthContext';
import { useFirestore } from './../../hooks/useFirestore';
import './FormModal.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormInput from '../FormInput/FormInput';



function FormModal() {
   
  const { dispatch, generalEntry } = useAuthContext();
  const { addDocument, response } = useFirestore("generalEntry")
  const { addDocument :doc, response : resp } = useFirestore("generalEntry")

  const [debitVal, setDebitVal] = useState([
    {
      debitInfo: '',
      debit: '',
      typeA: '',
    },
  ]);

  const [creditVal, setCreditVal] = useState([
    {
      creditInfo: '',
      credit: '',
      typeB: '',
    },
  ]);
  const [error,setError]=useState('');

  const debitInfoChangeHandler = (e, i) => {
    
    const { name, value } = e.target;
    const list = [...debitVal];
    list[i][name] = value;
    setDebitVal(list);
  };

  const creditInfoChangeHandler = (e, i) => {
    const { name, value } = e.target;
    const list = [...creditVal];
    list[i][name] = value;
    setCreditVal(list);
  };

  const removeClickHandler = (val, index) => {
    if (val === 'd') {
      const list = [...debitVal];
      list.splice(index, 1);
      setDebitVal(list);
    }
    else {
      const list = [...creditVal];
      list.splice(index, 1);
      setCreditVal(list);
    }
  };

  const addClickHandler = val => {
    if (val === 'd') {
      setDebitVal([
        ...debitVal,
        {
          debitInfo: '',
          debit: '',
          typeA: '',
        },
      ]);
    } else {
      setCreditVal([
        ...creditVal,
        {
          creditInfo: '',
          credit: '',
          typeB: '',
        },
      ]);
    }
  };

  const postGeneralEntryHandler = async () => {
 
    const debitValue=debitVal.reduce((acc,{debit})=>acc+ +debit,0);
    const creditValue=creditVal.reduce((acc,{credit})=>acc+ +credit,0);
    const id =Math.floor(Math.random() * 100);


    if(debitValue===creditValue){
    const entriesToPost = [...debitVal.map(debitEntry => debitEntry), ...creditVal.map(creditEntry => creditEntry)];
    console.log(entriesToPost);
    dispatch({type: 'General_Entry', payload: entriesToPost});
    await addDocument(entriesToPost);
    }else{
      setError('Debit and Credit value should be equal');
    }
  }

  return (
    <div className='form-container' >
      <h2> General-Journal Entries </h2>
      
      <form className="overallform">
        {/* {debitInput} */}
        {/* {creditInput} */}
        {debitVal.map( (debtValInput, index) => (
          <FormInput 
            inputFields ={debtValInput} 
            Info={"'Debit Info'"} 
            Name={"Debit"} 
            Type={"Type A"} 
            onChange={debitInfoChangeHandler}
            index={index}
            removeClickHandler={removeClickHandler}
            />
        ))}
        {creditVal.map( (creditValValInput, index) => (
          <FormInput 
            inputFields ={creditValValInput} 
            Info={"'Debit Info'"} 
            Name={"Debit"} 
            Type={"Type A"} 
            onChange={creditInfoChangeHandler}
            index={index}
            removeClickHandler={removeClickHandler}
            />
        ))}
      </form>
      <br />
      <div className='submit-error'>
        
          <div className='entry'>
            <div className='center' >
              <label>Add Debit Entry </label>
            </div>
            <div className='center'>
              <button
                className={`btn btn-primary `}
                onClick={() => addClickHandler('d')}
              >
                +
            </button>
            </div>
          </div>
        
        
          <div  className='entry'>
            <div >
              <label>Add Credit Entry </label>
            </div>
            <div>
              <button
                className={` btn btn-primary`}
                onClick={() => addClickHandler('c')}
              >
                +
            </button>
            
          </div>
        </div>
        <div className='submit-section'>
        
          <div >
           
              <p className="alert alert-warning" hidden={!error}>{error}</p>
            <button type="submit" className={`btn btn-primary `} onClick={postGeneralEntryHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <hr/>
      
      <br/>
      
      <h2> Adjusting  Entries </h2>
        <form className="overallform">
      {/* {debitInput}
      {creditInput} */}
      {debitVal.map( (debtValInput, index) => (
          <FormInput 
            inputFields ={debtValInput} 
            Info={"'Debit Info'"} 
            Name={"Debit"} 
            Type={"Type A"} 
            onChange={debitInfoChangeHandler}
            index={index}
            removeClickHandler={removeClickHandler}
            />
        ))}
        {creditVal.map( (creditValValInput, index) => (
          <FormInput 
            inputFields ={creditValValInput} 
            Info={"'Debit Info'"} 
            Name={"Debit"} 
            Type={"Type A"} 
            onChange={creditInfoChangeHandler}
            index={index}
            removeClickHandler={removeClickHandler}
            />
        ))}
    </form>
    <div className='submit-error'>
        
          <div className='entry'>
            <div className='center' >
              <label>Add Debit Entry </label>
            </div>
            <div className='center'>
              <button
                className={`btn btn-primary `}
                onClick={() => addClickHandler('d')}
              >
                +
            </button>
            </div>
          </div>
        
        
          <div  className='entry'>
            <div >
              <label>Add Credit Entry </label>
            </div>
            <div>
              <button
                className={` btn btn-primary`}
                onClick={() => addClickHandler('c')}
              >
                +
            </button>
            
          </div>
        </div>
        <div className='submit-section'>
        
          <div >
           
              <p className="alert alert-warning" hidden={!error}>{error}</p>
            <button type="submit" className={`btn btn-primary `} onClick={postGeneralEntryHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default FormModal
