import './App.css';
import CardInput from './components/CardInput';
import CardList from './components/CardList';
import ContextWrapper from './context/ContextWrapper';

function App() {
  return (
    <ContextWrapper>
      <div className='container'>
        <CardInput />

        <div>
          <CardList/>
        </div>
      </div>
    </ContextWrapper>
  );
}

export default App;
