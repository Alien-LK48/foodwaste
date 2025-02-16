import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppcontentProvider } from './components/contextapi/Appcontext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppcontentProvider>
      <App />
    </AppcontentProvider>
  </BrowserRouter>,
)
