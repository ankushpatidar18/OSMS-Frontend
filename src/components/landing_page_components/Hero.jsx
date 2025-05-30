import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Award, BookOpen } from "lucide-react"

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* School Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop"
              alt="Matra Kripa Education Point School Building"
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <Award className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="font-semibold text-sm"> MP Board Affiliated</p>
                  <p className="text-xs text-gray-600">Since 2016</p>
                </div>
              </div>
            </div>
          </div>

          {/* School Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Matra Kripa Education Point,Badagaon</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nurturing young minds for over 10 years, we are committed to providing quality education that shapes
                character, builds confidence, and prepares students for a bright future. Our holistic approach combines
                academic excellence with moral values.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">1200+ Students</p>
                  <p className="text-sm text-gray-600">Active Learners</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">20+ Teachers</p>
                  <p className="text-sm text-gray-600">Qualified Faculty</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold">Classes 1-8</p>
                  <p className="text-sm text-gray-600">MP Board Curriculum</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold">98% Results</p>
                  <p className="text-sm text-gray-600">Board Exams</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Apply for Admission
              </Button>
              <Button variant="outline" size="lg">
                Virtual School Tour
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
