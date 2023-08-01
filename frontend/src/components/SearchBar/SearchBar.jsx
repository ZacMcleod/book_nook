import React from 'react';





const SearchBar = ({searchTerm = "", setSearchTerm, handleSubmit}) => {
    

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Search a Book by Title: </label>
            <input
             type='text' 
             placeholder='Enter a book title'
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type='submit'>Search</button>
        </form>
      );
}
 
export default SearchBar;