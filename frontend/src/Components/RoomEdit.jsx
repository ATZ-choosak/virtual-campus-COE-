/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Select from "react-select";
import { editRoom, getAllUsers, logout } from "../api/apiFunctions";
import { Bounce, toast } from "react-toastify";

function RoomEdit({ data, setEditRoomModal, fetch_room }) {
  const [userOptions, setUserOption] = useState();
  const [userSelection, setUserSelection] = useState(data.users);
  const [userOptionBefore, setUserOptionBefore] = useState();

  const fetch_user = async () => {
    let u = await getAllUsers();
    let options = [];
    let before = [];
    u.forEach((user) => {
      options.push({
        value: user._id,
        label: user.name,
      });

      for (let i = 0; i < userSelection.length; i++) {
        if (userSelection[i]._id === user._id) {
          before.push({
            value: user._id,
            label: user.name,
          });
        }
      }
    });

    setUserOptionBefore(before);

    setUserOption(options);
  };

  useEffect(() => {
    fetch_user();
  }, []);

  const changeUser = (e) => {
    setUserOptionBefore(e);
    setUserSelection(e.map((data) => data.value));
  };

  const editRoomSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    formProps["users"] = userSelection;

    console.log(formProps);
    editRoom(data._id, formProps)
      .then((res) => {
        if (!res) {
          logout();
        }

        toast.success(`Edit room ${formProps.room_name} Completed!!`, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setEditRoomModal(false);
        fetch_room();
      })
      .catch(() => logout());
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-80">
      <form onSubmit={editRoomSubmit} className="flex flex-col space-y-5">
        <input
          defaultValue={data.room_name}
          required
          className="p-2 bg-white outline outline-1 outline-gray-200 rounded-lg outline-none"
          name="room_name"
          placeholder="Room name"
        />
        <textarea
          required
          defaultValue={data.description}
          className="p-2 bg-white outline outline-1 outline-gray-200 rounded-lg outline-none"
          name="description"
          placeholder="Room description"
        />
        <Select
          options={userOptions}
          isMulti
          value={userOptionBefore}
          onChange={changeUser}
        />
        <button className="bg-blue-700 text-white p-2 rounded-lg" type="submit">
          Save room
        </button>
      </form>
    </div>
  );
}

export default RoomEdit;
