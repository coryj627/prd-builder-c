import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  LinearProgress
} from '@mui/material';


// Import wizard steps (will create these next)
import BasicDetails from './steps/BasicDetails';
import ProblemDefinition from './steps/ProblemDefinition';
import Features from './steps/Features';
import Scope from './steps/Scope';
import Summary from './steps/Summary';

const wizardSteps = [
  {
    label: 'Basic Details',
    component: BasicDetails,
    required: true
  },
  {
    label: 'Problem Definition',
    component: ProblemDefinition,
    required: true
  },
  {
    label: 'Features',
    component: Features,
    required: false
  },
  {
    label: 'Scope',
    component: Scope,
    required: false
  },
  {
    label: 'Summary & Download',
    component: Summary,
    required: false
  }
];

const Wizard = ({ onBackToLanding }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < wizardSteps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    setActiveStep(stepIndex);
  };

  const getCurrentStepComponent = () => {
    const CurrentStepComponent = wizardSteps[activeStep].component;
    const stepProps = {
      onNext: handleNext,
      onBack: handleBack,
      isFirst: activeStep === 0,
      isLast: activeStep === wizardSteps.length - 1
    };

    // Pass onBackToLanding to Summary step
    if (CurrentStepComponent === Summary) {
      stepProps.onBackToLanding = onBackToLanding;
    }

    return <CurrentStepComponent {...stepProps} />;
  };

  const progress = ((activeStep + 1) / wizardSteps.length) * 100;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            PRD Builder
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Create a comprehensive Product Requirements Document with our guided wizard
          </Typography>
        </Box>

        {/* Progress Bar */}
        <Box mb={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" color="text.secondary">
              Step {activeStep + 1} of {wizardSteps.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress)}% Complete
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        {/* Step Navigation */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
          {wizardSteps.map((step, index) => (
            <Step 
              key={step.label} 
              onClick={() => handleStepClick(index)}
              sx={{ cursor: 'pointer' }}
            >
              <StepLabel>
                {step.label}
                {step.required && (
                  <Typography variant="caption" color="error" display="block">
                    Required
                  </Typography>
                )}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Current Step Content */}
        <Box>
          {getCurrentStepComponent()}
        </Box>
      </Paper>
    </Container>
  );
};

export default Wizard;