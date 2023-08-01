import React from 'react';


const ResultsList = ({ searchResults }) => {
    return (
        <div>
            <h3>Book Search Results:</h3>
            {searchResults.map((items, index) => (
                <div key={index}>
                    <h4>{items.volumeInfo.title}</h4>
                </div>
            ))}
        </div>
      );
}
 
export default ResultsList;