import Image from "next/image";

const Hero = () => {
  return (
    <section className="grid grid-cols-2">
      <div className="py-8">
        <h1 className="text-4xl font-semibold">
          In <span className="text-primary italic font-semibold">Pizza</span> We
          Crust.
        </h1>
        <p className="my-4 text-gray-400">The Best Pizzas Under One Roof.</p>
        <div className="flex gap-4">
          <button className="text-primary">Order now</button>
          <button>Learn more</button>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image
          src={"/pizza.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"pizza"}
        />
      </div>
    </section>
  );
};

export default Hero;
