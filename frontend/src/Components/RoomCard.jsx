/* eslint-disable react/prop-types */

import React, { useState } from "react";
import Modal from "./Modal";
import { deleteRoom, logout } from "../api/apiFunctions";
import { Bounce, toast } from "react-toastify";
import RoomEdit from "./RoomEdit";

// eslint-disable-next-line react/prop-types
function RoomCard({ data, refetch }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const deleteRoomHandle = () => {
    deleteRoom(data._id).then((res) => {
      if (res) {
        toast.success(`Delete room ${data.room_name} Completed!!`, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        refetch();
      } else {
        logout();
      }
    });
  };

  return (
    <React.Fragment>
      {/* confirm delete */}
      <Modal isOpen={openDeleteModal}>
        <div className="bg-white p-4 rounded-lg shadow-md min-w-80">
          <p className="text-lg">Are you sure to delete {data.room_name}?</p>
          <div className="w-full flex justify-end items-center space-x-4 mt-10">
            <button
              onClick={deleteRoomHandle}
              className="bg-blue-700 text-sm text-white w-20 p-2 rounded-lg"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setOpenDeleteModal(false);
              }}
              className="bg-red-600 text-sm text-white w-20 p-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* detail */}
      <Modal
        isOpen={openDetailModal}
        onClose={() => {
          setOpenDetailModal(false);
        }}
      >
        <div className="p-10 bg-white rounded-lg max-w-lg min-w-80">
          <p className="font-bold text-lg">{data.room_name}</p>
          <p>{data.description}</p>
          <div className="space-y-2 mt-2">
            {data.users.map((user) => (
              <p className="bg-blue-200 p-2 rounded-lg" key={user._id}>
                {user.name}
              </p>
            ))}
          </div>
        </div>
      </Modal>

      {/* Edit */}
      <Modal
        isOpen={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
        }}
      
      >
        <RoomEdit
          setEditRoomModal={setOpenEditModal}
          data={data}
          fetch_room={() => refetch()}
        />
      </Modal>

      <div className="w-full bg-white shadow-md p-4 rounded-lg space-y-4 h-fit">
        <p className="text-lg font-bold">{data.room_name}</p>
        <p className="text-sm truncate">{data.description}</p>
        <div className="w-full h-[1px] bg-gray-200" />
        <div className="w-full flex items-center justify-end space-x-4">
          <button
            onClick={() => {
              setOpenEditModal(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              setOpenDetailModal(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              setOpenDeleteModal(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 stroke-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RoomCard;
