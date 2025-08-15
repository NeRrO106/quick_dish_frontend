function Contact() {
  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4">
      <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Contact Page
        </h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 space-y-6 shadow-lg">
          <p className="text-lg md:text-xl font-light text-[var(--text-light)]">
            📬 Welcome to the Contact Page! We are happy to hear from you.
          </p>
          <p className="text-lg md:text-xl font-light text-[var(--text-light)]">
            📝 Please fill out the form below for any inquiries or support.
          </p>
          <p className="text-lg md:text-xl font-light text-[var(--text-light)]">
            ☎️ For urgent matters, call us at{" "}
            <span className="font-semibold">(123) 456-7890</span>.
          </p>
          <p className="text-lg md:text-xl font-light text-[var(--text-light)]">
            📧 Email us at{" "}
            <span className="font-semibold">contact.quickdish@gmail.com</span>
          </p>

          <form className="space-y-4 bg-[var(--color-accent2)]">
            <h3 className="text-xl font-bold tracking-tight leading-tight drop-shadow-lg">
              Contact US
            </h3>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
            />
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="w-full text-[var(--text-light)] font-semibold py-2 rounded-lg transition"
            >
              Send Message
            </button>
          </form>

          <p className="text-lg md:text-xl font-light text-[var(--text-light)] flex space-x-4 justify-center">
            Follow us:
            <span>📘 Facebook</span>
            <span>🐦 Twitter</span>
            <span>📸 Instagram</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Contact;
