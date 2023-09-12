import React, { useState, useContext } from 'react';
import { AffirmationsContext } from '../form';

import List from '@/components/utils/list'; 

function AffirmationOption({ itemData: option })
{
  const { affirmations, setAffirmations } = useContext(AffirmationsContext);
  const { options, setOptions, affirmation } = useContext(OptionContext);

  function setAnswer(answer)
  {
    const affirmationsCopy = structuredClone(affirmations).map(listAffirmation =>
    {
      if (listAffirmation.id === affirmation.id)
        listAffirmation.answer = answer;

      return listAffirmation;
    })

    const optionsCopy = structuredClone(options).map(listOption =>
    {
      if (listOption.id === option.id)
        listOption.selected = true;
      
      else
        listOption.selected = false;

      return listOption;
    });

    setAffirmations(affirmationsCopy);
    setOptions(optionsCopy);
  }

  return(
    <div 
      className={`affirmation__option ${option.selected ? 'affirmation__option--selected' : ''}`}
      id={ option.id }
      onClick={ () => {setAnswer(option.answer)} }
    />
  )
}

export const OptionContext = React.createContext();

export default function Affirmation({ itemData: affirmation })
{
  const [options, setOptions] = useState(
  [
    { id: `${affirmation.id}:d2`, answer: 'completely_disagree', selected: false },
    { id: `${affirmation.id}:d1`, answer: 'strongly_disagree'  , selected: false },
    { id: `${affirmation.id}:d0`, answer: 'somewhat_disagree'  , selected: false },
    { id: `${affirmation.id}:ns`, answer: 'not_sure'           , selected: false },
    { id: `${affirmation.id}:a0`, answer: 'somewhat_agree'     , selected: false },
    { id: `${affirmation.id}:a1`, answer: 'strongly_agree'     , selected: false },
    { id: `${affirmation.id}:a2`, answer: 'completely_agree'   , selected: false }
  ]);


  return (
    <div className="affirmation">
      <h1 
        className="affirmation__header"
        children={ affirmation.content }
      />

      <OptionContext.Provider value={{ options, setOptions, affirmation }}>
        <List
          className="affirmation__options"
          ids={`list:${affirmation.id}`}
          elements={ options }
          ListItem={ AffirmationOption }
        />
      </OptionContext.Provider>
    </div>
  )
}