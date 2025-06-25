import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=40&h=40&fit=crop&crop=center"
                alt="Matra Kripa Education Point Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold">Matra Kripa Education Point</h3>
                <p className="text-sm text-gray-400">Excellence in Education</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Nurturing young minds since 2016. We are committed to providing quality education that shapes character
              and builds confidence.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="https://twitter.com/" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="https://instagram.com/" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="https://youtube.com/" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/admission" className="text-gray-300 hover:text-white transition-colors">Admission</a></li>
              <li><a href="/academics" className="text-gray-300 hover:text-white transition-colors">Academics</a></li>
              <li><a href="/facilities" className="text-gray-300 hover:text-white transition-colors">Facilities</a></li>
              <li><a href="/events" className="text-gray-300 hover:text-white transition-colors">Events</a></li>
              <li><a href="/gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="/student-portal" className="text-gray-300 hover:text-white transition-colors">Student Portal</a></li>
              <li><a href="/parent-portal" className="text-gray-300 hover:text-white transition-colors">Parent Portal</a></li>
              <li><a href="/fee-payment" className="text-gray-300 hover:text-white transition-colors">Fee Payment</a></li>
              <li><a href="/downloads" className="text-gray-300 hover:text-white transition-colors">Downloads</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-gray-300 text-sm">
                    WARD 05, Badagaon<br />
                    Madhya Pradesh 465445
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <a href="tel:+918349307262" className="text-gray-300 text-sm hover:underline">+91 8349307262</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <a href="mailto:mkepbadagaon@gmail.com" className="text-gray-300 text-sm hover:underline">mkepbadagaon@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Matra Kripa Education Point. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="/cookie-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
