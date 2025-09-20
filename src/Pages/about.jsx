import React from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  return (
    <>

      <section id="about" className="py-10 bg-amber-50/40 text-justify md:mt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2">
              <div className="max-w-2xl mx-auto">
                <h1 className="md:text-6xl text-3xl font-semibold mb-4 pt-10 md:mt-10 ">
                  Meet Dr. R. K. Tailor
                </h1>
                <p className="text-lg font-medium mb-6 md:mt-20">
                  Dr. R. K. Tailor stands as a visionary figure at the confluence of ancient wisdom and modern
                  psychological science. As a distinguished academic, respected practitioner,
                  and the guiding force behind the institute's holistic approach, 
                  he has dedicated his career of over 20 years to bridging the gap between 
                  the spiritual insights of the East and the psychological frameworks of the West.

                  <h3 className="text-2xl p-5">A Foundation in Academia and Practice</h3>
                  Currently serving as an Associate Professor at Manipal University Jaipur, Dr. Tailor brings a rare depth of scholarly rigor to his work. His academic position allows him to apply his unique interdisciplinary approach to education, shaping a new generation of thinkers who are both intellectually sharp and spiritually grounded. This academic foundation is complemented by two decades of hands-on practice, where he has provided holistic guidance to countless individuals seeking clarity and balance.
                </p>
                <Link to="/courses">
                  <button className="border-2 border-orange-600 bg-yellow-800 text-white rounded-full px-10 py-3 hover:bg-orange-600 transition md:ml-5">
                    Join Rajshaili Course
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <img src="AboutImg/Gemini_Generated_Image_v7qse5v7qse5v7qs-removebg-preview (1).png" alt="#" className=" md:h-[100vh] p-4  ml-8 md:ml-50" />
            </div>
          </div>
        </div>
      </section>

      <section id="about-title" className="py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">The Rajshaili Professional Program in Vastu Science and Psychology</h2>
          </div>
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <img src="AboutImg/Gemini_Generated_Image_ukkt42ukkt42ukkt.png" alt="" className="w-full md:w-160 md:ml-8 h-auto" />
            </div>
            <div className="w-full lg:w-1/2">
              <p className="text-xl mb-5 pt-5 md:m-5">
                 <h3 className=" md:text-6xl text-4xl">Meet Shalini Salecha</h3>
                <div className="mt-5 md:mt-20">
                    Shalini Salecha is a distinguished and well-regarded voice in the fields of Vedic Astrology and Vastu Shastra. Based in the historic city of Jaipur, she has earned a reputation as a trusted consultant for those seeking clarity and direction in their personal and professional lives.

                    At the heart of Shalini's practice is a deep commitment to her clients. Known for her welcoming and highly professional approach, she creates a supportive and confidential environment where individuals feel comfortable exploring life's most important questions. Her consultations are consistently described as insightful, moving beyond simple predictions to provide deep, actionable wisdom that empowers clients to make informed decisions.

                    Shalini's expertise is centered on two key areas of ancient Vedic science:

                    Vastu Shastra: Through her expert Vastu consultations, she guides clients in transforming their homes and workplaces into spaces of harmony, positivity, and abundance, aligning their environment with cosmic energies to support well-being and success.

                    Vedic Astrology: Her insightful Kundali (horoscope) readings offer a profound look into an individual's life path. She provides specialized guidance on crucial areas such as career, education, and relationships, helping clients understand their strengths and navigate challenges with confidence.

                    For those seeking to understand their journey with greater awareness and build a life of balance and purpose, Shalini Salecha stands as an empathetic and insightful guide..
                </div>
              </p>
              <Link to="/courses">
                <button className="border-2 border-orange-600 bg-yellow-800 text-white rounded-full px-10 py-3 hover:bg-orange-600 transition md:ml-5">
                Join Rajshaili Course
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="award" className="py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-8">Awards & Accolades</h2>
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <img src="AboutImg/WhatsApp Image 2025-09-19 at 6.23.51 PM.jpeg" alt="" className="w-11/12 mx-auto" />
            </div>
            <div className="w-full lg:w-1/2 m-5 md:m-0">
              <ul className="list-none space-y-8 text-left pt-5">
                {[
                  "Achaarya Upadhi (2018) – Honored by Akhil Bhartiya Prachya Jyotish Shod Sansthan",
                  "Jyotish Praveen Award (2018) – Honored by Chaturth International Mahasammelan",
                  "Astrology Excellence (2018) – Honored by HNN 27*4 Channel, New Delhi",
                  "Bhrigru Rishi Upadhi (2019) – Honored by Akhil Bhartiya Jyotish Sansthan Sangh",
                  "Vedang Bhushan Upadhi (2019) – Honored by Akhil Bhartiya Prachya Jyotish Shod Sansthan",
                  " Saraswat Samman (2019) – Honored by Rajkiya Maharaj Achaarya Sanskrit Mahavidyalaya"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="mr-2 text-green-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export { About };
