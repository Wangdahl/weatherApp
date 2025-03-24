import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch}) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query.trim());
    };

    return (
        <form className='search-bar' onSubmit={handleSubmit}>
            <input 
                type='text'
                placeholder='Enter location'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type='submit'>Search</button>
        </form>
    )
}

export default SearchBar;