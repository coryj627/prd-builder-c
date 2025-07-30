import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Card,
  CardContent,
  Stack,
  Chip
} from '@mui/material';
import { useAppContext } from '../../../context/AppContext';

const Scope = ({ onNext, onBack, isFirst, isLast }) => {
  const { state, actions } = useAppContext();
  
  const [formData, setFormData] = useState({
    inScope: state.prd.inScope || '',
    outOfScope: state.prd.outOfScope || '',
    assumptions: state.prd.assumptions || '',
    constraints: state.prd.constraints || '',
    dependencies: state.prd.dependencies || ''
  });

  useEffect(() => {
    setFormData({
      inScope: state.prd.inScope || '',
      outOfScope: state.prd.outOfScope || '',
      assumptions: state.prd.assumptions || '',
      constraints: state.prd.constraints || '',
      dependencies: state.prd.dependencies || ''
    });
  }, [state.prd]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    actions.setPrd({
      ...state.prd,
      ...formData
    });
    onNext();
  };

  const handleSkip = () => {
    actions.setPrd({
      ...state.prd,
      inScope: formData.inScope || 'To be determined',
      outOfScope: formData.outOfScope || 'To be determined',
      assumptions: formData.assumptions || 'To be determined',
      constraints: formData.constraints || 'To be determined',
      dependencies: formData.dependencies || 'To be determined'
    });
    onNext();
  };

  const scopeExamples = [
    'User registration and authentication',
    'Core feature implementation',
    'Basic responsive design',
    'Data storage and retrieval',
    'Basic error handling'
  ];

  const outOfScopeExamples = [
    'Advanced analytics and reporting',
    'Third-party integrations',
    'Mobile app development',
    'Advanced security features',
    'Multi-language support'
  ];

  return (
    <Box>
      {/* Step Introduction */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom color="primary">
          Project Scope
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Define the boundaries of your project. Clearly stating what is included and excluded 
          helps set expectations and prevents scope creep during development.
        </Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Optional Step:</strong> Defining scope helps with project planning and communication. 
            If you're unsure, you can skip this step or mark items as "to be determined".
          </Typography>
        </Alert>
      </Box>

      <Grid container spacing={4}>
        {/* In Scope */}
        <Grid item xs={12} lg={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="success.main">
                In Scope
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                What will be included in this project?
              </Typography>
              
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Features and functionality to include"
                value={formData.inScope}
                onChange={(e) => handleInputChange('inScope', e.target.value)}
                placeholder="List the features, functionality, and deliverables that are part of this project..."
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Examples:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {scopeExamples.map((example, index) => (
                  <Chip
                    key={index}
                    label={example}
                    size="small"
                    variant="outlined"
                    color="success"
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Out of Scope */}
        <Grid item xs={12} lg={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="error.main">
                Out of Scope
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                What will NOT be included in this project?
              </Typography>
              
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Features and functionality to exclude"
                value={formData.outOfScope}
                onChange={(e) => handleInputChange('outOfScope', e.target.value)}
                placeholder="List features, functionality, or requirements that are explicitly excluded..."
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Examples:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {outOfScopeExamples.map((example, index) => (
                  <Chip
                    key={index}
                    label={example}
                    size="small"
                    variant="outlined"
                    color="error"
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Assumptions */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Assumptions"
            value={formData.assumptions}
            onChange={(e) => handleInputChange('assumptions', e.target.value)}
            placeholder="What assumptions are you making about users, technology, resources, etc.?"
            helperText="Example: 'Users have modern browsers', 'Team has React expertise'"
            variant="outlined"
          />
        </Grid>

        {/* Constraints */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Constraints"
            value={formData.constraints}
            onChange={(e) => handleInputChange('constraints', e.target.value)}
            placeholder="What limitations or restrictions exist?"
            helperText="Example: 'Budget of $10,000', 'Must launch by Q2', 'Mobile-first requirement'"
            variant="outlined"
          />
        </Grid>

        {/* Dependencies */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Dependencies"
            value={formData.dependencies}
            onChange={(e) => handleInputChange('dependencies', e.target.value)}
            placeholder="What external factors or resources does this project depend on?"
            helperText="Example: 'Third-party API access', 'Design approval', 'Server setup'"
            variant="outlined"
          />
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
        
        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleSkip}
            variant="outlined"
          >
            Skip for Now
          </Button>
          <Button
            onClick={handleNext}
            variant="contained"
            size="large"
          >
            Next: Summary
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Scope;