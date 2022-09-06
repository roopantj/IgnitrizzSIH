import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { Card, Box, CardContent, Button } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { FiThermometer } from "react-icons/fi";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import { GiThermometerScale } from "react-icons/gi";
import Speedometer from "layouts/dashboard/components/Speedometer";
import socketIOClient from "socket.io-client";
import { TbAngle, TbRotateClockwise2 } from "react-icons/tb";
import { MdOutlineSpeed } from "react-icons/md";
function Dashboard() {
  const [latestVel, setLatestVelocity] = useState(0);
  const [acceleration, setAcceleration] = useState([0]);
  const [latestPitch, setLatestPitch] = useState(0);
  const [latestDepth, setLatestDepth] = useState(0);
  const [latestRoll, setLatestRoll] = useState(0);
  const [latestTemp, setLatestTemp] = useState(0);
  const [response, setResponse] = useState([]);
  const [lastReadings, setLastReadings] = useState([]);
  const [showLastAcc, setShowLastAcc] = useState(true);
  const [showLastTen, setShowLast] = useState(true);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const PressureChart = showLastTen
    ? lastReadings.map((item, idx) => ({
        name: `${item.id}`,
        RawPressure: parseInt(item.rawPressure.p1),
        CorrectedPressure: parseInt(Math.ceil(item.correctedPressure.p1)),
        FilteredPressure: parseInt(Math.floor(item.filteredPressure.p1)),
      }))
    : response.map((item, idx) => ({
        name: `${item.id}`,
        RawPressure: parseInt(item.rawPressure.p1),
        CorrectedPressure: parseInt(Math.ceil(item.correctedPressure.p1)),
        FilteredPressure: parseInt(Math.floor(item.filteredPressure.p1)),
      }));

  const AccelerationChart = showLastAcc
    ? acceleration.slice(-10).map((item) => ({
        name: `${
          new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
        }`,
        acc: parseInt(item),
      }))
    : [...acceleration].map((item, idx) => ({
        name: `${
          new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
        }`,
        acc: parseInt(item),
      }));
  useEffect(() => {
    const socket = socketIOClient("http://localhost:4001");
    socket.on("FromAPI", (data) => {
      setMaxSpeed((prev) => Math.max(prev, data.velocity));
      setResponse((prevState) => {
        if (prevState.length > 0)
          setAcceleration((prev) => [...prev, data.velocity - prevState.at(-1).velocity]);
        return [...prevState, data];
      });

      setLatestVelocity(data.velocity);
      setLatestPitch(data.pitch.toPrecision(4));
      setLatestRoll(data.roll.toPrecision(4));
      setLatestTemp(data.temperature.toPrecision(4));
      setLatestDepth(data.depth.toPrecision(4));
      setLastReadings((prev) => {
        if (prev.length >= 10) {
          prev.splice(0, 1);
          prev.push(data);
          return [...prev];
        }
        return [...prev, data];
      });
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
                  <VuiBox display="flex" flexDirection="row" justifyContent="space-between">
                    <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                      Pressure Differences
                    </VuiTypography>
                    <Button variant={"outlined"} onClick={() => setShowLast((prev) => !prev)}>
                      {showLastTen ? "Show All" : "Show Less"}{" "}
                    </Button>
                  </VuiBox>

                  <VuiBox sx={{ height: "450px" }}>
                    <ResponsiveContainer>
                      <LineChart width={1080} height={400} data={PressureChart}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Legend verticalAlign="top" height={36} layout="vertical" align="right" />
                        <Line type="monotone" dataKey="RawPressure" stroke="#ff0000" />
                        <Line type="monotone" dataKey="CorrectedPressure" stroke="#02e5f8" />
                        <Line type="monotone" dataKey="FilteredPressure" stroke="#06db0d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiBox display="flex" flexDirection="row" justifyContent="space-between">
                    <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                      Acceleration
                    </VuiTypography>
                    <Button variant={"outlined"} onClick={() => setShowLastAcc((prev) => !prev)}>
                      {showLastAcc ? "Show All" : "Show Less"}{" "}
                    </Button>
                  </VuiBox>
                  <VuiBox sx={{ height: "450px" }}>
                    <ResponsiveContainer>
                      <LineChart height={375} data={AccelerationChart}>
                        <XAxis dataKey="name" />
                        <YAxis />

                        <Line type="monotone" dataKey="acc" stroke="#06db0d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MiniStatisticsCard
                    title={{ text: "Max Speed", fontWeight: "regular" }}
                    count={`${maxSpeed} m/s`}
                    icon={{
                      color: "info",
                      component: <MdOutlineSpeed size="22px" color="white" />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MiniStatisticsCard
                    title={{ text: "Pitch", fontWeight: "regular" }}
                    count={`${latestPitch} rad`}
                    icon={{ color: "info", component: <TbAngle size="22px" color="white" /> }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MiniStatisticsCard
                    title={{ text: "Roll" }}
                    count={`${latestRoll} rad`}
                    icon={{
                      color: "info",
                      component: <TbRotateClockwise2 size="22px" color="white" />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MiniStatisticsCard
                    title={{ text: "Depth" }}
                    count={`${latestDepth} m`}
                    icon={{
                      color: "info",
                      component: <GiThermometerScale size="22px" color="white" />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MiniStatisticsCard
                    title={{ text: "Temperature" }}
                    count={`${latestTemp} "C`}
                    icon={{ color: "info", component: <FiThermometer size="20px" color="white" /> }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
