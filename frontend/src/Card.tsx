//Pick Card Design

const Card = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="grid grid-cols-4 gap-1 rounded bg-white text-black overflow-hidden border border-gray-400 bg-white rounded-b px-4 justify-between leading-normal">
        <div className="col-span-2 pr-2">
          <img
            className="w-full h-full object-cover"
            src="https://cdn.eaglepeakweb.com/img/projects/blog/Race-for-the-Galaxy.jpg"
            title="Race for the Galaxy"
          />
        </div>
        <div className="col-span-2">
          <p className="text-sm text-gray-600 flex items-center pt-4">
            <span className="inline-block bg-red-200 text-red-800 rounded-full px-2 text-xs font-semibold tracking-wide">
              Strategy
            </span>
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">
            Race for the Galaxy
          </div>
          <div className="flex items-center">
            <svg
              className="fill-current text-gray-500 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="heroicon-ui"
                d="M9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2zm5-10a1 1 0 0 1-1 1h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1z"
              />
            </svg>
            <span className="ml-2 mr-2 text-gray-700 text-sm">2</span>

            <svg
              className="fill-current text-gray-500 w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="heroicon-ui"
                d="M19 10h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2h-2a1 1 0 0 1 0-2h2V8a1 1 0 0 1 2 0v2zM9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2z"
              />
            </svg>
            <span className="ml-2 mr-2 text-gray-700 text-sm">4</span>

            <svg
              className="fill-current text-gray-500 w-3 w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="heroicon-ui"
                d="M9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2zm-1.3-10.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
              />
            </svg>
            <span className="ml-2 mr-2 text-green-600 text-sm">2</span>
          </div>

          <div className="flex items-center pt-8">
            <svg
              className="fill-current text-gray-500 w-3 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="heroicon-ui"
                d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8.41l2.54 2.53a1 1 0 0 1-1.42 1.42L11.3 12.7A1 1 0 0 1 11 12V8a1 1 0 0 1 2 0v3.59z"
              />
            </svg>
            <span className="ml-1 text-gray-700 leading-none text-sm">
              30-60 minutes
            </span>
          </div>

          <div className="mt-2 flex items-center">
            <svg
              className="fill-current text-gray-500 w-3 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="heroicon-ui"
                d="M20 22H4a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h4V8c0-1.1.9-2 2-2h4V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2zM14 8h-4v12h4V8zm-6 4H4v8h4v-8zm8-8v16h4V4h-4z"
              />
            </svg>
            <span className="ml-1 text-yellow-700 leading-none text-sm">
              Medium
            </span>
          </div>
          <div className="mt-2 flex items-center">
            <svg
              className="fill-current text-gray-500 w-3 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="heroicon-ui"
                d="M4.06 13a8 8 0 0 0 5.18 6.51A18.5 18.5 0 0 1 8.02 13H4.06zm0-2h3.96a18.5 18.5 0 0 1 1.22-6.51A8 8 0 0 0 4.06 11zm15.88 0a8 8 0 0 0-5.18-6.51A18.5 18.5 0 0 1 15.98 11h3.96zm0 2h-3.96a18.5 18.5 0 0 1-1.22 6.51A8 8 0 0 0 19.94 13zm-9.92 0c.16 3.95 1.23 7 1.98 7s1.82-3.05 1.98-7h-3.96zm0-2h3.96c-.16-3.95-1.23-7-1.98-7s-1.82 3.05-1.98 7zM12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"
              />
            </svg>
            <span className="ml-1 text-gray-700 leading-none text-sm">
              <a href="https://boardgamearena.com/gamepanel?game=raceforthegalaxy">
                Play online
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

// { <div class="card bg-white border rounded shadow-lg">
//   <div className="suit top text-2xl">♥</div>
//   <div className="rank text-6xl">A</div>
//   <div className="suit bottom text-2xl">♥</div>
// </div>

// <style>
//   .card {
//     width: 100px; /* Adjust based on your preference */
//     height: 150px; /* Adjust based on your preference */
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     align-items: center;
//     padding: 10px;
//   }
//   .suit.top {
//     align-self: flex-start;
//   }
//   .suit.bottom {
//     align-self: flex-end;
//     transform: rotate(180deg);
//   }
//   .rank {
//     /* Additional styling if needed */
//   }
// </style>

// const suits = ['♠', '♣', '♥', '♦'];
// const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// suits.forEach(suit => {
//   ranks.forEach(rank => {
//     // Create card element
//     const cardElement = document.createElement('div');
//     cardElement.classList.add('card', 'bg-white', 'border', 'rounded', 'shadow-lg');

//     // Add suit and rank
//     const suitTopElement = document.createElement('div');
//     suitTopElement.classList.add('suit', 'top', 'text-2xl');
//     suitTopElement.textContent = suit;

//     const rankElement = document.createElement('div');
//     rankElement.classList.add('rank', 'text-6xl');
//     rankElement.textContent = rank;

//     const suitBottomElement = document.createElement('div');
//     suitBottomElement.classList.add('suit', 'bottom', 'text-2xl');
//     suitBottomElement.textContent = suit;

//     // Append children
//     cardElement.appendChild(suitTopElement);
//     cardElement.appendChild(rankElement);
//     cardElement.appendChild(suitBottomElement);

//     // Append card to deck container (assuming you have a deck container in your HTML)
//     document.querySelector('.deck').appendChild(cardElement);
//   });
// }); */}

// export default Card;
