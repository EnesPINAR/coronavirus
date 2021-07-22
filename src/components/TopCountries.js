import React, { useState, useEffect } from "react";
import AxiosInstance from "../helpers/Axios";
import Loading from "../components/Loading";

const TopCountries = () => {

    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("A to Z");
    const [search, setSearch] = useState("");
    const [searched, setSearched] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [error, setError] = useState();

    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0; // At least Safari 3+: "[object HTMLElementConstructor]"
    var isChrome = !!window.chrome && !isOpera; // Chrome 1+
    var isIE = !!document.documentMode; // At least IE6

    useEffect(() => {
        AxiosInstance.get().then((response) => {
            setCountry(response.data.data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    let searchedCountries = []

    const CountriesList = () => {
        if (isOpera || isChrome) {
            if (sortBy == "A to Z") {
                country.sort((a, b) => {
                    if (a.region.name < b.region.name) {
                        return -1;
                    }
                })
            } else if (sortBy == "Z to A") {
                country.sort((a, b) => {
                    if (a.region.name > b.region.name) {
                        return -1;
                    }
                })
            }
            else if (sortBy == "Min to Max") {
                country.sort((a, b) => {
                    if (a.confirmed < b.confirmed) {
                        return -1;
                    }
                })
            } else if (sortBy == "Max to Min") {
                country.sort((a, b) => {
                    if (a.confirmed > b.confirmed) {
                        return -1;
                    }
                })
            }
        } else if (isFirefox || isSafari) {
            if (sortBy == "A to Z") {
                country.sort((a, b) => {
                    if (a.region.name > b.region.name) {
                        return 1;
                    }
                })
            } else if (sortBy == "Z to A") {
                country.sort((a, b) => {
                    if (b.region.name > a.region.name) {
                        return 1;
                    }
                })
            }
            else if (sortBy == "Min to Max") {
                country.sort((a, b) => {
                    if (a.confirmed > b.confirmed) {
                        return 1;
                    }
                })
            } else if (sortBy == "Max to Min") {
                country.sort((a, b) => {
                    if (b.confirmed > a.confirmed) {
                        return 1;
                    }
                })
            }
        }

        if (isSearched) {
            if (isOpera || isChrome) {
            if (sortBy == "A to Z") {
                searched.sort((a, b) => {
                    if (a.region.name < b.region.name) {
                        return -1;
                    }
                })
            } else if (sortBy == "Z to A") {
                searched.sort((a, b) => {
                    if (a.region.name > b.region.name) {
                        return -1;
                    }
                })
            }
            else if (sortBy == "Min to Max") {
                searched.sort((a, b) => {
                    if (a.confirmed < b.confirmed) {
                        return -1;
                    }
                })
            } else if (sortBy == "Max to Min") {
                searched.sort((a, b) => {
                    if (a.confirmed > b.confirmed) {
                        return -1;
                    }
                })
            }
        } else if (isFirefox || isSafari) {
            if (sortBy == "A to Z") {
                searched.sort((a, b) => {
                    if (a.region.name > b.region.name) {
                        return 1;
                    }
                })
            } else if (sortBy == "Z to A") {
                searched.sort((a, b) => {
                    if (b.region.name > a.region.name) {
                        return 1;
                    }
                })
            }
            else if (sortBy == "Min to Max") {
                searched.sort((a, b) => {
                    if (a.confirmed > b.confirmed) {
                        return 1;
                    }
                })
            } else if (sortBy == "Max to Min") {
                searched.sort((a, b) => {
                    if (b.confirmed > a.confirmed) {
                        return 1;
                    }
                })
            }
        }
            return (
                searched.map((countryInfo) => {
                    return (
                        <tr>
                            {(countryInfo.region.province !== "Unknown") &&
                                <>
                                    <td>
                                        {countryInfo.region.name}
                                        {(countryInfo.region.province && countryInfo.region.province !== "Unknown") && ", " + countryInfo.region.province}
                                    </td>
                                    <td>{countryInfo.confirmed}</td>
                                </>
                            }
                        </tr>)
                })
            )
        } else {
            return (
                country.map((countryInfo) => {
                    return (
                        <tr>
                            {(countryInfo.region.province !== "Unknown") &&
                                <>
                                    <td>
                                        {countryInfo.region.name}
                                        {(countryInfo.region.province && countryInfo.region.province !== "Unknown") && ", " + countryInfo.region.province}
                                    </td>
                                    <td>{countryInfo.confirmed}</td>
                                </>
                            }
                        </tr>)
                })
            )
        }
    }

    const selectSortBy = (event) => {
        setSortBy(event.target.value)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        if (search !== "") {
            country.filter((val) => {
                if (val.region.name.toLowerCase().includes(search.toLowerCase())) {
                    searchedCountries.push(val)
                    setSearched(searchedCountries)
                    setIsSearched(true)
                }
            })
        } else if (search == "") {
            country.filter((val) => {
                searchedCountries.push(val)
                setCountry(searchedCountries)
                setIsSearched(false)
            })
        }
    }

    const searchCountry = (event) => {
        setSearch(event.target.value)
    }

    if (loading) {
        return (
            <Loading></Loading>
        )
    } else if (error) {
        return ("hata")
    } else {
        return (
            <div className="container coronavirusList">

                <table>
                    <tbody>
                        <tr>
                            <th>
                                <form onSubmit={handleFormSubmit}>
                                    <span className="searchContainer">
                                        <input type="text" placeholder="Search any country here" className="searchInput" onChange={searchCountry} value={search} />
                                        <button type="submit" className="formSubmit">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                            </svg>
                                        </button>
                                    </span>
                                </form>
                            </th>
                            <th>
                                <select name="sortBy" id="casesFilter" onChange={selectSortBy}>
                                    <option value="A to Z">A to Z</option>
                                    <option value="Z to A">Z to A</option>
                                    <option value="Min to Max">Min to Max</option>
                                    <option value="Max to Min">Max to Min</option>
                                </select>
                            </th>
                        </tr>
                        <tr>
                            <th>Country</th>
                            <th>Cases</th>
                        </tr>
                        <CountriesList></CountriesList>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TopCountries;