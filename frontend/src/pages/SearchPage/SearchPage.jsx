import { useState } from "react";
import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";
import ResultsList from "../../components/ResultsList/ResultsList";


const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const searchBook = async () => {
        try{
            let response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
            setSearchResults(response.data.items)

        } catch (error){
            console.log('Error in searchPage',error);
        }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      searchBook();  
    };

    return (
        <div className="container">
            <h1>Search for Books by Title</h1>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSubmit={handleSubmit} 
            />
            <ResultsList searchResults={searchResults}/>
        </div>
      );
}
 
export default SearchPage;