import React, { useState } from 'react';

import List from '@/components/utils/list'
import Affirmation from "./affirmation/affirmation";

export const AffirmationsContext = React.createContext();

export default function Form()
{
  const [affirmations, setAffirmations] = useState(
  [
    { id: 'a7b06a75-9503-4f0d-ae0c-d1313a44ea28', content: 'eu gosto de sexo'   , params: ['hardware', 'software', 'infrastructure'] },
    { id: '1f0b6b4c-20ad-46f0-8d87-97c047ea5332', content: 'eu nao gosto de sex', params: ['hardware', 'software', 'infrastructure'] },
    { id: '3674fb4e-c581-4e86-a2a6-9e16690bd275', content: 'eu gosto do gremio' , params: ['software', 'theory', 'design']           },
    { id: '330a1fbe-3abb-40ee-a63a-08e8acf5b407', content: 'eu gosto de vagina' , params: ['logic', 'intuition', 'math']             },
    { id: '64d84c77-7ea5-4e36-8a41-7eb336c6837b', content: 'sou viado putao'    , params: ['chemistry', 'software']                  }
  ]);

  return (
    <div className="form">
      <AffirmationsContext.Provider value={{ affirmations, setAffirmations }}>
        <List
          className="form__affirmations"
          items={ affirmations }
          elements={ affirmations }
          ListItem={ Affirmation }
        />
      </AffirmationsContext.Provider>
    </div>
  )
}