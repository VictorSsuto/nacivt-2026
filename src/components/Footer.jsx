import { LINKS } from "../data/links"
import { Link } from "react-router-dom"

export default function Footer({ isLoaded, hasTopDivider = true }) {
  const topBorderClass = hasTopDivider ? 'border-t-2 border-black/20' : ''

  return (
    <footer className={`${topBorderClass} bg-white mt-0 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="mx-auto max-w-7xl px-8 py-14">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h4 className="font-bold text-black mb-3 text-sm uppercase tracking-wider">
              NACIVT 2026
            </h4>
            <div className="h-px w-12 bg-black/20 mb-3"></div>
            <p className="text-sm text-black/70 leading-relaxed">
              North American Chinese Invitational Volleyball Tournament
            </p>
          </div>
          
          <div className="border-l border-black/10 pl-6 md:pl-8">
            <h4 className="font-bold text-black mb-3 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="h-px w-12 bg-black/20 mb-3"></div>
            <ul className="space-y-2 text-sm">
                <li><Link to={LINKS.home} className="text-black/70 hover:text-[#c8102e] transition-colors">Home</Link></li>
                <li><Link to={LINKS.register} className="text-black/70 hover:text-[#c8102e] transition-colors">Registration</Link></li>
                <li><Link to={LINKS.schedule} className="text-black/70 hover:text-[#c8102e] transition-colors">Schedule</Link></li>
                <li><Link to={LINKS.rules} className="text-black/70 hover:text-[#c8102e] transition-colors">Rules</Link></li>
                <li><Link to={LINKS.location} className="text-black/70 hover:text-[#c8102e] transition-colors">Location</Link></li>
            </ul>
          </div>
          
          <div className="border-l border-black/10 pl-6 md:pl-8">
            <h4 className="font-bold text-black mb-3 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <div className="h-px w-12 bg-black/20 mb-3"></div>
            <p className="text-sm text-black/70">
              <a href={LINKS.contact} className="hover:text-[#c8102e] transition-colors">
                contact@nacivt.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-10 pt-6 text-center text-xs text-black/50">
          © {new Date().getFullYear()} NACIVT Montreal. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
