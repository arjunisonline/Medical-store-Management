import './App.css';
import Navbar from './components/navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className='img-container'>
            <img src="/bg-blur.jpg" alt="" className='background-image img-fluid' />
        <div className='title'>
          I maintain a structured and reliable system for registering daily updates of medicines
        </div>
        </div>
        
      </div>

    </div>
  );
}

export default App;
