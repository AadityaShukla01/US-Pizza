import React from "react";

const About = () => {
  return (
    <div className="text-center flex flex-col gap-1 items-center m-8">
      <h3 className=" uppercase text-gray-600 font-semibold text-xl">
        Our story
      </h3>
      <h2 className="text-4xl font-semibold text-primary italic">About us</h2>
      <div className="mt-8">
        <p className="text-xl text-gray-500 flex-wrap">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium
          reiciendis quibusdam error nihil in fuga, cupiditate culpa! Mollitia
          quis quaerat voluptatibus esse quos.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem pariatur magni vitae aliquam sequi architecto repellat voluptates necessitatibus nisi, enim laudantium nostrum exercitationem alias error omnis in fugit, accusantium doloremque et, molestias veniam? Nemo, modi veritatis.
        </p>
      </div>
    </div>
  );
};

export default About;
