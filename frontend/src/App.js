import FlickeringGrid from './components/FlickeringGrid';

function App() {
  return (
    <div>
      <FlickeringGrid width={1210} height={560} squareSize={4} gridGap={6} flickerChance={0.5} maxOpacity={0.4} color="rgb(4, 59, 65)" />
    </div>
  );
}

export default App;