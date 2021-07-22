import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
    return(
        <div className="border-bottom">
            <header className="container">
                <nav>
                    <ul>
                        <li>
                            <Link to="/about-coronavirus">What's Coronavirus</Link>
                        </li>
                        <li>
                            <Link to="/top-countries">Top Countries</Link>
                        </li>
                        <li>
                            <Link to="/about-me">About Me</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header;