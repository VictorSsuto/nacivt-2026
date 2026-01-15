import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Outlet, useLocation } from "react-router-dom"

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <Navbar isLoaded={true} />
      <Outlet />
      <Footer isLoaded={true} hasTopDivider={location.pathname !== '/'} />
    </div>
  )
}
