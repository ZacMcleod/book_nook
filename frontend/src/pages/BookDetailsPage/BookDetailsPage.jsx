import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import axios from 'axios';


const BookDetailsPage = (props) => {

    const { bookId } = useParams();

    const [bookDetails, setBookDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingToo, setIsLoadingToo] = useState(true);
    const [isLoadingThree, setIsLoadingThree] = useState(true);
    const [reviewsFavorites, setReviewFavorites] = useState({});
    const [reviews, setReviews] = useState([{}]);



    const [user, token] = useAuth();

    useEffect(() => {
        getBookDetails();
        getReviewFavorites();
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

    const getReviewFavorites = async () => {
        try {
            let response = await axios.get(`http://127.0.0.1:5000/api/books/${bookId}`, {
                headers : {
                    Authorization : "Bearer " + token,
                }});
            setReviewFavorites(response.data);
            setReviews(response.data.reviews);
            setIsLoadingToo(false);
            } catch (error) {
                console.log("Error in getReviewFavorites", error)
            }
        };

        const handleButton = ( async (e) => {
            e.preventDefault();
            try {
                let response = await axios.post('http://127.0.0.1:5000/api/user_favorites', {
                    "book_id" : bookDetails.id, 
                    "title" : bookDetails.volumeInfo.title, 
                    "thumbnail_url": bookDetails.volumeInfo.imageLinks.thumbnail
                }, {
                    headers : {
                        Authorization : "Bearer " + token,
                    }
                });
                setIsLoadingThree(false);
                getReviewFavorites();
                
            } catch (error) {
                console.log("Error in handleButton", error)
            }


        })

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
            {isLoadingToo ? (
                <h4>fetching from database</h4>
            ) : (
                <div>
                    {reviews.map((review, index) => {
                        return (<p key={index}>
                            {review.text}
                        </p>);
                    }
                    )}
                    <p>
                        {reviewsFavorites.average_rating}
                    </p>
                    <p>
                        {reviewsFavorites.is_favorited ?("This is a favorite of yours."):( <button onClick={handleButton}>favorite</button>)}
                    </p>
                </div> 
            )}
        </div>
    );
}
 
export default BookDetailsPage;
