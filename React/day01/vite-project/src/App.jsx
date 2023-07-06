import { useState } from "react"
import reactLogo from "./assets/react.svg"
import reactLogo1 from "../public/vite.svg"
import "./App.css"

// 函数式组件
function App() {
  const [count, setCount] = useState(2)

  return (
    <div className='App'>
      <div>
        {/* <a href='https://vitejs.dev' target='_blank'>
          <img src={reactLogo1} className='logo' alt='Vite logo' />
        </a> */}
        <a href='https://vitejs.dev' target='_blank'>
          <img src='./vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://luyu02.github.io' target='_blank'>
          <img src={reactLogo} className='logo react' alt='小江博客主页' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count ** 2)}>
          计数 {count}
        </button>
        <p>
          编辑 <code>src/App.jsx</code> 并保存以测试HTML
        </p>
      </div>
      <p className='read-the-docs'>点击Vite和React图标了解更多信息</p>
    </div>
  )
}

export default App
