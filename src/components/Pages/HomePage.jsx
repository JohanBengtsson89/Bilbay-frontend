// import React from 'react'
// import './HomePage.css'; 

// const cardsData = [
//   {
//     id: 1,
//     photo: 'https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/car-photography/car-photography_fb-img_1200x800.jpg',
//     name: 'Lamporgini Avenatdor',
//     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores magni delectus ex quo.',
//   },
//   {
//     id: 2,
//     photo: 'https://www.usnews.com/object/image/00000187-05a8-d67e-a38f-2ff8100b0000/2023-chevrolet-corvette-z06-13.jpg?update-time=1679427111996&size=responsive640',
//     name: 'Cls MacLauren',
//     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores magni delectus ex quo.',
//   },
//   {
//     id: 3,
//     photo: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
//     name: 'Ford Mustang GT',
//     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores magni delectus ex quo.',
//   },
// ];

// const HomePage = () => {
//   return (
//     <div>
//     <h2 className='title'>Bilbay auction</h2>
//     <div className="container1">
//       <div className="card-grid">
//         {cardsData.map((card) => (
//           <div key={card.id} className="card">
//             <img src={card.photo} alt={card.name} className="card-photo" />
//             <h2 className="card-name">{card.name}</h2>
//             <p className="card-description">{card.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//     <button className='button1'>More Auction</button>
    
//     </div>
//   )
// }

import { useAuctions } from "../../context/Context";
import { Auctions } from "./Auctions";

const HomePage = () => {
  const { auctions, loading, error } = useAuctions();

  return (
    <Auctions filteredAuctions={auctions}/> 
  )
};

export default HomePage;
