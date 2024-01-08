import React, { useEffect, useState } from "react";
import MenuItemsPriceProps from "./MenuItemsPriceProps";

const MenuItemform = ({ onSubmit, menuItem }) => {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((response) => {
      response.json().then((data) => {
        setCategories(data);
      });
    });
  }, []);

  return (
    <div>
      <form
        className="mx-auto max-w-md mt-8"
        onSubmit={(ev) =>
          onSubmit(ev, {
            image,
            name,
            description,
            basePrice,
            sizes,
            extraIngredientPrices,
            category
          })
        }
      >
        <div className="flex gap-4 items-start">
          <div>Image</div>
          <div className="grow">
            <label>Menu item name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.length > 0 &&
                categories.map((c) => <option value={c._id}>{c.name}</option>)}
            </select>
            <label>Base Price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <MenuItemsPriceProps
              name={"Sizes"}
              addLabel={"Add item sizes"}
              props={sizes}
              setProps={setSizes}
            />
            <MenuItemsPriceProps
              name={"Extra ingredients"}
              addLabel={"Add ingredients prices"}
              props={extraIngredientPrices}
              setProps={setExtraIngredientPrices}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MenuItemform;
