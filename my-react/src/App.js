import './App.css';
import BlockchainVisualization from './Components/BViz';
import SearchBar from './Components/searchBar'; //Component names have to start with uppercase because if lowercase JSX treats it as a html element.
import SpanningTable from './Components/table';

function App() {
  document.body.style.backgroundColor = "#1A2337"
  const data = {
    wallets: ['wallet1', 'wallet2', 'wallet3'],
    transactions: [
      { from: 'wallet1', to: 'wallet2', tokens: 10 },
      { from: 'wallet2', to: 'wallet3', tokens: 5 },
    ],
  };
  return (
    <div>
      <div className='App'>
        <SearchBar placeholder='Insert wallet address...'/>
        <SpanningTable/>
      </div>
      <div>
      </div>
     </div>
  );
}

export default App;
