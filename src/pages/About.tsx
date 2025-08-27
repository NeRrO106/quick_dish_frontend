function About() {
  return (
    <div className=" min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4">
      <div className="text-center max-w-xl text-[var(--text-light)] space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          About Page
        </h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 space-y-6 shadow-lg">
          <p className="text-lg md:text-xl font-light text-[var(--text-dark)]">
            🍴 Welcome to the About Page! We are thrilled to have you here.
          </p>
          <p className="text-lg md:text-xl font-light text-[var(--text-dark)]">
            🌟 Our mission is to provide the{" "}
            <span className="font-semibold">best food experience</span>{" "}
            possible.
          </p>
          <p className="text-lg md:text-xl font-light text-[var(--text-dark)]">
            💼 Our dedicated team works tirelessly to ensure quality and
            satisfaction.
          </p>
          <p className="text-lg md:text-xl font-light text-[var(--text-dark)]">
            ❤️ Passion, commitment, and excellence define who we are.
          </p>
          <p className="text-lg md:text-xl font-light text-[var(--text-dark)]">
            📞 For more information, feel free to contact us anytime.
          </p>
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
export default About;
