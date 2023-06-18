import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Vec from './vec'

function Vector({ pos: pos0, vec: vec0, dragging = false }) {
  const [pos, setPos] = React.useState(pos0);
  const [vec, setVec] = React.useState(vec0);

  if (dragging) {
    const mousemove = (e: MouseEvent) => {
      setVec(new Vec(e.clientX, e.clientY).sub(pos));
    }
    const mouseup = (_: MouseEvent) => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    }
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  }

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
  const [vectors, setVectors] = React.useState([
    {
      pos: new Vec(100, 100),
      vec: new Vec(100, 0),
      addedTime: 0,
    },
  ])
  return (
    <div>
      <h1>Entangled</h1>
      <svg
        onMouseDown={e => {
          e.preventDefault();
          e.stopPropagation();

          let mousemove: any, mouseup: any;
          mousemove = (e: MouseEvent) => {
            setVectors(vectors.concat({
              pos: new Vec(e.clientX, e.clientY),
              vec: new Vec(100, 0),
              addedTime: Date.now(),
            }));
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
          };
          mouseup = (_: MouseEvent) => {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
          };
          document.addEventListener('mousemove', mousemove);
          document.addEventListener('mouseup', mouseup);

          // setVectors(vectors.concat({
          //   pos: new Vec(e.clientX, e.clientY),
          //   vec: new Vec(100, 0),
          // }));
        }
        }
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        width="100%"
        height="100%"
      >
        {vectors.map(({ pos, vec }, i) => (

          <Vector
            key={i}
            pos={pos}
            vec={vec}
            dragging={Date.now() - 1000 < vectors[i].addedTime}
          />
        ))}
      </svg>
    </div >
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
