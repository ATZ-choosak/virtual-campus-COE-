import React, { useEffect, useState } from "react";
import {
  addRoom,
  addUser,
  getAllRooms,
  getAllUsers,
  logout,
} from "../api/apiFunctions";
import LoadingIcon from "../Components/LoadingIcon";
import Appbar from "../Components/Appbar";
import Modal from "../Components/Modal";
import Select from "react-select";
import RoomCard from "../Components/RoomCard";
import { Bounce, toast } from "react-toastify";
import clsx from "clsx";
import UserCard from "../Components/UserCard";

function Home() {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [userOptions, setUserOption] = useState();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  //fetch
  const fetch_room = async () => {
    let r = await getAllRooms();

    setRooms(r);

    setLoading(false);
  };

  const fetch_user = async () => {
    let u = await getAllUsers();
    setUsers(u);
    let options = [];
    u.forEach((user) => {
      options.push({
        value: user._id,
        label: user.name,
      });
    });
    setUserOption(options);
  };

  useEffect(() => {
    fetch_room();
    fetch_user();
  }, []);

  const [addRoomModal, setAddRoomModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [userSelection, setUserSelection] = useState([]);

  const addRoomSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    formProps["users"] = userSelection;
    addRoom(formProps)
      .then((res) => {
        if (!res) {
          logout();
        }

        toast.success(`Add room ${formProps.room_name} Completed!!`, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setAddRoomModal(false);
        fetch_room();
      })
      .catch(() => logout());
  };

  const addUserSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    addUser(formData)
      .then((res) => {
        if (!res) {
          logout();
        }

        toast.success(`Add user ${formProps.name} Completed!!`, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setAddUserModal(false);
        fetch_user();
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
    <React.Fragment>
      <Appbar
        addRoomHandle={() => {
          setAddRoomModal(true);
        }}
        addUserHandle={() => {
          setAddUserModal(true);
        }}
      />
      {/* add room */}
      <Modal
        isOpen={addRoomModal}
        onClose={() => {
          setAddRoomModal(false);
        }}
      >
        <div className="p-4 bg-white rounded-lg shadow-md w-80">
          <form onSubmit={addRoomSubmit} className="flex flex-col space-y-5">
            <input
              required
              className="p-2 bg-white outline outline-1 outline-gray-200 rounded-lg outline-none"
              name="room_name"
              placeholder="Room name"
            />
            <input
              required
              className="p-2 bg-white outline outline-1 outline-gray-200 rounded-lg outline-none"
              name="description"
              placeholder="Room description"
            />
            <Select
              options={userOptions}
              isMulti
              onChange={(e) => {
                setUserSelection(e.map((data) => data.value));
              }}
            />
            <button
              className="bg-blue-700 text-white p-2 rounded-lg"
              type="submit"
            >
              Add room
            </button>
          </form>
        </div>
      </Modal>
      {/* add user */}
      <Modal
        isOpen={addUserModal}
        onClose={() => {
          setAddUserModal(false);
        }}
      >
        <div className="p-4 bg-white rounded-lg shadow-md w-80">
          <form onSubmit={addUserSubmit} className="flex flex-col space-y-5">
            <input
              required
              className="p-2 bg-white outline outline-1 outline-gray-200 rounded-lg outline-none"
              name="name"
              placeholder="name"
            />
            <input
              required
              className="p-2 bg-white outline outline-1 outline-gray-200 rounded-lg outline-none"
              name="position"
              placeholder="user position"
            />
            <label>Image profile</label>
            <div className="w-full flex items-center justify-center">
              <img
                className={clsx(
                  "w-40 h-40 object-cover rounded-full",
                  imageSelection ? "block" : "hidden"
                )}
                src={imageSelection}
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
            <button
              className="bg-blue-700 text-white p-2 rounded-lg"
              type="submit"
            >
              Add user
            </button>
          </form>
        </div>
      </Modal>
      <div className="container mx-auto">
        <LoadingIcon Open={loading} />
        {/* Tabs */}
        <div className="flex mt-20 p-4 min-w-96 items-center justify-center">
          <button
          onClick={() => {setTab(0)}}
            className={clsx(
              "w-full duration-[0.2s] ease-in-out p-2",
              tab === 0
                ? "text-blue-800 border-b-2 border-blue-800"
                : "text-black border-b-2"
            )}
          >
            Rooms
          </button>
          <button
          onClick={() => {setTab(1)}}
            className={clsx(
              "w-full duration-[0.2s] ease-in-out p-2",
              tab === 1
                ? "text-blue-800 border-b-2 border-blue-800"
                : "text-black border-b-2"
            )}
          >
            Users
          </button>
        </div>
        <div className="max-w-2xl mx-auto mt-16 gap-2 grid grid-cols-2 sm:grid-cols-3 p-4">
          {tab === 0
            ? rooms
              ? rooms.map((data) => (
                  <RoomCard key={data._id} data={data} refetch={fetch_room} />
                ))
              : null
            : users.map((data) => <UserCard key={data._id} data={data} />)}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
