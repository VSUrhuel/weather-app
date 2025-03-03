import React from "react";
import Header from "./header";

const CustomHome = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted max-w-[100vw]">
      <Header></Header>
      <main className="container mx-auto px-4 py-12 min-h-screen">
        {children}
      </main>
      <footer className="border-t backdrop-blur h-fit bg-background/95 justiyf-center items-center">
        <div className="h-fit mx-auto pb-3 pt-3 text-center items-center justify-center text-gray-400 text-sm">
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
  );
};

export default CustomHome;
