import { Microscope, Palette, Music, Dumbbell, Globe, Computer } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Microscope,
      title: "Science Labs",
      description: "Well-equipped physics, chemistry, and biology laboratories for hands-on learning.",
    },
    {
      icon: Computer,
      title: "Computer Lab",
      description: "Modern computer lab with latest software and high-speed internet connectivity.",
    },
    {
      icon: Palette,
      title: "Art & Craft",
      description: "Creative arts studio to nurture artistic talents and imagination.",
    },
    {
      icon: Music,
      title: "Music Room",
      description: "Dedicated music room with various instruments for musical education.",
    },
    {
      icon: Dumbbell,
      title: "Sports Facilities",
      description: "Playground, gymnasium, and sports equipment for physical development.",
    },
    {
      icon: Globe,
      title: "Smart Classes",
      description: "Interactive smart boards and digital learning tools in every classroom.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Facilities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            State-of-the-art facilities designed to provide the best learning environment for our students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
