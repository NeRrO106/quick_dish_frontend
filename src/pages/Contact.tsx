function Contact() {
  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4">
      <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Contact Page
        </h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 space-y-6 shadow-lg">
          <p className="text-lg md:text-xl font-light text-[var(--text-dark)]">
            📬 Welcome to the Contact Page! We are happy to hear from you.
          </p>
          <p className="text-lg md:text-xl font-light text-[var(--text-dark)]">
            📝 Please fill out the form below for any inquiries or support.
          </p>
          <p className="text-lg md:text-xl font-light text-[var(--text-dark)]">
            ☎️ For urgent matters, call us at{" "}
            <span className="font-semibold">(123) 456-7890</span>.
          </p>
          <p className="text-lg md:text-xl font-light text-[var(--text-dark)]">
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
              className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 text-[var(--text-dark)] placeholder-white/70 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 text-[var(--text-dark)] placeholder-white/70 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 mb-4 rounded-xl border-2 border-white/30 bg-white/10 text-[var(--text-dark)] placeholder-white/70 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="w-full text-[var(--text-dark)] bg-[var(--color-accent1)]font-semibold py-2 rounded-lg transition border hover:scale-85 hover:shadow-xl hover:bg-[var(--color-accent3)]"
            >
              Send Message
            </button>
          </form>

          <p className="text-lg md:text-xl font-light text-[var(--text-dark)] flex space-x-4 justify-center">
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
