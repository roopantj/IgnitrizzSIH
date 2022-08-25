import React, { useState } from "react";
import { Card, Button } from "@mui/material";
import VuiBox from "components/VuiBox";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import VuiTypography from "components/VuiTypography";
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
} from "react-speedometer";
import { VscGraphLine } from "react-icons/vsc";
import { IoIosSpeedometer } from "react-icons/io";
const SatisfactionRate = ({ velocity, data }) => {
  const [showGraph, setShowGraph] = useState(false);
  const VelocityChart = data.map((item, idx) => ({
    name: `${idx}`,
    vel: parseInt(item.velocity),
  }));
  console.log(data);
  return (
    <Card sx={{ height: "340px" }}>
      <VuiBox display="flex" flexDirection="column">
        <VuiBox display="flex" flexDirection="row" justifyContent="space-between">
          <div>
            <VuiTypography variant="lg" color="white" fontWeight="bold" mb="4px">
              Velocity - m/s
            </VuiTypography>
            <br />
            <VuiTypography variant="button" color="text" fontWeight="regular" mb="20px">
              From all measurements
            </VuiTypography>
          </div>

          <Button variant={"outlined"} onClick={() => setShowGraph((prev) => !prev)}>
            {showGraph ? (
              <IoIosSpeedometer size="25px" color="white" />
            ) : (
              <VscGraphLine size="25px" color="white" />
            )}
          </Button>
        </VuiBox>
        <VuiBox sx={{ alignSelf: "center", justifySelf: "center", zIndex: "-1" }}>
          <VuiBox sx={{ position: "relative", display: "inline-flex" }}>
            {showGraph ? (
              <LineChart width={1080} height={200} data={VelocityChart}>
                <XAxis dataKey="name" />
                <YAxis />
                <Line type="monotone" dataKey="vel" stroke="#06db0d" />
              </LineChart>
            ) : (
              <Speedometer
                value={velocity}
                min={0}
                max={10}
                angle={180}
                fontFamily="Gauge Mono Regular"
              >
                <Background angle={180} />
                <Arc arcWidth={10} color={"#232f4e"} c />
                <Needle baseWidth={10} offset={40} baseOffset={-5} />
                <Progress arcWidth={15} />
                <Marks lineOpacity={0} fontSize={12} />
                <Indicator></Indicator>
              </Speedometer>
            )}
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default SatisfactionRate;
