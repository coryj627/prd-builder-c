import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Alert
} from '@mui/material';
import { useAppContext } from '../../../context/AppContext';

const BasicDetails = ({ onNext, onBack, isFirst, isLast }) => {
  const { state, actions } = useAppContext();
  
  // Local state for form fields
  const [formData, setFormData] = useState({
    appName: state.prd.appName || '',
    description: state.prd.description || '',
    platform: state.prd.platform || '',
    targetAudience: state.prd.targetAudience || '',
    timeline: state.prd.timeline || '',
    budget: state.prd.budget || ''
  });

  const [errors, setErrors] = useState({});

  // Update form data when component mounts or PRD data changes
  useEffect(() => {
    setFormData({
      appName: state.prd.appName || '',
      description: state.prd.description || '',
      platform: state.prd.platform || '',
      targetAudience: state.prd.targetAudience || '',
      timeline: state.prd.timeline || '',
      budget: state.prd.budget || ''
    });
  }, [state.prd]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.appName.trim()) {
      newErrors.appName = 'Application name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Brief description is required';
    }
    
    if (!formData.platform) {
      newErrors.platform = 'Platform selection is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      // Save form data to context
      actions.setPrd({
        ...state.prd,
        ...formData
      });
      onNext();
    }
  };

  const platformOptions = [
    'Web',
    'Mobile (iOS)',
    'Mobile (Android)',
    'Mobile (Cross-platform)',
    'Desktop',
    'Web + Mobile',
    'Other'
  ];

  const timelineOptions = [
    'Unknown',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    '1+ years',
    'To be determined'
  ];

  return (
    <Box>
      {/* Step Introduction */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom color="primary">
          Basic Details
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Let's start with the fundamental information about your application. 
          These details will help establish the foundation of your Product Requirements Document.
        </Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Required fields are marked with *</strong> - These are essential for creating a meaningful PRD. 
            Optional fields can be skipped or marked as "to be determined" if you're unsure.
          </Typography>
        </Alert>
      </Box>

      {/* Form Fields */}
      <Grid container spacing={3}>
        {/* Application Name */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            label="Application Name"
            value={formData.appName}
            onChange={(e) => handleInputChange('appName', e.target.value)}
            error={!!errors.appName}
            helperText={errors.appName || 'What will your application be called?'}
            variant="outlined"
          />
        </Grid>

        {/* Platform */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required error={!!errors.platform}>
            <InputLabel>Platform</InputLabel>
            <Select
              value={formData.platform}
              onChange={(e) => handleInputChange('platform', e.target.value)}
              label="Platform"
            >
              {platformOptions.map((platform) => (
                <MenuItem key={platform} value={platform}>
                  {platform}
                </MenuItem>
              ))}
            </Select>
            {errors.platform && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {errors.platform}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="Brief Description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            error={!!errors.description}
            helperText={errors.description || 'Provide a brief overview of what your application will do (2-3 sentences)'}
            variant="outlined"
          />
        </Grid>

        {/* Target Audience */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Target Audience"
            value={formData.targetAudience}
            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            helperText="Who will use this application? (e.g., 'Small business owners', 'Students', 'General consumers')"
            variant="outlined"
          />
        </Grid>

        {/* Timeline */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Development Timeline</InputLabel>
            <Select
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
              label="Development Timeline"
            >
              {timelineOptions.map((timeline) => (
                <MenuItem key={timeline} value={timeline}>
                  {timeline}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Budget */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Budget Range (Optional)"
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            helperText="Estimated budget range if known (e.g., '$10,000 - $50,000', 'To be determined')"
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
        
        <Button
          onClick={handleNext}
          variant="contained"
          size="large"
        >
          Next: Problem Definition
        </Button>
      </Box>
    </Box>
  );
};

export default BasicDetails;