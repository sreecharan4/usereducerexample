import { useReducer, useState } from 'react';
import data from './data';

function App() {
  const initialState = { people: data };

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: '',
  });

  const reducer = (state, action) => {
    switch (action.type) {
      case 'REMOVE':
        return {
          ...state,
          people: state.people.filter((person) => person.id !== action.payload),
        };

      case 'ADD': {
        const { id, name, age } = action.payload;
        const newPerson = { id: parseInt(id), name, age };
        return {
          ...state,
          people: [...state.people, newPerson],
        };
      }

      case 'CLEAR':
        return {
          ...state,
          people: [],
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const subHandler = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.age) {
      alert('Please fill in all fields');
      return;
    }
    dispatch({ type: 'ADD', payload: formData });
    setFormData({ id: '', name: '', age: '' }); // Reset the form
  };

  const changeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR' });
  };

  return (
    <>
      <h1>People List using UseReducer</h1>
      <form onSubmit={subHandler}>
        <div>
          <label>Add ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={changeData}
          />
        </div>
        <div>
          <label>Add Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={changeData}
          />
        </div>
        <div>
          <label>Add Age:</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={changeData}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <ul>
        {state.people.map((person) => (
          <li key={person.id}>
            {person.name} - {person.age}
            <button
              onClick={() => dispatch({ type: 'REMOVE', payload: person.id })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button onClick={clearAll}>Clear All</button>
    </>
  );
}

export default App;
