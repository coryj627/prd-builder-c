import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  FormControlLabel,
  Checkbox,
  Chip,
  Stack
} from '@mui/material';
import { useAppContext } from '../../../context/AppContext';

const ProblemDefinition = ({ onNext, onBack, isFirst, isLast }) => {
  const { state, actions } = useAppContext();
  
  const [formData, setFormData] = useState({
    problemStatement: state.prd.problemStatement || '',
    targetUsers: state.prd.targetUsers || '',
    currentSolutions: state.prd.currentSolutions || '',
    painPoints: state.prd.painPoints || '',
    successMetrics: state.prd.successMetrics || '',
    unknownAspects: state.prd.unknownAspects || []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      problemStatement: state.prd.problemStatement || '',
      targetUsers: state.prd.targetUsers || '',
      currentSolutions: state.prd.currentSolutions || '',
      painPoints: state.prd.painPoints || '',
      successMetrics: state.prd.successMetrics || '',
      unknownAspects: state.prd.unknownAspects || []
    });
  }, [state.prd]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleUnknownToggle = (aspect) => {
    setFormData(prev => ({
      ...prev,
      unknownAspects: prev.unknownAspects.includes(aspect)
        ? prev.unknownAspects.filter(item => item !== aspect)
        : [...prev.unknownAspects, aspect]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.problemStatement.trim()) {
      newErrors.problemStatement = 'Problem statement is required';
    }
    
    if (!formData.targetUsers.trim()) {
      newErrors.targetUsers = 'Target users definition is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      actions.setPrd({
        ...state.prd,
        ...formData
      });
      onNext();
    }
  };

  const unknownOptions = [
    'Target users are not clearly defined',
    'Current solutions are unknown',
    'Pain points need research',
    'Success metrics to be determined',
    'Problem scope needs refinement'
  ];

  return (
    <Box>
      {/* Step Introduction */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom color="primary">
          Problem Definition
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Define the core problem your application will solve. This is the foundation of your PRD and 
          will guide all subsequent decisions about features, scope, and success metrics.
        </Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Be specific and clear:</strong> Well-defined problems lead to better solutions. 
            If you're unsure about any aspect, you can mark it as "unknown" or "to be determined".
          </Typography>
        </Alert>
      </Box>

      <Grid container spacing={3}>
        {/* Problem Statement */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="What problem are you solving?"
            value={formData.problemStatement}
            onChange={(e) => handleInputChange('problemStatement', e.target.value)}
            error={!!errors.problemStatement}
            helperText={errors.problemStatement || 'Describe the specific problem or need that your application will address. Be as detailed as possible.'}
            variant="outlined"
          />
        </Grid>

        {/* Target Users */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            multiline
            rows={3}
            label="Who experiences this problem?"
            value={formData.targetUsers}
            onChange={(e) => handleInputChange('targetUsers', e.target.value)}
            error={!!errors.targetUsers}
            helperText={errors.targetUsers || 'Describe the specific users or user groups who face this problem. Include demographics, roles, or characteristics.'}
            variant="outlined"
          />
        </Grid>

        {/* Current Solutions */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="How is this problem currently solved?"
            value={formData.currentSolutions}
            onChange={(e) => handleInputChange('currentSolutions', e.target.value)}
            helperText="Describe existing solutions, workarounds, or tools that people currently use. If none exist, write 'No current solutions'."
            variant="outlined"
          />
        </Grid>

        {/* Pain Points */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="What are the main pain points?"
            value={formData.painPoints}
            onChange={(e) => handleInputChange('painPoints', e.target.value)}
            helperText="List the specific frustrations, inefficiencies, or challenges that users face with current solutions or the lack thereof."
            variant="outlined"
          />
        </Grid>

        {/* Success Metrics */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="How will you measure success?"
            value={formData.successMetrics}
            onChange={(e) => handleInputChange('successMetrics', e.target.value)}
            helperText="Define what success looks like. Include specific, measurable outcomes (e.g., 'Reduce task completion time by 50%', 'Increase user satisfaction to 4.5/5')."
            variant="outlined"
          />
        </Grid>

        {/* Unknown Aspects */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Mark any aspects that are unknown or need further research:
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            It's perfectly normal to have uncertainties at this stage. Marking these will help focus future research efforts.
          </Typography>
          
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {unknownOptions.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={formData.unknownAspects.includes(option)}
                    onChange={() => handleUnknownToggle(option)}
                  />
                }
                label={option}
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>

          {formData.unknownAspects.length > 0 && (
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary">
                Selected unknown aspects:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                {formData.unknownAspects.map((aspect) => (
                  <Chip
                    key={aspect}
                    label={aspect}
                    onDelete={() => handleUnknownToggle(aspect)}
                    color="warning"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Navigation Buttons */}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button
          disabled={isFirst}
          onClick={onBack}
          variant="outlined"
        >
          Back
        </Button>
        
        <Button
          onClick={handleNext}
          variant="contained"
          size="large"
        >
          Next: Features
        </Button>
      </Box>
    </Box>
  );
};

export default ProblemDefinition;