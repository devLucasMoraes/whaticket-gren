import { Box, Grid } from "@mui/material";
import PageContainer from "../../components/PageContainer";
// components

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            card teste
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                card teste
              </Grid>
              <Grid item xs={12}>
                card teste
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            card teste
          </Grid>
          <Grid item xs={12} lg={8}>
            card teste
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
