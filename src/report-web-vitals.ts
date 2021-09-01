import { ReportHandler } from "web-vitals";

// report web vitals
const reportWebVitals = function (onPerfEntry?: ReportHandler) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(function ({
      getCLS,
      getFID,
      getFCP,
      getLCP,
      getTTFB,
    }) {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
