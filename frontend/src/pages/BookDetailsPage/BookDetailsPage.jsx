import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetailsPage = (props) => {

    const { bookId } = useParams();

    const [bookDetails, setBookDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getBookDetails()
    }, []);

    const getBookDetails = async () => {
        try {
            let response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
            setBookDetails(response.data)
            setIsLoading(false)
        } catch (error) {
            console.log("Error in getBookDetails", error)
        }
    };



    return (
        <div className='container'>
            {isLoading ?(
                <h1>L O A D I N G .................................</h1>
            ) : (
                <div>
                    <img src={bookDetails.volumeInfo.imageLinks.thumbnail}/>
                    <h4>
                        {bookDetails.volumeInfo.title}
                    </h4>
                    <h4>
                        {bookDetails.volumeInfo.authors}
                    </h4>
                    <h4>
                        {bookDetails.volumeInfo.description}
                    </h4>
                </div>
            )};
        </div>
    );
}
 
export default BookDetailsPage;
