import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  LinearProgress,
  Card,
  CardContent
} from '@mui/material';
import { useAppContext } from '../../context/AppContext';

const prototypeQuestions = [
  {
    id: 'appName',
    label: 'What is your application called?',
    type: 'text',
    required: true,
    placeholder: 'e.g., TaskMaster, ShopEasy, FitTracker'
  },
  {
    id: 'platform',
    label: 'What platform will it run on?',
    type: 'select',
    required: true,
    options: ['Web', 'Mobile (iOS)', 'Mobile (Android)', 'Mobile (Cross-platform)', 'Desktop', 'Web + Mobile']
  },
  {
    id: 'description',
    label: 'In one sentence, what does your app do?',
    type: 'text',
    required: true,
    placeholder: 'e.g., Helps users track daily tasks and boost productivity'
  },
  {
    id: 'mainProblem',
    label: 'What main problem does it solve?',
    type: 'text',
    required: true,
    placeholder: 'e.g., People forget important tasks and feel overwhelmed'
  },
  {
    id: 'targetUser',
    label: 'Who is your primary user?',
    type: 'text',
    required: true,
    placeholder: 'e.g., Busy professionals, Students, Small business owners'
  },
  {
    id: 'coreFeature',
    label: 'What is the ONE most important feature?',
    type: 'text',
    required: true,
    placeholder: 'e.g., Task creation and reminders'
  },
  {
    id: 'currentSolution',
    label: 'How do people solve this problem today?',
    type: 'text',
    required: false,
    placeholder: 'e.g., Paper lists, phone notes, existing apps'
  },
  {
    id: 'differentiator',
    label: 'What makes your solution different/better?',
    type: 'text',
    required: false,
    placeholder: 'e.g., AI-powered prioritization, Voice input, Team collaboration'
  },
  {
    id: 'successMetric',
    label: 'How will you know if it\'s successful?',
    type: 'text',
    required: false,
    placeholder: 'e.g., Users complete 80% more tasks, 4.5+ star rating'
  },
  {
    id: 'timeline',
    label: 'When do you want to launch?',
    type: 'select',
    required: false,
    options: ['1-3 months', '3-6 months', '6-12 months', '1+ years', 'Not sure yet']
  }
];

const PrototypePath = ({ onComplete, onSwitchToFull }) => {
  const { actions } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');

  const question = prototypeQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / prototypeQuestions.length) * 100;

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: value
    }));
    setError('');
  };

  const handleNext = () => {
    const currentAnswer = answers[question.id];
    
    if (question.required && (!currentAnswer || !currentAnswer.trim())) {
      setError('This question is required');
      return;
    }

    if (currentQuestion < prototypeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate PRD from prototype answers
      generatePrototypePRD();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setError('');
    }
  };

  const generatePrototypePRD = () => {
    const prd = {
      // Basic Details
      appName: answers.appName,
      platform: answers.platform,
      description: answers.description,
      timeline: answers.timeline || 'To be determined',
      
      // Problem Definition
      problemStatement: answers.mainProblem,
      targetUsers: answers.targetUser,
      currentSolutions: answers.currentSolution || 'To be determined',
      successMetrics: answers.successMetric || 'To be determined',
      
      // Features (minimal)
      features: answers.coreFeature ? [{
        id: '1',
        name: answers.coreFeature,
        description: `Core feature: ${answers.coreFeature}`,
        priority: 'high',
        acceptanceCriteria: 'To be determined'
      }] : [],
      
      // Scope (basic)
      inScope: `Core functionality: ${answers.coreFeature || 'Primary feature set'}${answers.differentiator ? `\nDifferentiator: ${answers.differentiator}` : ''}`,
      outOfScope: 'Advanced features, complex integrations, and secondary functionality will be considered for future phases',
      
      // Mark as prototype
      isPrototype: true,
      generatedFrom: 'prototype'
    };

    actions.setPrd(prd);
    onComplete();
  };

  const renderQuestionInput = () => {
    const currentAnswer = answers[question.id] || '';

    if (question.type === 'select') {
      return (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>{question.label}</InputLabel>
          <Select
            value={currentAnswer}
            onChange={(e) => handleAnswer(e.target.value)}
            label={question.label}
          >
            {question.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return (
      <TextField
        fullWidth
        multiline={question.id === 'description' || question.id === 'mainProblem'}
        rows={question.id === 'description' || question.id === 'mainProblem' ? 3 : 1}
        value={currentAnswer}
        onChange={(e) => handleAnswer(e.target.value)}
        placeholder={question.placeholder}
        variant="outlined"
        sx={{ mt: 2 }}
        error={!!error}
        helperText={error}
      />
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            Quick Prototype PRD
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Answer 10 quick questions to generate a basic PRD
          </Typography>
          <Button 
            variant="text" 
            onClick={onSwitchToFull}
            sx={{ textDecoration: 'underline' }}
          >
            Switch to full wizard instead
          </Button>
        </Box>

        {/* Progress */}
        <Box mb={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" color="text.secondary">
              Question {currentQuestion + 1} of {prototypeQuestions.length}
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

        {/* Question */}
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              {question.label}
              {question.required && (
                <Typography component="span" color="error.main">
                  *
                </Typography>
              )}
            </Typography>
            
            {!question.required && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Optional - you can skip this question
              </Typography>
            )}

            {renderQuestionInput()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <Box display="flex" justifyContent="space-between">
          <Button
            disabled={currentQuestion === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          
          <Box>
            {!question.required && currentQuestion < prototypeQuestions.length - 1 && (
              <Button
                onClick={() => {
                  handleAnswer(''); // Clear any existing answer
                  setCurrentQuestion(currentQuestion + 1);
                }}
                variant="text"
                sx={{ mr: 2 }}
              >
                Skip
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              variant="contained"
              size="large"
            >
              {currentQuestion === prototypeQuestions.length - 1 ? 'Generate PRD' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrototypePath;