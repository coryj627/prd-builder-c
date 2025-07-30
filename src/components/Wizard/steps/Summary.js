import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import { Download, Refresh } from '@mui/icons-material';
import { useAppContext } from '../../../context/AppContext';

const Summary = ({ onNext, onBack, isFirst, isLast, onBackToLanding }) => {
  const { state, actions } = useAppContext();
  const { prd } = state;

  const generateMarkdownPRD = () => {
    const timestamp = new Date().toLocaleDateString();
    
    let markdown = `# Product Requirements Document: ${prd.appName || 'Untitled Project'}\n\n`;
    markdown += `**Generated on:** ${timestamp}\n\n`;
    
    // Basic Details
    markdown += `## Basic Details\n\n`;
    markdown += `**Application Name:** ${prd.appName || 'Not specified'}\n\n`;
    markdown += `**Platform:** ${prd.platform || 'Not specified'}\n\n`;
    markdown += `**Description:** ${prd.description || 'Not specified'}\n\n`;
    if (prd.targetAudience) markdown += `**Target Audience:** ${prd.targetAudience}\n\n`;
    if (prd.timeline) markdown += `**Timeline:** ${prd.timeline}\n\n`;
    if (prd.budget) markdown += `**Budget:** ${prd.budget}\n\n`;
    
    // Problem Definition
    markdown += `## Problem Definition\n\n`;
    markdown += `### What problem are we solving?\n\n`;
    markdown += `${prd.problemStatement || 'Not specified'}\n\n`;
    
    markdown += `### Target Users\n\n`;
    markdown += `${prd.targetUsers || 'Not specified'}\n\n`;
    
    if (prd.currentSolutions) {
      markdown += `### Current Solutions\n\n`;
      markdown += `${prd.currentSolutions}\n\n`;
    }
    
    if (prd.painPoints) {
      markdown += `### Pain Points\n\n`;
      markdown += `${prd.painPoints}\n\n`;
    }
    
    if (prd.successMetrics) {
      markdown += `### Success Metrics\n\n`;
      markdown += `${prd.successMetrics}\n\n`;
    }
    
    if (prd.unknownAspects && prd.unknownAspects.length > 0) {
      markdown += `### Unknown Aspects (Requiring Further Research)\n\n`;
      prd.unknownAspects.forEach(aspect => {
        markdown += `- ${aspect}\n`;
      });
      markdown += `\n`;
    }
    
    // Features
    if (prd.features && prd.features.length > 0) {
      markdown += `## Main Features\n\n`;
      prd.features.forEach((feature, index) => {
        markdown += `### ${index + 1}. ${feature.name}\n\n`;
        markdown += `**Priority:** ${feature.priority.toUpperCase()}\n\n`;
        markdown += `**Description:** ${feature.description}\n\n`;
        if (feature.acceptanceCriteria) {
          markdown += `**Acceptance Criteria:**\n\n`;
          markdown += `${feature.acceptanceCriteria}\n\n`;
        }
        markdown += `---\n\n`;
      });
    }
    
    // Scope
    markdown += `## Project Scope\n\n`;
    
    markdown += `### In Scope\n\n`;
    markdown += `${prd.inScope || 'To be determined'}\n\n`;
    
    markdown += `### Out of Scope\n\n`;
    markdown += `${prd.outOfScope || 'To be determined'}\n\n`;
    
    if (prd.assumptions) {
      markdown += `### Assumptions\n\n`;
      markdown += `${prd.assumptions}\n\n`;
    }
    
    if (prd.constraints) {
      markdown += `### Constraints\n\n`;
      markdown += `${prd.constraints}\n\n`;
    }
    
    if (prd.dependencies) {
      markdown += `### Dependencies\n\n`;
      markdown += `${prd.dependencies}\n\n`;
    }
    
    markdown += `---\n\n`;
    markdown += `*This PRD was generated using the PRD Builder tool.*`;
    
    return markdown;
  };

  const handleDownload = () => {
    const markdown = generateMarkdownPRD();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(prd.appName || 'PRD').replace(/\s+/g, '_')}_PRD.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleStartOver = () => {
    actions.setPrd({});
    if (onBackToLanding) {
      onBackToLanding();
    } else {
      window.location.reload();
    }
  };

  const isComplete = prd.appName && prd.description && prd.platform && prd.problemStatement && prd.targetUsers;

  return (
    <Box>
      {/* Step Introduction */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom color="primary">
          Summary & Download
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Review your Product Requirements Document and download it as a markdown file. 
          You can go back to any previous step to make changes before downloading.
        </Typography>
      </Box>

      {/* Completion Status */}
      <Alert severity={isComplete ? "success" : "warning"} sx={{ mb: 4 }}>
        <Typography variant="body2">
          {isComplete 
            ? "Your PRD is complete! All required sections have been filled out."
            : "Some required sections are incomplete. You can still download your PRD, but consider completing the missing sections for a more comprehensive document."
          }
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Basic Details Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Basic Details
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>App Name:</strong> {prd.appName || 'Not specified'}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Platform:</strong> {prd.platform || 'Not specified'}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Description:</strong> {prd.description ? 
                  (prd.description.length > 100 ? prd.description.substring(0, 100) + '...' : prd.description)
                  : 'Not specified'}
              </Typography>
              {prd.targetAudience && (
                <Typography variant="body2" gutterBottom>
                  <strong>Target Audience:</strong> {prd.targetAudience}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Problem Definition Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Problem Definition
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Problem:</strong> {prd.problemStatement ? 
                  (prd.problemStatement.length > 100 ? prd.problemStatement.substring(0, 100) + '...' : prd.problemStatement)
                  : 'Not specified'}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Target Users:</strong> {prd.targetUsers ? 
                  (prd.targetUsers.length > 100 ? prd.targetUsers.substring(0, 100) + '...' : prd.targetUsers)
                  : 'Not specified'}
              </Typography>
              {prd.unknownAspects && prd.unknownAspects.length > 0 && (
                <Box mt={1}>
                  <Typography variant="body2" gutterBottom>
                    <strong>Unknown Aspects:</strong>
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {prd.unknownAspects.slice(0, 3).map((aspect, index) => (
                      <Chip key={index} label={aspect} size="small" color="warning" />
                    ))}
                    {prd.unknownAspects.length > 3 && (
                      <Chip label={`+${prd.unknownAspects.length - 3} more`} size="small" />
                    )}
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Features Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Features
              </Typography>
              {prd.features && prd.features.length > 0 ? (
                <Box>
                  <Typography variant="body2" gutterBottom>
                    <strong>{prd.features.length} features defined</strong>
                  </Typography>
                  <Stack spacing={1}>
                    {prd.features.slice(0, 3).map((feature, index) => (
                      <Box key={index} display="flex" alignItems="center" gap={1}>
                        <Chip
                          label={feature.priority.toUpperCase()}
                          size="small"
                          color={feature.priority === 'high' ? 'error' : feature.priority === 'medium' ? 'warning' : 'info'}
                        />
                        <Typography variant="body2">{feature.name}</Typography>
                      </Box>
                    ))}
                    {prd.features.length > 3 && (
                      <Typography variant="body2" color="text.secondary">
                        +{prd.features.length - 3} more features
                      </Typography>
                    )}
                  </Stack>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No features defined
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Scope Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Project Scope
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>In Scope:</strong> {prd.inScope ? 
                  (prd.inScope.length > 80 ? prd.inScope.substring(0, 80) + '...' : prd.inScope)
                  : 'Not specified'}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Out of Scope:</strong> {prd.outOfScope ? 
                  (prd.outOfScope.length > 80 ? prd.outOfScope.substring(0, 80) + '...' : prd.outOfScope)
                  : 'Not specified'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Download Section */}
      <Box mt={4}>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" gutterBottom>
          Download Your PRD
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Your PRD will be downloaded as a markdown (.md) file that you can open in any text editor 
          or markdown viewer. The file includes all the information you've provided in a structured format.
        </Typography>
        
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Download />}
            onClick={handleDownload}
          >
            Download PRD
          </Button>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleStartOver}
          >
            Start Over
          </Button>
        </Stack>
      </Box>

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
          onClick={handleDownload}
          variant="contained"
          size="large"
          startIcon={<Download />}
        >
          Download PRD
        </Button>
      </Box>
    </Box>
  );
};

export default Summary;