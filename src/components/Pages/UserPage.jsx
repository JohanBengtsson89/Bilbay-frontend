import React from "react";
import { Paper, TextField, Button } from '@mui/material';

import './UserPageStyles.css';

const UserPage = () => {

    // Tillfällig array för favourites
    const favourites = [ 
        {id: 1, name: "car1"}, 
        {id: 2, name: "car2"}, 
        {id: 3, name: "car3"}
        ];

    return (
        <>
        <div className="flex-container">
            <div className="user-left" > 
            <TextField id="outlined-basic" label="First name" variant="outlined"/><br />
            <TextField id="outlined-basic" label="Last name" variant="outlined"/><br />
            <TextField id="outlined-basic" label="Email" variant="outlined"/><br />
            <TextField id="outlined-basic" label="Username" variant="outlined"/><br />
            <Button type="submit" variant="contained">Update</Button><br /><br />

            <TextField id="outlined-basic" label="Bank name" variant="outlined"/><br />
            <TextField id="outlined-basic" label="Bank account nr" variant="outlined"/><br />
            <Button type="submit" variant="contained">Update</Button><br /><br />

            <TextField id="outlined-basic" label="Card type" variant="outlined"/><br />
            <TextField id="outlined-basic" label="Card nr" variant="outlined"/><br />
            <TextField id="outlined-basic" label="Expiry date" variant="outlined"/><br />
            <Button type="submit" variant="contained">Update</Button><br /><br />
            </div>
            <div className="user-right">
                <div style={{fontSize:"40px"}}>Favorites</div>
                
                    <div className="favourites">
                        {favourites.map((favourite) => ( 
                        <div key={favourite.id}>
                        <div className="card">{favourite.name}</div>
                        </div> ))} 
                    
                    </div>

                    {/* <div className="card">Card 1</div>
                    <div className="card">Card 2</div> */}
                
                <div style={{fontSize:"40px"}}>Reviews</div>
                <div className="reviews">Content</div>
            </div>
        </div>
        </>
    )
}

export default UserPage;