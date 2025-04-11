import './App.css';
import { Provider } from 'react-redux';
import { Counter } from './components/Counter';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
