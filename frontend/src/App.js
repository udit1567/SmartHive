import FlickeringGrid from './components/FlickeringGrid';

function App() {
  return (
    <div>
      <FlickeringGrid width={1220} height={600} squareSize={4} gridGap={6} flickerChance={0.1} maxOpacity={0.5} color="rgb(0, 0, 0)" />
    </div>
  );
}

export default App;
