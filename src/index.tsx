import * as React from 'react';

import * as ReactDOM from 'react-dom/client';

function Vector(x0, y0, a0, b0) {
  const [{ x, y }, setPos] = React.useState({ x: x0, y: y0 });
  const [{ a, b }, setVec] = React.useState({ a: a0, b: b0 });
  return (
    <>
      <line
        x1={x}
        y1={y}
        x2={x + a}
        y2={y + b}
        stroke="black"
        strokeWidth="2"
      />
      <circle
        cx={x}
        cy={y}
        r="10"
        fill="white"
        stroke="black"
        strokeWidth="2"
        style={{
          cursor: 'pointer',
        }}
        onMouseDown={e => {
          e.preventDefault();
          e.stopPropagation();
          const mousemove = e => {
            setPos({ x: e.clientX, y: e.clientY });
          };
          const mouseup = e => {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
          };
          document.addEventListener('mousemove', mousemove);
          document.addEventListener('mouseup', mouseup);
        }}
      />
      <polygon
        points={`${x + a},${y + b} ${x + a - 5},${y + b + 10} ${x + a - 10},${y + b + 5
          }`}
        style={{
          cursor: 'pointer',
        }}
        fill="white"
        stroke="black"
        strokeWidth="2"
        onMouseDown={e => {
          e.preventDefault();
          e.stopPropagation();
          const mousemove = e => {
            setVec({ a: e.clientX - x, b: e.clientY - y });
          };
          const mouseup = e => {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
          };
          document.addEventListener('mousemove', mousemove);
          document.addEventListener('mouseup', mouseup);
        }}
      />
    </>
  );
}

function App() {
  return (
    <div>
      <h1>Entangled</h1>
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        width="100%"
        height="100%"
      >
        {Vector(150, 170, 40, -40)}
      </svg>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
