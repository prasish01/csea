import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    idea: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", idea: "" });
  };

  return (
    <section className="min-h-screen bg-p2 pt-32 px-6 mt-20">
      <div className="container mx-auto">
        <div className="fade-up flex max-md:flex-col gap-12 items-center mb-12">
          {/* Left Image */}
          <div className="w-1/2 max-md:w-full">
            <img
              src="/images/contect.png"
              alt="contact"
              className="w-full object-contain"
            />
          </div>

          {/* Right Form */}
          <div className="w-1/2 max-md:w-full bg-p3 rounded-3xl p-8">
            <h3 className="text-p1 text-2xl font-semibold mb-4">
              Have a Great Idea?
            </h3>

            <p className="text-p2 mb-6">
              Reach out to us! Share your idea and we might turn it into our
              next club project.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border border-p3 bg-p4 text-white placeholder-p3"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border border-p3 bg-p4 text-white placeholder-p3"
              />

              <textarea
                name="idea"
                placeholder="Your Idea"
                value={formData.idea}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border border-p3 bg-p4 text-white placeholder-p3 resize-none h-32"
              />

              <button
                type="submit"
                className="bg-p2 text-white py-3 rounded-full hover:bg-p1/80 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
