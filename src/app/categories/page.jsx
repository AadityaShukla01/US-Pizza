"use client";
import UserTabs from "@/components/layout/UserTabs";
import React, { useEffect, useState } from "react";
import Loading from "@/components/layout/Loading";
import { useProfile } from "@/components/getUserProfile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteButton from "@/components/DeleteButton";

const Categories = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const { loading: profileLoading, data: profileData } = useProfile();
  const [categories, setCategories] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);

  // to fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    fetch("/api/categories").then((res) => {
      res.json().then((data) => {
        setCategories(data);
      });
    });
  };

  async function handleNewCategorySubmit(e) {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: newCategoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      setNewCategoryName("");
      fetchCategories(); // so that as soon as we add a category ew can see the changes
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });

    toast.promise(creationPromise, {
      pending: "Wait.....",
      success: editedCategory
        ? "Updating category..."
        : "Creating your new category...",
      success: editedCategory ? "Category updated" : "Category created",
      error: "Error, sorry...",
    });
  }

  async function handleDelete(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });

      if (response.ok) {
        resolve();
      } else reject();
    });

    await toast.promise(promise, {
      pending: "Deleting",
      success: "Deleted",
      error: "Error",
    });
    fetchCategories();
  }

  if (profileLoading) {
    return <Loading />;
  }

  if (!profileData.admin) {
    return "Not an admin";
  }
  return (
    <div className="h-screen">
      <section className="mt-8 max-w-2xl mx-auto">
        <UserTabs admin={true} />

        <form className="mt-8" onSubmit={handleNewCategorySubmit}>
          <div className="flex gap-2 items-end">
            <div className="py-1">
              <label className="dark:text-white">
                {editedCategory ? "Update category" : "New category name"}
                {editedCategory && (
                  <>
                    : <b>{editedCategory.name}</b>
                  </>
                )}
              </label>
              <input
                type="text"
                className="mt-1"
                value={newCategoryName}
                onChange={(ev) => setNewCategoryName(ev.target.value)}
              />
            </div>
            <div className="mb-1 flex gap-2">
              <button className="border border-primary" type="submit">
                {editedCategory ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditedCategory(null);
                  setNewCategoryName("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
        <div>
          <h2 className="mt-8 text-sm text-gray-500 text-center dark:text-white">
            Existing categories
          </h2>

          {categories?.length > 0 &&
            categories.map((c) => (
              <div
                key={c._id}
                className="bg-gray-100 dark:bg-slate-700 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center mt-8"
              >
                <div className="grow">{c.name}</div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEditedCategory(c);
                      setNewCategoryName(c.name);
                    }}
                  >
                    Edit
                  </button>
                  <DeleteButton
                    label="Delete"
                    onDelete={() => handleDelete(c._id)}
                  />
                </div>
              </div>
            ))}
          <ToastContainer className="whitespace-nowrap" />
        </div>
      </section>
    </div>
  );
};

export default Categories;
