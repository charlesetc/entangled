import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Vec from './vec'

function Vector(pos0: Vec, vec0: Vec) {
  const [pos, setPos] = React.useState(pos0);
  const [vec, setVec] = React.useState(vec0);
  const arrowSize = 20;
  return (
    <>
      <line
        x1={pos.x}
        y1={pos.y}
        x2={pos.x + vec.x}
        y2={pos.y + vec.y}
        stroke="black"
        strokeWidth="2"
      />
      <circle
        cx={pos.x}
        cy={pos.y}
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
          const mousemove = (e: MouseEvent) => {
            setPos(new Vec(e.clientX, e.clientY));
          };
          const mouseup = (_: MouseEvent) => {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
          };
          document.addEventListener('mousemove', mousemove);
          document.addEventListener('mouseup', mouseup);
        }}
      />
      <polygon
        points={`
        ${pos.add(vec).comma()}
        ${pos.add(vec).sub(vec.unit().scale(arrowSize).rotate(30)).comma()}
        ${pos.add(vec).sub(vec.unit().scale(arrowSize).rotate(-30)).comma()}
        `}
        style={{
          cursor: 'pointer',
        }}
        fill="white"
        stroke="black"
        strokeWidth="2"
        onMouseDown={e => {
          e.preventDefault();
          e.stopPropagation();
          const mousemove = (e: MouseEvent) => {
            setVec(new Vec(e.clientX - pos.x, e.clientY - pos.y));
          };
          const mouseup = (_: MouseEvent) => {
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
        onClick={() => {

        }}
        width="100%"
        height="100%"
      >
        {Vector(new Vec(150, 170), new Vec(40, -40))}
      </svg>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
