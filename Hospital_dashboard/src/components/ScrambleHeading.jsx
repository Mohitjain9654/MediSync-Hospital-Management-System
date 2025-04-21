import React, { useEffect, useState } from "react";

const ScrambleHeading = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("");
    const chars = "!@#$%^&*()_+=-{}[]|;:<>?,./ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    useEffect(() => {
        let iterations = 0;
        const intervalTime = 80; // Slower interval (in ms)
        const step = 0.5; // Slower progress per frame
      
        const scramble = setInterval(() => {
          setDisplayedText((prev) =>
            text
              .split("")
              .map((char, i) => {
                if (i < Math.floor(iterations)) return text[i];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join("")
          );
      
          iterations += step;
          if (iterations > text.length) clearInterval(scramble);
        }, intervalTime);
      
        return () => clearInterval(scramble);
      }, [text]);
      

    return (
        <h1 className="app-header" id="scramble-heading">
            {displayedText}
        </h1>
    );
};

export default ScrambleHeading;
