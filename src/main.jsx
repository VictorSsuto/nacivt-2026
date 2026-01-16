import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./Layout"
import App from "./App.jsx"
import Register from "./pages/register/register.jsx"
import Tournament from "./pages/tournament/tournament.jsx"
import Festival from "./pages/festival/festival.jsx"
import About from "./pages/about/about.jsx"
import Rules from "./pages/rules/rules.jsx"
import Location from "./pages/location/location.jsx"
import Bracket from "./pages/bracket/bracket.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="register" element={<Register />} />

          <Route path="tournament" element={<Tournament />} />


          <Route path="festival" element={<Festival />} />
          <Route path="about" element={<About />} />
          <Route path="location" element={<Location />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
