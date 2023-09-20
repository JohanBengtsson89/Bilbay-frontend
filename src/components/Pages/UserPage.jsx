import React from "react";
import './UserPageStyles.css';

const UserPage = () => {
    return (
        <div className="flex-container">
            <div className="user-left">Content</div>
            <div className="user-right">
                <div>Favorites</div>
                <div className="favourites">Content</div>
                <div>Reviews</div>
                <div className="reviews">Content</div>
            </div>
        </div>
    )
}

export default UserPage;