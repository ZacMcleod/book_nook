import React from 'react';
import { Link } from 'react-router-dom';


const ResultsList = ({ searchResults }) => {
    return (
        <div>
            <h3>Book Search Results:

            </h3>
            {searchResults.map((items, index) => (
                <Link to={`/details/${items.id}`} key={index}> 
                    <div>
                        <h4>{items.volumeInfo.title}</h4>
                    </div>
                </Link>
            ))}
        </div>
      );
}
 
export default ResultsList;