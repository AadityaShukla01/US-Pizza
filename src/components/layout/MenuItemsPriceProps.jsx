import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaSquarePlus,
  FaTrashCan,
} from "react-icons/fa6";

const MenuItemsPriceProps = ({ addLabel, name, props, setProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  function editProp(e, index, property) {
    const newValue = e.target.value;
    setProps((pre) => {
      const newSizes = [...pre];
      newSizes[index][property] = newValue;
      return newSizes;
    });
  }
  const addProp = () => {
    setProps((pre) => {
      return [...pre, { name: "", price: 0 }];
    });
  };

  function removeProp(indexToRemove) {
    setProps((pre) => pre.filter((v, index) => index !== indexToRemove));
  }
  return (
    <div className="bg-gray-200 p-2 rounded-lg mb-2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex p-1 border-0 justify-start"
        type="button"
      >
        {isOpen && <FaChevronUp color="gray"/>}
        {!isOpen && <FaChevronDown color="gray"/>}
        <span className="text-gray-700">{name}</span>
        <span className="text-gray-700">({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div key={index} className="flex items-end gap-2">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(ev) => editProp(ev, index, "name")}
                />
              </div>
              <div>
                <label>Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(ev) => editProp(ev, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-white mb-2 px-2"
                >
                  <FaTrashCan className="text-primary"/>
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addProp}
          className="bg-white items-center dark:text-gray-700"
        >
          <FaSquarePlus color="gray"/>
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default MenuItemsPriceProps;
