/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import LoadingSpinner from '../../../../Components/UI/LoadingSpinner';
import {useCollection} from '../../../../hooks/useCollection'
import './generalentries.css';
import moment from 'moment';

function GeneralEntries() {
  
const {documents,error}=useCollection("generalEntry");

  

  const renderGeneralEnrties = () => {
    
    return documents && documents.map((arr,index)=>{
      
      
        
         const {typeA ,debitInfo,debit,}=arr[0];
         
         const {typeB ,creditInfo,credit , }=arr[1];
         const date=moment(arr.createdAt.toDate().toString()).format('Do MMM YY');
         const id=arr.id;
        
         
       
          
          return(
            <div className='entry' >
              
              <h6>{id}</h6>
              <h6>{date}</h6>
              
              <h6>{debitInfo}=("{typeA}"")</h6>
              
              <h6>{creditInfo}=("{typeB}")</h6>
              <h6>{debit}</h6>
              <h6>{credit}</h6>
            
             
           </div>
          )

          

          
        
      
      
    })
   
  };

  return (
    
    <div className='general-entry-container'>
           <h3>General Entries</h3>
           <div className='entry ' id='fixedheadings'>
            <h6>ID</h6>
            <h6>Date</h6>
            
            <h6>Debit Account Name</h6>
            
            <h6>Credit Account Name</h6>
            <h6>Debit Amount</h6>
            <h6>Credit Amount</h6>
            
           </div>
          {
            renderGeneralEnrties()
          }
      
    </div>
    
  );
}

export default GeneralEntries;
