import './App.css';
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/charts/styles.css';
import {Button, createTheme, MantineProvider} from '@mantine/core';
import AppRoutes from './Routes/AppRoutes';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import Store from './Store';
import { PrimeReactProvider } from 'primereact/api';
import { ModalsProvider } from '@mantine/modals';


const theme = createTheme({
  focusRing: "never",
  fontFamily: 'Poppins, sans-serif',
  headings: { fontFamily: 'Merriweather, serif' },

  colors: {
    primary: ['#ecfeff','#cffafe','#a5f3fc','#22e5ff','#0fcfed','#0ea5e9','#0284c7','#0369a1','#075985','#0c4a6e','#082f49'],
    neutral: ['#fafbff','#f1f5f9','#e2e8f0','#cbd5e1','#94a3b8','#64748b','#475569','#334155','#1e293b','#0f172a','#020617'],
  },

  primaryColor: 'primary',
  primaryShade: 4,

  defaultGradient: { from: 'primary.4', to: 'primary.8', deg: 132 },

});

function App() {
  

  return (
    <Provider store={Store}>
      <MantineProvider
        theme={theme}
     >
        <ModalsProvider> 
      <PrimeReactProvider>
         <Notifications position='top-center' />
      <AppRoutes />
      </PrimeReactProvider>
      </ModalsProvider>
      </MantineProvider>
    </Provider>
    
  );
}

export default App;
