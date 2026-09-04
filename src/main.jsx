import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./Layout"
import App from "./App.jsx"
import Tournament from "./pages/tournament/tournament.jsx"
import About from "./pages/about/about.jsx"
import Booklet from "./pages/booklet/booklet.jsx"
import FarRedirect from "./pages/far.jsx"
import Activities from "./pages/activities/activities.jsx"
import Events from "./pages/events/events.jsx"
import Food from "./pages/food/food.jsx"
import Location from "./pages/location/location.jsx"
import Shop from "./pages/shop/shop.jsx"
import SpectatorPasses from "./pages/spectator-passes/spectator-passes.jsx"
import Bracket from "./pages/bracket/bracket.jsx"
import Maintenance from "./pages/maintenance/Maintenance.jsx"

// Set to true to show maintenance page
const MAINTENANCE_MODE = false;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {MAINTENANCE_MODE ? (
          <Route path="*" element={<Maintenance />} />
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="tournament" element={<Tournament />} />
            <Route path="about" element={<About />} />
            <Route path="booklet" element={<Booklet />} />
            <Route path="far" element={<FarRedirect />} />
            <Route path="events" element={<Events />} />
            <Route path="activities" element={<Activities />} />
            <Route path="food" element={<Food />} />
            <Route path="shop" element={<Shop />} />
            <Route path="spectator-passes" element={<SpectatorPasses />} />
            <Route path="location" element={<Location />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
