import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { Card, Box, CardContent } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { FiThermometer } from "react-icons/fi";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { GiThermometerScale } from "react-icons/gi";
import Speedometer from "layouts/dashboard/components/SatisfactionRate";
import socketIOClient from "socket.io-client";

import { TbAngle, TbRotateClockwise2 } from "react-icons/tb";

function Dashboard() {
  const [latestVel, setLatestVelocity] = useState(0);
  const [response, setResponse] = useState([]);

  const PressureChart = response.map((item, idx) => ({
    name: `${idx}`,
    rp: parseInt(item.rawPressure.p1),
    cp: parseInt(Math.ceil(item.correctedPressure.p1)),
    fp: parseInt(Math.floor(item.filteredPressure.p1)),
  }));

  useEffect(() => {
    const socket = socketIOClient("http://localhost:4001");
    socket.on("FromAPI", (data) => {
      setResponse((prevState) => [...prevState, data]);
      setLatestVelocity(data.velocity);
    });
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing="18px" justifyContent="center">
            <Grid item xs={12}>
              <Speedometer velocity={latestVel} data={response} />
            </Grid>
            <Grid item xs={12}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Pressure Differences
                  </VuiTypography>
                  <VuiBox sx={{ height: "450px" }}>
                    <LineChart width={1080} height={400} data={PressureChart}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Line type="monotone" dataKey="rp" stroke="#ff0000" />
                      <Line type="monotone" dataKey="cp" stroke="#02e5f8" />
                      <Line type="monotone" dataKey="fp" stroke="#06db0d" />
                    </LineChart>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Pitch", fontWeight: "regular" }}
                count="5"
                icon={{ color: "info", component: <TbAngle size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Roll" }}
                count="5"
                icon={{
                  color: "info",
                  component: <TbRotateClockwise2 size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Depth" }}
                count="300"
                icon={{
                  color: "info",
                  component: <GiThermometerScale size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Temperature" }}
                count="30"
                icon={{ color: "info", component: <FiThermometer size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
