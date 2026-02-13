const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep layered background with slow animation - L0 */}
      <div 
        className="absolute inset-0 animate-depth-shift"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 15% 10%, rgba(196, 162, 101, 0.10) 0%, transparent 50%),
            radial-gradient(ellipse 50% 45% at 85% 15%, rgba(155, 138, 165, 0.08) 0%, transparent 45%),
            radial-gradient(ellipse 55% 40% at 50% 90%, rgba(159, 183, 198, 0.06) 0%, transparent 40%),
            linear-gradient(180deg, 
              #070709 0%, 
              #0A0A0D 40%, 
              #101015 100%
            )
          `,
          backgroundSize: "200% 200%",
        }}
      />

      {/* Floating gold orb - top left */}
      <div
        className="absolute top-[5%] left-[8%] w-[500px] h-[500px] rounded-full animate-glow-pulse"
        style={{
          background: "radial-gradient(ellipse at center, rgba(196, 162, 101, 0.12) 0%, transparent 55%)",
          filter: "blur(90px)",
          animationDuration: "12s",
        }}
      />

      {/* Floating lilac orb - top right */}
      <div
        className="absolute top-[10%] right-[8%] w-[400px] h-[400px] rounded-full animate-glow-pulse"
        style={{
          background: "radial-gradient(ellipse at center, rgba(155, 138, 165, 0.08) 0%, transparent 50%)",
          filter: "blur(80px)",
          animationDuration: "14s",
          animationDelay: "4s",
        }}
      />

      {/* Clinical subtle orb - near footer */}
      <div
        className="absolute bottom-[8%] left-[25%] w-[450px] h-[350px] rounded-full animate-glow-pulse"
        style={{
          background: "radial-gradient(ellipse at center, rgba(159, 183, 198, 0.06) 0%, transparent 50%)",
          filter: "blur(70px)",
          animationDuration: "16s",
          animationDelay: "8s",
        }}
      />

      {/* Secondary lilac ambient */}
      <div
        className="absolute top-[40%] right-[15%] w-[300px] h-[300px] rounded-full animate-float"
        style={{
          background: "radial-gradient(ellipse at center, rgba(155, 138, 165, 0.05) 0%, transparent 50%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
