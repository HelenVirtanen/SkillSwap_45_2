import './App.css';
import MainLayout from './layout/MainLayout/MainLayout';
import MainPage from '../pages/MainPage/MainPage';

function App() {
  return (
    <div>
      <MainLayout> 
        <MainPage />
      </MainLayout>
    </div>
  );
}

export default App;
