import React from "react";
import {useLocation} from "react-router-dom";

const Home: React.FC = _ => {
    const location = useLocation();
    console.log(location.pathname)
    return (
        <div>
            <h1>OI</h1>
        </div>
    )
}

export default Home;