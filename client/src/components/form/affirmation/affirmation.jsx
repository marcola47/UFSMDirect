import React, { useState, useContext, useEffect } from 'react';
import { AffirmationsContext } from '../form';

import List from '@/components/utils/list/list'

export const OptionContext = React.createContext();

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
      className={`${option.className} ${option.selected ? `option--selected` : ''}`}
      id={ option.id }
      onClick={ () => {setAnswer(option.answer)} }
    />
  )
}

export default function Affirmation({ itemData: affirmation })
{
  const [options, setOptions] = useState(
  [
    { id: `${affirmation.id}:d2`, answer: 'completely_disagree', selected: false, className: 'option option--n3'      },
    { id: `${affirmation.id}:d1`, answer: 'strongly_disagree'  , selected: false, className: 'option option--n2'      },
    { id: `${affirmation.id}:d0`, answer: 'somewhat_disagree'  , selected: false, className: 'option option--n1'      },
    { id: `${affirmation.id}:ns`, answer: 'not_sure'           , selected: false, className: 'option option--neutral' },
    { id: `${affirmation.id}:a0`, answer: 'somewhat_agree'     , selected: false, className: 'option option--p1'      },
    { id: `${affirmation.id}:a1`, answer: 'strongly_agree'     , selected: false, className: 'option option--p2'      },
    { id: `${affirmation.id}:a2`, answer: 'completely_agree'   , selected: false, className: 'option option--p3'      }
  ]);

  return (
    <div className="affirmation">
      <div 
        className="affirmation__header"
        children={ affirmation.content }
      />

      <div className="affirmation__content">
        <OptionContext.Provider value={{ options, setOptions, affirmation }}>
          <List
            className="affirmation__options"
            ids={`list:${affirmation.id}`}
            elements={ options }
            ListItem={ AffirmationOption }
          />
        </OptionContext.Provider>

        <div 
          className="affirmation__label affirmation__label--negative"
          children="Discordo"
        />

        <div
          className="affirmation__label affirmation__label--positive"
          children="Concordo"
        />
      </div>
    </div>
  )
}