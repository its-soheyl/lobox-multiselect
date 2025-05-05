import { useState } from 'react';
import { MultiSelect } from './components';

import './App.css';

function App() {

  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([]);

  const options = [
    {
      id: 1, label: 'Education 🎓', value: 'education'
    },
    {
      id: 2, label: 'Yeeeah, science! ⚗️', value: 'science'
    },
    {
      id: 3, label: 'Art 🎭', value: 'art'
    },
    {
      id: 4, label: 'Sport ⚽️', value: 'sport'
    },
    {
      id: 5, label: 'Games 🎮', value: 'games'
    },
    {
      id: 6, label: 'Health 🏥', value: 'health'
    },
  ]

  return (
    <MultiSelect placeholder='science' options={options} value={selectedValues}
      onChange={(value) => setSelectedValues(value)} />
  )
}

export default App
