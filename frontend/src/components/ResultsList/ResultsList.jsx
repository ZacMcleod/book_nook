import React from 'react';
import { Link } from 'react-router-dom';
import './ResultsList.css';


const ResultsList = ({ searchResults }) => {
    return (
        <div>
            <h2>Book Search Results:

            </h2>
            {searchResults.map((items, index) => (
                <Link to={`/details/${items.id}`} key={index}>
                        <div className="border-element">
                            <h4>{items.volumeInfo.title}</h4>
                        </div>
                </Link>
            ))}
        </div>
      );
}
 
export default ResultsList;