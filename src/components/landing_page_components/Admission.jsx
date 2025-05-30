import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, CreditCard, CheckCircle } from "lucide-react"

export default function Admission() {
  return (
    <section id="admission" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Admission Process</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our school family! Follow these simple steps to secure admission for your child.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Step 1</CardTitle>
              <CardDescription>Fill Application Form</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Complete the online application form with required details and documents.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Step 2</CardTitle>
              <CardDescription>Pay Application Fee</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Submit the application fee of ₹500 through online payment gateway.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Step 3</CardTitle>
              <CardDescription>Attend Interview</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Participate in the admission interview with your child and parents.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Step 4</CardTitle>
              <CardDescription>Confirmation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Receive admission confirmation and complete the enrollment process.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Admission Open for 2024-25</h3>
          <p className="text-lg mb-6">
            Limited seats available! Apply now to secure your child's future with quality education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Download Prospectus
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Apply Online Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
