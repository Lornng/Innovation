import './App.css';
import BlockchainVisualization from './Components/BViz';
import SearchBar from './Components/searchBar'; //Component names have to start with uppercase because if lowercase JSX treats it as a html element.

function App() {
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
      </div>
      <div>
      <BlockchainVisualization data={data} />
      </div>
     </div>
  );
}

export default App;
