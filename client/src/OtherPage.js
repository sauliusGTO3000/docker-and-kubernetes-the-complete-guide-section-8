import React from 'react';
import { Link } from 'react-router-dom';

const otherPage = () => {
    return (
        <div>
            This is another page!
            <Link to="/"> back to homepage </Link>
        </div>
    );
}

export default otherPage;