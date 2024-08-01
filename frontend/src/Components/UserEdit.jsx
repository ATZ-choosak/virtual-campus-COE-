/* eslint-disable react/prop-types */
import clsx from "clsx";
import { Bounce, toast } from "react-toastify";
import { editUser, logout } from "../api/apiFunctions";
import imagePath from "../module/imagePath";
import { useState } from "react";

function UserEdit({ data, refetch, setEditUserModal }) {
  const editUserSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    editUser(data._id, formData)
      .then((res) => {
        if (!res) {
          logout();
        }

        toast.success(`Edit user ${formProps.name} Completed!!`, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setEditUserModal(false);
        refetch();
      })
      .catch(() => logout());
  };

  const [imageSelection, setImageSelection] = useState();

  const addImageHandle = (e) => {
    setImageSelection(
      e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-80">
      <form onSubmit={editUserSubmit} className="flex flex-col space-y-5">
        <input
          defaultValue={data.name}
          required
          className="p-2 bg-white outline outline-1 outline-gray-200 rounded-lg outline-none"
          name="name"
          placeholder="name"
          type="text"
        />
        <input
          defaultValue={data.position}
          required
          className="p-2 bg-white outline outline-1 outline-gray-200 rounded-lg outline-none"
          name="position"
          placeholder="user position"
          type="text"
        />
        <input
          defaultValue={data.email}
          required
          className="p-2 bg-white outline outline-1 outline-gray-200 rounded-lg outline-none"
          name="email"
          placeholder="email"
          type="email"
        />
        <label>Image profile</label>
        <div className="w-full flex items-center justify-center">
          <img
            className={clsx(
              "w-40 h-40 object-cover rounded-full",
              imageSelection || data.image ? "block" : "hidden"
            )}
            src={imageSelection ? imageSelection : imagePath(data.image)}
            label="profile"
          />
        </div>
        <input
          onChange={addImageHandle}
          accept="image/*"
          type="file"
          name="image"
          placeholder="image profile"
        />
        <button className="bg-blue-700 text-white p-2 rounded-lg" type="submit">
          Save user
        </button>
      </form>
    </div>
  );
}

export default UserEdit;
