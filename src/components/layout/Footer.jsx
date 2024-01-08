import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex justify-between mt-8">
        <div>&copy; U.S. PIZZA</div>
        <div className="flex gap-4">
          <Link href={""}>Instagam</Link>
          <Link href={""}>Twitter</Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
