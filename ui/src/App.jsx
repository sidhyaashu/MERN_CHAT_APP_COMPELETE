import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"
import { BrowserRouter } from "react-router-dom";
import './App.css'


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/chats' element={<ChatPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
