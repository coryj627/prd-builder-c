import React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  Chip,
  Stack
} from '@mui/material';
import { 
  Speed, 
  Assignment, 
  CheckCircle, 
  Schedule,
  Star,
  ArrowForward
} from '@mui/icons-material';

const LandingPage = ({ onChooseWizard, onChoosePrototype }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom color="primary">
          PRD Builder
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Create comprehensive Product Requirements Documents with ease
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto' }}>
          Choose your path: Get started quickly with our 10-question prototype generator, 
          or create a detailed PRD with our comprehensive guided wizard.
        </Typography>
      </Box>

      {/* Path Selection */}
      <Grid container spacing={4} justifyContent="center">
        {/* Prototype Path */}
        <Grid item xs={12} md={5}>
          <Card 
            elevation={3}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Speed sx={{ fontSize: 32, color: 'secondary.main', mr: 1 }} />
                <Typography variant="h4" component="h2" color="secondary.main">
                  Quick Prototype
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph>
                Perfect for getting started quickly or validating an idea. 
                Answer just 10 simple questions to generate a basic PRD.
              </Typography>

              <Stack spacing={1} mb={3}>
                <Box display="flex" alignItems="center">
                  <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                  <Typography variant="body2">10 simple questions</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                  <Typography variant="body2">5-10 minutes to complete</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                  <Typography variant="body2">Basic PRD structure</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                  <Typography variant="body2">Immediate download</Typography>
                </Box>
              </Stack>

              <Chip 
                icon={<Star />}
                label="Recommended for beginners" 
                color="secondary" 
                sx={{ mb: 2 }}
              />
            </CardContent>
            
            <CardActions sx={{ p: 3, pt: 0 }}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<ArrowForward />}
                onClick={onChoosePrototype}
              >
                Start Quick Prototype
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Full Wizard Path */}
        <Grid item xs={12} md={5}>
          <Card 
            elevation={3}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Assignment sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
                <Typography variant="h4" component="h2" color="primary.main">
                  Full Wizard
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph>
                Create a comprehensive, detailed PRD with our step-by-step wizard. 
                Perfect for serious projects and team collaboration.
              </Typography>

              <Stack spacing={1} mb={3}>
                <Box display="flex" alignItems="center">
                  <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                  <Typography variant="body2">Comprehensive questionnaire</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                  <Typography variant="body2">15-30 minutes to complete</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                  <Typography variant="body2">Detailed feature planning</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                  <Typography variant="body2">Professional-grade output</Typography>
                </Box>
              </Stack>

              <Chip 
                icon={<Schedule />}
                label="Best for detailed planning" 
                color="primary" 
                sx={{ mb: 2 }}
              />
            </CardContent>
            
            <CardActions sx={{ p: 3, pt: 0 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForward />}
                onClick={onChooseWizard}
              >
                Start Full Wizard
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Features */}
      <Box mt={8} textAlign="center">
        <Typography variant="h4" gutterBottom color="primary">
          Why Use PRD Builder?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Box>
              <Assignment sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                AI-Ready Format
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Generated PRDs include specific examples, clear acceptance criteria, 
                and unambiguous language perfect for AI agents.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Speed sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Save Time
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No more staring at blank documents. Our guided process helps you 
                create comprehensive PRDs in minutes, not hours.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <CheckCircle sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Professional Quality
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Follow industry best practices with our structured approach. 
                Perfect for both beginners and experienced product managers.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LandingPage;