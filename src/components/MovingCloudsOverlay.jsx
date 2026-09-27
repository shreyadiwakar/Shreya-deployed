import React from 'react';

/**
 * MovingCloudsOverlay
 * - Creates a gentle, soothing, organic drifting cloud effect across the pastel sky.
 * - Soft layered puffs with varying speeds, opacities, and blur for a living anime sunset feel.
 * - Pure CSS animations with GPU acceleration (transform: translate3d).
 */

export const MovingCloudsOverlay = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes driftSlow1 {
          0% { transform: translate3d(-12%, 0, 0); }
          50% { transform: translate3d(10%, -8px, 0); }
          100% { transform: translate3d(-12%, 0, 0); }
        }
        @keyframes driftSlow2 {
          0% { transform: translate3d(8%, 0, 0); }
          50% { transform: translate3d(-10%, 12px, 0); }
          100% { transform: translate3d(8%, 0, 0); }
        }
        @keyframes driftMedium {
          0% { transform: translate3d(-8%, 0, 0); }
          50% { transform: translate3d(14%, -12px, 0); }
          100% { transform: translate3d(-8%, 0, 0); }
        }
        @keyframes driftFast {
          0% { transform: translate3d(-5%, 0, 0); }
          50% { transform: translate3d(18%, 10px, 0); }
          100% { transform: translate3d(-5%, 0, 0); }
        }
        .animate-cloud-slow-1 {
          animation: driftSlow1 55s ease-in-out infinite;
        }
        .animate-cloud-slow-2 {
          animation: driftSlow2 48s ease-in-out infinite;
        }
        .animate-cloud-mid {
          animation: driftMedium 36s ease-in-out infinite;
        }
        .animate-cloud-fast {
          animation: driftFast 26s ease-in-out infinite;
        }
      `}</style>

      {/* TOP ZONE: High soft pink and peach clouds */}
      <div
        className="absolute top-10 -left-20 w-[650px] h-[280px] rounded-[100%] bg-gradient-to-r from-pink-300/25 via-rose-200/30 to-pink-200/15 blur-[60px] animate-cloud-slow-1 will-change-transform"
      />
      <div
        className="absolute top-32 right-[-5%] w-[750px] h-[320px] rounded-[100%] bg-gradient-to-bl from-rose-200/35 via-orange-100/30 to-pink-200/20 blur-[55px] animate-cloud-slow-2 will-change-transform"
      />
      <div
        className="absolute top-64 left-[25%] w-[580px] h-[220px] rounded-[100%] bg-white/35 blur-[45px] animate-cloud-fast will-change-transform"
      />

      {/* MID-UPPER ZONE: Fluffy cotton-candy drifts */}
      <div
        className="absolute top-[28%] -left-10 w-[720px] h-[290px] rounded-[100%] bg-gradient-to-br from-pink-200/30 via-rose-100/35 to-amber-100/20 blur-[50px] animate-cloud-mid will-change-transform"
      />
      <div
        className="absolute top-[34%] right-[10%] w-[680px] h-[250px] rounded-[100%] bg-gradient-to-l from-orange-100/25 to-pink-200/25 blur-[45px] animate-cloud-slow-1 will-change-transform"
      />
      <div
        className="absolute top-[40%] left-[35%] w-[480px] h-[180px] rounded-[100%] bg-white/30 blur-[40px] animate-cloud-fast will-change-transform"
      />

      {/* MID-LOWER ZONE: Soft rose-gold sunset haze */}
      <div
        className="absolute top-[58%] -right-10 w-[800px] h-[300px] rounded-[100%] bg-gradient-to-r from-pink-300/20 via-orange-100/25 to-rose-200/30 blur-[55px] animate-cloud-slow-2 will-change-transform"
      />
      <div
        className="absolute top-[65%] left-[8%] w-[640px] h-[260px] rounded-[100%] bg-gradient-to-tr from-pink-200/30 to-white/30 blur-[45px] animate-cloud-mid will-change-transform"
      />

      {/* LOWER ZONE: Twilight atmosphere near footer */}
      <div
        className="absolute top-[82%] left-[20%] w-[700px] h-[280px] rounded-[100%] bg-gradient-to-br from-rose-200/25 via-pink-200/20 to-amber-100/20 blur-[50px] animate-cloud-slow-1 will-change-transform"
      />
      <div
        className="absolute top-[88%] right-[5%] w-[580px] h-[240px] rounded-[100%] bg-white/25 blur-[45px] animate-cloud-fast will-change-transform"
      />
    </div>
  );
};
