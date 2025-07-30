import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { AppProvider } from './context/AppContext';
import theme from './theme/theme';
import LandingPage from './components/LandingPage';
import Wizard from './components/Wizard';
import PrototypePath from './components/PrototypePath';
import Summary from './components/Wizard/steps/Summary';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'wizard', 'prototype', 'summary'

  const handleChooseWizard = () => {
    setCurrentView('wizard');
  };

  const handleChoosePrototype = () => {
    setCurrentView('prototype');
  };

  const handlePrototypeComplete = () => {
    setCurrentView('summary');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'wizard':
        return <Wizard onBackToLanding={handleBackToLanding} />;
      case 'prototype':
        return (
          <PrototypePath 
            onComplete={handlePrototypeComplete}
            onSwitchToFull={() => setCurrentView('wizard')}
          />
        );
      case 'summary':
        return (
          <Summary 
            onNext={() => {}} 
            onBack={handleBackToLanding}
            onBackToLanding={handleBackToLanding}
            isFirst={false}
            isLast={true}
          />
        );
      default:
        return (
          <LandingPage 
            onChooseWizard={handleChooseWizard}
            onChoosePrototype={handleChoosePrototype}
          />
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <div className="App">
          {renderCurrentView()}
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App; 