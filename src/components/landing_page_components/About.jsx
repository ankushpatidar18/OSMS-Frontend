import { Target, Heart, Star, Trophy } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Our School</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Established in 2016, Matra Kripa Education Point has been a beacon of quality education in our community,
            fostering academic excellence and character development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div
              className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              aria-label="Mission Icon"
            >
              <Target className="h-8 w-8 text-blue-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To provide holistic education that nurtures intellectual, emotional, and social growth of every student.
            </p>
          </div>

          <div className="text-center">
            <div
              className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              aria-label="Values Icon"
            >
              <Heart className="h-8 w-8 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-gray-600">
              Integrity, compassion, excellence, and respect form the foundation of our educational philosophy.
            </p>
          </div>

          <div className="text-center">
            <div
              className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              aria-label="Vision Icon"
            >
              <Star className="h-8 w-8 text-purple-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To be a leading educational institution that prepares students for global citizenship and lifelong
              learning.
            </p>
          </div>

          <div className="text-center">
            <div
              className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              aria-label="Achievement Icon"
            >
              <Trophy className="h-8 w-8 text-orange-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Achievement</h3>
            <p className="text-gray-600">
              Consistently ranked among the top schools in the region with outstanding academic and co-curricular
              results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
