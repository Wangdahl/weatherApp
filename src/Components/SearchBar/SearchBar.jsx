import { useState } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchBar({ onSearch}) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query.trim());
    };

    return (
        <form className='search-bar' onSubmit={handleSubmit}>
            <input 
                className='searchField'
                type='text'
                placeholder='Enter location'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className='roundBtn' type='submit'><FontAwesomeIcon id='mIcon' icon={faMagnifyingGlass} /></button>
        </form>
    )
}

export default SearchBar;