import React, { useEffect, useState } from 'react';

export default function Rain() {
  const [raindrops, setRaindrops] = useState([]);

  useEffect(() => {
    const generateRaindrops = () => {
      const drops = [];

      for (let index = 0; index < 100; index++) {
        const randomAnimate = Math.floor(Math.random() * 98 + 2);
        const randomBottom = Math.floor(Math.random() * 4 + 2);

        drops.push(
          <div
            key={index}
            className="drop"
            style={{
              left: `${index}%`,
              bottom: `${randomBottom + 100}%`,
              animationDelay: `0.${randomAnimate}s`,
              animationDuration: `0.${randomAnimate}s`,
            }}
          >
            <div
              className="stem"
              style={{
                animationDelay: `0.${randomAnimate}s`,
                animationDuration: `0.${randomAnimate}s`,
              }}
            ></div>
            <div
              className="splat"
              style={{
                animationDelay: `0.${randomAnimate}s`,
                animationDuration: `0.${randomAnimate}s`,
              }}
            ></div>
          </div>
        );
      }

      return drops;
    };

    setRaindrops(generateRaindrops());
  }, []);

  return (
    <div className="rain">
      {raindrops.map((raindrop, index) => (
        <React.Fragment key={index}>{raindrop}</React.Fragment>
      ))}
    </div>
  );
}


