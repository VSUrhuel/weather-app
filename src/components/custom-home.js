import React from "react";
import Header from "./header";

const CustomHome = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted">
      <Header />

      {/* Main content should expand to push the footer down */}
      <main className="container mx-auto px-4 py-12 max-h-full">
        {children}
      </main>

      {/* Footer stays at the bottom */}
      <div className="">
        <footer className="border-t backdrop-blur h-fit bg-background/95 flex justify-center items-center">
          <div className="h-fit mx-auto pb-3 pt-3 text-center text-gray-400 text-sm">
            <p>
              Weather data powered by{" "}
              <a
                href="https://openweathermap.org/"
                className="text-blue-400 hover:underline"
              >
                OpenWeather API
              </a>
            </p>

            <p>2025 © Laurente</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CustomHome;
