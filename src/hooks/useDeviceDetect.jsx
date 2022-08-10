import React from "react";

const useDeviceDetect = () => {
  const [device, setDevice] = React.useState({});

  React.useEffect(() => {
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const tablet = /iPad|iPod|Android/i.test(navigator.userAgent);
    const desktop = !mobile && !tablet;
    setDevice({ mobile, tablet, desktop });
  }, []);

  if (device.mobile) {
    return "mobile";
  }
  if (device.tablet || device.desktop) {
    return "desktop";
  }
};

export default useDeviceDetect;
