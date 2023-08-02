import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";



const FavoritesPage = () => {
    const [user, token] = useAuth();
    const [favoriteResponse, setFavoriteResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getFavorites()
    }, []);

    const getFavorites = (async () => {
        try {
            let response = await axios.get("http://127.0.0.1:5000/api/user_favorites", {
                headers: {
                    Authorization: "Bearer " + token,
                }
            });
            setFavoriteResponse(response.data);
            setIsLoading(false)
        } catch (error) {
            console.log("Error encountered while trying to catch favorites", error)
        }
    })
    return ( 
        <div>
            {isLoading ? (
                <h4>L O A D I N G . . . . .</h4>
            ) : (
                favoriteResponse.map((book, index) => {
                    return(
                    <div key={index}>
                        <img src={book.thumbnail_url}/>
                        <h4>
                            {book.title}
                        </h4>
                    </div>)
                })
            )}
        </div>
     );
}
 
export default FavoritesPage;