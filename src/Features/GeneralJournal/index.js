import React from 'react';

// Components
// import FormModal from './Components/FormModal/index';
import GeneralEntries from './Components/GeneralEntries';
import FormModal from '../../Components/FormModal/FormModal';

// Styles


const GeneralEntriesContainer = props => {
 


  return (
    <div>
       <FormModal />
       <GeneralEntries/>
    </div>
  );
};

export default GeneralEntriesContainer;
