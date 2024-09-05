import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



const Main = () => {
    return (
        <div>
            <h1>Main Page</h1>
            <Link to='/main/myplant'>
                <button>+ Add Plant</button>
            </Link>
        </div>
    );


};

export default Main;