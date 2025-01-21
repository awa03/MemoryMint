import React from 'react';


const App: React.FC = () => {

  return (
    <div> 

      <style>{`
        @keyframes spin {
            from {
                transform:rotate(0deg);
            }
            to {
                transform:rotate(360deg);
            }
        }
        .gear-mask{
          -webkit-mask-image: linear-gradient(white, transparent);
          mask-image: linear-gradient(black, transparent);
          }
        .gear-mask:hover {
          animation-name: spin;
          animation-duration: 5000ms;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }

        .gear-mask:active, gear-mask:focus {
          scale: 0.9 
        }
        `}</style>

      <a href="/settings">
        <img src='gear.png' height="32" width="32" style={{}} className="gear-mask"></img>
      </a>

    </div>
  );
};

export default App;

