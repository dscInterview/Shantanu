import React from "react";
import TestCard from "./cards/test";
import DemoVideo from "./cards/demoVideo";
import ContactPage from "./cards/imageUpload";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      {/* <TestCard /> */}
      <DemoVideo />
      <ContactPage />
    </div>
  );
}

export default App;
