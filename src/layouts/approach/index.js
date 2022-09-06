import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import { Card } from "@mui/material";
import AUVImg from "assets/images/AUVImg.jpeg";
import DPSSImg from "assets/images/DPSSimg.jpeg";
import DPSSImg2 from "assets/images/DPSSimg2.jpeg";
import KFImg from "assets/images/KFImg.jpeg";
import VuiTypography from "components/VuiTypography";
const Approach = () => {
  return (
    <DashboardLayout>
      <div style={{ height: "100vh" }}>
        <VuiBox py={3}>
          <VuiBox mb={3}>
            <Grid container spacing="18px" justifyContent="center">
              <Grid item xs={12} md={8}>
                <Card>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    mb="5px"
                    style={{ fontSize: "40px" }}
                  >
                    Introduction
                  </VuiTypography>
                  <VuiTypography color="white">
                    Doppler velocity logs (DVLs), currently the leading technology for underwater
                    velocity estimation, can be too big, expensive, and energy consuming to be used
                    on low-cost and small AUVs or for long missions. We propose and demonstrate the
                    DPSS prototype as an important step toward a small, inexpensive, and
                    energy-efficient alternative or complement to a DVL in certain applications.
                    Velocity estimation is central for the reliable navigation of autonomous
                    underwater vehicles (AUVs). For successful operation and recovery of autonomous
                    underwater vehicles (AUVs), robust navigation and localization are crucial .
                    However, the availability of sophisticated sensor systems for navigation and
                    localization is restricted by the size, energy requirements, budget, and
                    operation conditions of the particular vehicle. Especially with the increasing
                    use of low-cost and small vehicles, there is a need for alternative sensor
                    solutions
                  </VuiTypography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4} alignItems="center" display={"flex"}>
                <img src={AUVImg} alt="" width={"100%"} />
              </Grid>
              <Grid item xs={12} md={8}>
                <Card>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    size="lg"
                    mb="5px"
                    style={{ fontSize: "40px" }}
                  >
                    DPSS
                  </VuiTypography>
                  <VuiTypography color="white">
                    We propose and demonstrate the DPSS prototype as an important step toward a
                    small, inexpensive, and energy-efficient alternative or complement to a DVL in
                    certain ap- plicationsThe DPSS utilizes two differential pressure sensors to
                    mea- sure pressure across three points on its surface, and an IMU is used to
                    detect angular disturbances. A microcontroller em- bedded in the DPSS uses the
                    velocity model to relate the pressure measurements of the differential pressure
                    sensors with the surge velocity.differential pressure sensors are not sensitive
                    to depth changes, contrary to absolute pressure sensors, which enables the DPSS
                    to measure with a higher sensitivity. a six-degree- of-freedom IMU (InvenSense,
                    San Jose, CA, USA, MPU-6050) provides input for the correction algorithm. <br />
                    <br />
                    Finally, the information from the DPSS is transmitted to the AUV using a serial
                    connection with a transmission rate of 100 Hz. The pressure on the surface of
                    the DPSS is measured using three flush holes normal to its surface, which we
                    call pressure taps. Fig. 3 illustrates the location of the pressure taps on the
                    surface of the DPSS at 0◦ (stagnation point) and ± 35◦. The pressure differences
                    are measured using two analog differential pressure sensors (NXP Semiconductors
                    MPXV7002). As already mentioned in Section I, differential pressure sensors are
                    not sensitive to depth changes, contrary to absolute pressure sensors, which
                    enables the DPSS to measure with a higher sensitivity.
                  </VuiTypography>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                alignItems="center"
                justifyContent={"space-evenly"}
                flexDirection="column"
                display={"flex"}
              >
                <img src={DPSSImg} alt="" width={"100%"} />
                <img src={DPSSImg2} alt="" width={"100%"} />
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    size="lg"
                    mb="5px"
                    style={{ fontSize: "40px" }}
                  >
                    Kalman Filter
                  </VuiTypography>
                  <VuiTypography color="white">
                    Though current inertial navigation systems (INS) provide increasingly accurate
                    heading and acceleration measurements that can improve overall position
                    estimates , this method suffers from unbounded errors. In best practice, the
                    methods mentioned above are combined using sensor fusion and state estimation to
                    increase the overall robustness and accuracy of the navigation system. Methods
                    for sensor fusion and state estimation include Kalman filters, particle filters,
                    and simultaneous localization and mapping. The most commonly adopted method for
                    state estimation is the extended Kalman filter (EKF) that can handle nonlinear
                    processes with Gaussian error distributions at a moderate computational load.
                  </VuiTypography>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <img src={KFImg} alt="" />
              </Grid>
            </Grid>
          </VuiBox>
        </VuiBox>
      </div>
    </DashboardLayout>
  );
};
export default Approach;
