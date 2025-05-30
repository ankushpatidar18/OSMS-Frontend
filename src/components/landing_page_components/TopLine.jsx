import { Mail, Phone } from "lucide-react"

export default function TopLine() {
  return (
    <div className="bg-black text-white py-2 px-4">
      <div className="container mx-auto flex justify-between items-center text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span> mkepbadagaon@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>+91 8349307262</span>
          </div>
        </div>
        <div className="hidden md:block text-xs">Excellence in Education Since 2016</div>
      </div>
    </div>
  )
}
