import { useState } from "react";
import { showToast } from "../utils/ShowToast";
import postEntity from "../utils/PostEntity";
function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      showToast("Please fill in all fields", "error");
      return;
    }

    if (!emailPattern.test(email)) {
      showToast("Invalid email", "error");
      return;
    }

    try {
      await postEntity(`/api/contact`, {
        name,
        email,
        message,
      });
      showToast("Message sent successfully!", "success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        showToast(
          (error as { message?: string }).message || "❌ Something went wrong!",
          "error"
        );
      } else if (typeof error === "string") {
        showToast(error, "error");
      } else {
        showToast("❌ Something went wrong!", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Contact Page
        </h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-8 space-y-6 shadow-lg">
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

          <form
            className="space-y-4 bg-[var(--color-accent2)] p-4 rounded-xl"
            onSubmit={handleSubmit}
          >
            <h3 className="text-xl font-bold tracking-tight leading-tight drop-shadow-lg">
              Contact Us
            </h3>
            <input
              type="text"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/10 text-[var(--text-dark)] placeholder-white/70 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/10 text-[var(--text-dark)] placeholder-white/70 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
            />
            <textarea
              placeholder="Your Message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/10 text-[var(--text-dark)] placeholder-white/70 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="w-full text-[var(--text-dark)] bg-[var(--color-accent1)] font-semibold py-2 rounded-lg transition hover:scale-95 hover:shadow-xl hover:bg-[var(--color-accent3)]"
            >
              Send Message
            </button>
          </form>

          <p className="text-lg md:text-xl font-light text-[var(--text-dark)] flex justify-center items-center gap-4">
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
