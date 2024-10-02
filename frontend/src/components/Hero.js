import hero from "../assets/hero.jpg";

const Hero = () => {
  return (
    React.createElement("div", null,
      React.createElement("img", {
        src: hero,
        alt: "",
        className: "w-full max-h-[600px] object-cover"
      })
    )
  );
};

export default Hero;

