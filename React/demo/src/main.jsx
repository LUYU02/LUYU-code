import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(
  // 检测代码语法是否规范 （可去掉外部标签）
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
