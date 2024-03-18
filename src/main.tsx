import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WeatherContextProvider } from '../src/context/WeatherContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <WeatherContextProvider>
    <App />
  </WeatherContextProvider>,
)
