module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.js", // adaugă asta
  ],
  plugins: [
    require("flowbite/plugin"), // și asta
  ],
};
