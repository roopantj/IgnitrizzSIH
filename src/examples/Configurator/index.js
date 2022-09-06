import { useState, useEffect } from "react";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Icon from "@mui/material/Icon";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";

import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

import {
  useVisionUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setFixedNavbar,
  setSidenavColor,
} from "context";

function Configurator() {
  const [controller, dispatch] = useVisionUIController();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor } = controller;
  const [disabled, setDisabled] = useState(false);
  const sidenavColors = ["primary", "info", "success", "warning", "error"];

  useEffect(() => {
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    window.addEventListener("resize", handleDisabled);

    handleDisabled();

    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => setTransparentSidenav(dispatch, true);
  const handleWhiteSidenav = () => setTransparentSidenav(dispatch, false);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    boxShadows: { buttonBoxShadow },
  }) => ({
    height: pxToRem(42),
    boxShadow: buttonBoxShadow.main,

    "&:hover, &:focus": {
      opacity: 1,
    },
  });

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <VuiBox
        backgroundColor="black"
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <VuiBox>
          <VuiTypography color="white" variant="h5" fontWeight="bold">
            Theme Configurations
          </VuiTypography>
        </VuiBox>

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { white, dark } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            stroke: `${white.main} !important`,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </VuiBox>

      <Divider light />

      <VuiBox pt={1.25} pb={3} px={3}>
        <VuiBox>
          <VuiTypography variant="h6" color="white">
            Sidebar Colors
          </VuiTypography>

          <VuiBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({ borders: { borderWidth }, palette: { white, dark }, transitions }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${white.main}`,
                  borderColor: sidenavColor === color && dark.main,
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                    linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </VuiBox>
        </VuiBox>
        {window.innerWidth >= 1440 && (
          <VuiBox mt={3} lineHeight={1}>
            <VuiTypography variant="h6" color="white">
              Sidebar Type
            </VuiTypography>

            <VuiBox
              sx={{
                display: "flex",
                mt: 2,
              }}
            >
              <VuiButton
                color="info"
                variant={transparentSidenav ? "contained" : "outlined"}
                onClick={handleTransparentSidenav}
                disabled={disabled}
                fullWidth
                sx={{
                  mr: 1,
                  ...sidenavTypeButtonsStyles,
                }}
              >
                Transparent
              </VuiButton>
              <VuiButton
                color="info"
                variant={transparentSidenav ? "outlined" : "contained"}
                onClick={handleWhiteSidenav}
                disabled={disabled}
                fullWidth
                sx={sidenavTypeButtonsStyles}
              >
                Opaque
              </VuiButton>
            </VuiBox>
          </VuiBox>
        )}

        <VuiBox mt={3} mb={2} lineHeight={1}>
          <VuiTypography variant="h6" color="white">
            Navbar Fixed
          </VuiTypography>

          <VuiSwitch checked={fixedNavbar} onChange={handleFixedNavbar} color="info" />
        </VuiBox>

        <Divider light />
      </VuiBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
