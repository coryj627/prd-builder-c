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
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useAppContext } from '../../../context/AppContext';

const Features = ({ onNext, onBack, isFirst, isLast }) => {
  const { state, actions } = useAppContext();
  
  const [features, setFeatures] = useState(state.prd.features || []);
  const [newFeature, setNewFeature] = useState({
    name: '',
    description: '',
    priority: 'medium',
    acceptanceCriteria: ''
  });

  useEffect(() => {
    setFeatures(state.prd.features || []);
  }, [state.prd.features]);

  const handleAddFeature = () => {
    if (newFeature.name.trim() && newFeature.description.trim()) {
      const feature = {
        ...newFeature,
        id: Date.now().toString()
      };
      
      const updatedFeatures = [...features, feature];
      setFeatures(updatedFeatures);
      setNewFeature({
        name: '',
        description: '',
        priority: 'medium',
        acceptanceCriteria: ''
      });
    }
  };

  const handleRemoveFeature = (featureId) => {
    const updatedFeatures = features.filter(feature => feature.id !== featureId);
    setFeatures(updatedFeatures);
  };

  const handleNext = () => {
    actions.setPrd({
      ...state.prd,
      features
    });
    onNext();
  };

  const handleSkip = () => {
    actions.setPrd({
      ...state.prd,
      features: []
    });
    onNext();
  };

  const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'info'
  };

  return (
    <Box>
      {/* Step Introduction */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom color="primary">
          Main Features
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Define the key features your application will have. Focus on the core functionality 
          that directly addresses the problem you defined in the previous step.
        </Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Optional Step:</strong> You can skip this step and come back later, or mark features as 
            "to be determined". For each feature, try to include specific acceptance criteria to make 
            implementation clearer.
          </Typography>
        </Alert>
      </Box>

      {/* Add New Feature */}
      <Card variant="outlined" sx={{ mb: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add a Feature
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Feature Name"
              value={newFeature.name}
              onChange={(e) => setNewFeature(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., User Authentication"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newFeature.priority}
                onChange={(e) => setNewFeature(prev => ({ ...prev, priority: e.target.value }))}
                label="Priority"
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Feature Description"
              value={newFeature.description}
              onChange={(e) => setNewFeature(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what this feature does and how it solves part of the user's problem"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Acceptance Criteria (Optional)"
              value={newFeature.acceptanceCriteria}
              onChange={(e) => setNewFeature(prev => ({ ...prev, acceptanceCriteria: e.target.value }))}
              placeholder="Define specific, testable conditions that must be met for this feature to be considered complete"
              helperText="Example: 'Users can register with email and password', 'Password must be at least 8 characters', 'Email verification required'"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddFeature}
              disabled={!newFeature.name.trim() || !newFeature.description.trim()}
            >
              Add Feature
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Features List */}
      {features.length > 0 && (
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Defined Features ({features.length})
          </Typography>
          
          <Grid container spacing={2}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={feature.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h6" component="h3">
                        {feature.name}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          label={feature.priority.toUpperCase()}
                          color={priorityColors[feature.priority]}
                          size="small"
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveFeature(feature.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {feature.description}
                    </Typography>
                    
                    {feature.acceptanceCriteria && (
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                          Acceptance Criteria:
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                          {feature.acceptanceCriteria}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {features.length === 0 && (
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            No features defined yet. Add some features above, or skip this step if you prefer to define features later.
          </Typography>
        </Alert>
      )}

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
            Next: Scope
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Features;