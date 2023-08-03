import React, { useEffect, useState } from "react";
import { clearSearchResults, fetchSearchResults } from "../../../store/search";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function SearchBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchText, setSearchText] = useState();
    const [timer,setTimer] = useState("");

    const searchResults = useSelector(state => state.search)

    console.log(searchResults.songs)

    useEffect(() => {
        dispatch(clearSearchResults());
    }, [])
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchText(query);

        clearTimeout(timer);

        if (query.trim() !== "") {
            const newTimer = setTimeout(() => dispatch(fetchSearchResults(query)), 300);
            // const newTimer = setTimeout(() => history.push({pathname: '/search', search: `?query=${query}`}))
            setTimer(newTimer);
        } else {
            dispatch(clearSearchResults());
        }
    }
    
    return (
        <span className="searchBarContainer">
            <input
                type="text"
                id="searchInput"
                name="search"
                placeholder="What do you want to listen to?"
                value={searchText}
                onKeyDown={(e) => {
                    if (e.keyCode === 32) {
                        e.stopPropagation();
                    }
                }}
                onChange={handleSearch}></input>


        </span>
    )
}