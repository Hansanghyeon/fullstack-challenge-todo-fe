import { Link } from '@tanstack/react-router'
import { FaGithub } from 'react-icons/fa'

export function FNB() {
  return (
    <footer className="mt-space w-full bg-gray-200 p-6 md:py-12">
      <div className="container grid max-w-7xl grid-cols-2 gap-8 text-sm sm:grid-cols-3 md:grid-cols-5">
        <div className="grid gap-1">
          <h3 className="font-semibold">Company</h3>
          <Link to="/">About Us</Link>
          <Link to="/">Our Team</Link>
          <Link to="/">Careers</Link>
          <Link to="/">News</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Products</h3>
          <Link to="/">Hotel Management System</Link>
          <Link to="/">Booking Engine</Link>
          <Link to="/">POS System</Link>
          <Link to="/">Reporting</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Resources</h3>
          <Link to="/">Documentation</Link>
          <Link to="/">Support</Link>
          <Link to="/">Webinars</Link>
          <Link to="/">Blog</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Legal</h3>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Cookie Policy</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Contact</h3>
          <Link to="/">Sales</Link>
          <Link to="/">Support</Link>
          <Link to="/">Partnerships</Link>
          <div className="mt-2 flex gap-2">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground"
            >
              <FaGithub className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-muted-foreground container mt-8 max-w-7xl text-center text-sm">
        &copy; 2024 fullstack-challenge-template. All rights reserved.
      </div>
    </footer>
  )
}
