import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import BackToTop from "./components/BackToTop"
import { Outlet, useLocation } from "react-router-dom"

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1a1a1a]">
      <Navbar isLoaded={true} />
      <ScrollToTop />
      <main className="flex-1">
        <Outlet />
      </main>
      <BackToTop />
      <Footer isLoaded={true} hasTopDivider={location.pathname !== '/'} />
    </div>
  )
}
