import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import i18n from "./i18n";

// 等待i18n初始化完成
i18n.on('initialized', () => {
  // Entry point
  ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// 如果已经初始化，直接渲染
if (i18n.isInitialized) {
  ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </React.StrictMode>,
    document.getElementById("root")
  );
}
