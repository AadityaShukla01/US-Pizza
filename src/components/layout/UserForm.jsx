"use client";

import React, { useState } from "react";
import { useProfile } from "../getUserProfile";
import AddressInputs from "./AddressInputs";

const UserForm = ({ user, onSave }) => {
  const [username, setUsername] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [country, setCountry] = useState(user?.country || "");
  const [city, setCity] = useState(user?.city || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  }

  return (
    <div className="mb-22">
      <div className="md:flex gap-4">
        <div>
          <div className="p-2 rounded-lg relative max-w-[120px]">
            {/* <EditableImage link={image} setLink={setImage} /> */}
          </div>
        </div>
        <form
          className="grow"
          onSubmit={(ev) =>
            onSave(ev, {
              name: username,
              image,
              phone,
              admin,
              streetAddress,
              city,
              country,
              postalCode,
            })
          }
        >
          <label>First and last name</label>
          <input
            type="text"
            placeholder="First and last name"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            disabled={true}
            value={user?.email}
            placeholder={"email"}
          />

          <AddressInputs
            addressProps={{ phone, streetAddress, postalCode, city, country }}
            setAddressProp={handleAddressChange}
          />
          {loggedInUserData.admin && (
            <div>
              <label
                className="p-2 inline-flex items-center gap-2 mb-2"
                htmlFor="adminCb"
              >
                <input
                  id="adminCb"
                  type="checkbox"
                  className=""
                  value={"1"}
                  checked={admin || 0}
                  onChange={(ev) => setAdmin(ev.target.checked)}
                />
                <span>Admin</span>
              </label>
            </div>
          )}
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
