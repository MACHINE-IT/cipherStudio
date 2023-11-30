import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import './App.css';
import LandingPage from './Pages/LandingPage/LandingPage'

function App() {


  return (
    <FluentProvider theme={webLightTheme}>
      <LandingPage />
    </FluentProvider>
  )
}

export default App
