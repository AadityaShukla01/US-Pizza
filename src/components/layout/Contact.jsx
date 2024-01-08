import React from "react";

const Contact = () => {
  return (
    <div className="text-center flex flex-col gap-1 items-center m-8 font-semibold">
      <h3 className="text-gray-600 font-semibold text-xl uppercase">Don't hesitate</h3>
      <h2 className="text-4xl text-primary italic">Contact</h2>
      <div className="mt-8">
        <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
          +46 738 123 123
        </a>
      </div>
    </div>
  );
};

export default Contact;
