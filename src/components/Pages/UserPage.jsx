import React from "react";
import './UserPageStyles.css';

const UserPage = () => {
    return (
        <div className="flex-container">
            <div className="user-left">Content</div>
            <div className="user-right">
                <div style={{fontSize:"40px"}}>Favorites</div>
                <div className="favourites">
                    <div className="card">Card 1</div>
                    <div className="card">Card 2</div>
                </div>
                <div style={{fontSize:"40px"}}>Reviews</div>
                <div className="reviews">Content</div>
            </div>
        </div>
    )
}

export default UserPage;