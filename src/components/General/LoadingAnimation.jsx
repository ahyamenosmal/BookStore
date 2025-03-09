import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LoadingAnimation = ({ src, width = "200px", height = "200px", text = "Cargando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center  ">
      <DotLottieReact src={src} loop autoplay style={{ width, height }} />
      <p className="text-3xl mt-4">{text}</p>
    </div>
  );
};

export default LoadingAnimation;
