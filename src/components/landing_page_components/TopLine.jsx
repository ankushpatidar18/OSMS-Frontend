import { Mail, Phone } from "lucide-react";

export default function TopLine() {
  return (
    <div className="bg-black text-white py-2 px-2 sm:px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <a
            href="mailto:mkepbadagaon@gmail.com"
            className="flex items-center space-x-1 sm:space-x-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
            aria-label="Email mkepbadagaon@gmail.com"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs sm:text-sm">mkepbadagaon@gmail.com</span>
          </a>
          <a
            href="tel:+918349307262"
            className="flex items-center space-x-1 sm:space-x-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
            aria-label="Call +91 8349307262"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs sm:text-sm">+91 8349307262</span>
          </a>
        </div>
        <div className="hidden md:block text-xs mt-2 md:mt-0">
          Excellence in Education Since 2016
        </div>
      </div>
    </div>
  );
}
