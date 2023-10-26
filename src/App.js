import './App.css'
import React, { useState } from 'react';

const movies = [
  {
    name: 'Avenger',
    price: {
      Standard: 10,
      Premium: 15,
    },
    occupied: [20, 21, 30, 1, 2, 8],
  },
  {
    name: 'Joker',
    price: {
      Standard: 12,
      Premium: 18,
    },
    occupied: [9, 41, 35, 11, 65, 26],
  },
  {
    name: 'Toy story',
    price: {
      Standard: 8,
      Premium: 12,
    },
    occupied: [37, 25, 44, 13, 2, 3],
  },
  {
    name: 'The Lion King',
    price: {
      Standard: 9,
      Premium: 14,
    },
    occupied: [10, 12, 50, 33, 28, 47],
  },
];

const seats = Array.from({ length: 8 * 8 }, (_, i) => i);



export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTicketType, setSelectedTicketType] = useState('Standard');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  

  const handleProceed = () => {
    if (selectedSeats.length > 0) {
      alert('Your tickets have been booked successfully.')
    } else {
      alert('Please select at least one seat before proceeding.');
    }
  };

  return (
    <div className="App">
      <Movies
        movie={selectedMovie}
        onChange={(movie) => {
          setSelectedSeats([]);
          setSelectedMovie(movie);
        }}
        selectedTicketType={selectedTicketType}
        onTicketTypeChange={(type) => setSelectedTicketType(type)}
        onQuantityChange={(quantity) => setSelectedQuantity(quantity)}
      />
      <ShowCase />
      <Cinema
        movie={selectedMovie}
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}
        selectedTicketType={selectedTicketType}
        selectedQuantity={selectedQuantity}
      />

      <p className="info">
        You have selected <span className="count">{selectedSeats.length}</span> seats for the price of{' '}
        <span className="total">
          {selectedSeats.length * selectedMovie.price[selectedTicketType] * selectedQuantity}$
        </span>
      </p>
      <button className='red-button' onClick={handleProceed}>Proceed</button>
    </div>
  );
}

function Movies({ movie, onChange, selectedTicketType, onTicketTypeChange, onQuantityChange, selectedQuantity }) {
  return (
    <div className="Movies">
      <label htmlFor="movie">Pick a movie</label>
      <select
        id="movie"
        value={movie.name}
        onChange={(e) => {
          onChange(movies.find((movie) => movie.name === e.target.value));
        }}
      >
        {movies.map((movie) => (
          <option key={movie.name} value={movie.name}>
            {movie.name} - Standard (${movie.price.Standard}) / Premium (${movie.price.Premium})
          </option>
        ))}
      </select>
      <label htmlFor="ticketType">Select Ticket Type</label>
      <select
        id="ticketType"
        value={selectedTicketType}
        onChange={(e) => {
          onTicketTypeChange(e.target.value);
        }}
      >
        <option value="Standard">Standard</option>
        <option value="Premium">Premium</option>
      </select>
      <label htmlFor="quantity">Select Quantity</label>
      <input
        id="quantity"
        type="number"
        value={selectedQuantity}
        onChange={(e) => {
          onQuantityChange(e.target.value);
        }}
        min="1"
        max="10"
      />
    </div>
  );
}

function ShowCase() {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat available" /> <small>Available</small>
      </li>
      <li>
        <span className="seat selected" /> <small>Your Selections</small>
      </li>
      <li>
        <span className="seat occupied" /> <small>Unavailable</small>
      </li>
    </ul>
  );
}

function Cinema({ movie, selectedSeats, onSelectedSeatsChange, selectedTicketType, selectedQuantity }) {
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);

    if (isSelected) {
      onSelectedSeatsChange(selectedSeats.filter(selectedSeat => selectedSeat !== seat));
    } else if (selectedSeats.length < selectedQuantity) {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }

  return (
    <div className="Cinema">
      <div className="seats">
        {seats.map(seat => {
          const isSelected = selectedSeats.includes(seat);
          const isOccupied = movie.occupied.includes(seat);

          return (
            <span
              tabIndex="0"
              key={seat}
              className={
                'seat ' +
                (isSelected ? 'selected' : '') +
                (isOccupied ? 'occupied' : '')
              }
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
              onKeyPress={
                isOccupied
                  ? null
                  : (e) => {
                      if (e.key === 'Enter') {
                        handleSelectedState(seat);
                      }
                    }
              }
            />
          );
        })}
      </div>
    </div>
  );
}
