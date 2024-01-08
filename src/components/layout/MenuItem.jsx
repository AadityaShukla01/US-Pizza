import { CartContext } from "@/context/AppContext";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import MenuItemTile from "../MenuItemTile";
import Image from "next/image";

const MenuItem = (menuItem) => {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;

  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  //state -> sizes           // so that we pick smallest by default
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);

  //state -> extra ingridents
  const [selectedExtras, setSelectedExtras] = useState([]);

  function handleExtraIngridents(e, extraThing) {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras((pre) => [...pre, extraThing]);
    } else {
      setSelectedExtras((pre) => {
        return pre.filter((t) => t.name !== extraThing.name);
      });
    }
  }

  function handleAddToCartButtonClick() {
    if (showPopup) {
      addToCart(menuItem, selectedSize, selectedExtras);
      toast.success("Add to cart!");
      setShowPopup(false);
      return;
    }
    
    if (sizes.length === 0 && extraIngredientPrices.length == 0) {
      toast.success("Add to cart!");
      addToCart(menuItem);
    } else {
      setShowPopup(true);
    }
  }

  // calculating price of our item
  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
          onClick={() => setShowPopup(false)}
        >
          <div
            // done so that if we click on the cart the pop up doesnt close
            onClick={(e) => e.stopPropagation()}
            className="text-gray-900 bg-white p-4 rounded-lg max-w-md max-h-screen overflow-y-scroll"
          >
            <Image
              src={image}
              width={300}
              height={200}
              alt={name}
              className="mx-auto"
            />
            <h2 className="text-center text-lg font-bold">{name}</h2>
            <p className="text-center text-sm mt-2">{description}</p>
            {sizes.length > 0 && (
              <div className="p-2">
                <h3 className="text-center mb-1">Pick your size</h3>
                {sizes.map((size) => (
                  <label className="flex items-center gap-2 mb-2 rounded-md border p-4">
                    <input
                      type="radio"
                      name="size"
                      onClick={() => setSelectedSize(size)}
                      checked={selectedSize?.name === size.name}
                    />
                    {size.name} {" ₹ "}
                    {basePrice + size.price}
                  </label>
                ))}
              </div>
            )}

            {extraIngredientPrices.length > 0 && (
              <div className="p-2">
                <h3 className="text-center mb-1">Any extras..</h3>
                {extraIngredientPrices.map((extraIngredientPrice) => (
                  <label className="flex items-center gap-2 mb-2 rounded-md border p-4">
                    <input
                      type="checkbox"
                      name={extraIngredientPrice.name}
                      onClick={(e) =>
                        handleExtraIngridents(e, extraIngredientPrice)
                      }
                    />
                    {extraIngredientPrice.name}
                    {" +"} {"₹ "}
                    {basePrice + extraIngredientPrice.price}
                  </label>
                ))}
              </div>
            )}
            <button
              type="button"
              className="text-gray-900 primary sticky bottom-2"
              onClick={handleAddToCartButtonClick}
            >
              Add to Cart ₹{selectedPrice}
            </button>
          </div>
        </div>
      )}
      <div>
        <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
      </div>
    </>
  );
};

export default MenuItem;
