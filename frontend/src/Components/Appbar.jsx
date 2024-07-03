import clsx from "clsx";
import { useState } from "react";
import { logout } from "../api/apiFunctions";

// eslint-disable-next-line react/prop-types
function Appbar({ addRoomHandle, addUserHandle }) {
  const [openMenu, setOpenMenu] = useState(false);

  const mobileAddRoomHandle = () => {
    setOpenMenu(false);
    addRoomHandle();
  };

  const mobileAddUserHandle = () => {
    setOpenMenu(false);
    addUserHandle();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-blue-700 flex items-center p-4">
      <div className="hidden sm:flex space-x-4 w-full items-center h-full justify-end">
        <button
          onClick={addRoomHandle}
          className="flex items-center space-x-2 hover:bg-white p-2 duration-[0.2s] ease-in-out rounded-lg hover:bg-opacity-15"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 fill-white"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm font-bold text-white">Add room</p>
        </button>
        <button
          onClick={addUserHandle}
          className="flex items-center space-x-2 hover:bg-white p-2 duration-[0.2s] ease-in-out rounded-lg hover:bg-opacity-15"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 fill-white"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm font-bold text-white">Add user</p>
        </button>
      </div>
      <div className="flex sm:hidden w-full h-full items-center justify-start">
        <button
          onClick={() => {
            setOpenMenu(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 fill-white"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* SideMenu */}
      <div
        className={clsx(
          "fixed top-0 left-0  z-20 w-full h-full duration-[0.2s] ease-in-out",
          openMenu
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div
          className={clsx(
            "absolute z-10 w-60 h-full bg-white duration-[0.2s] ease-in-out p-4 flex flex-col justify-between",
            openMenu ? "left-0" : "-left-full"
          )}
        >
          {/* menu */}
          <div className="space-y-2">
            <button
              onClick={mobileAddRoomHandle}
              className="w-full rounded-lg flex space-x-2 p-4 items-center hover:bg-gray-100 duration-[0.2s] ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              <p className="text-sm">Add room</p>
            </button>

            <button
              onClick={mobileAddUserHandle}
              className="w-full rounded-lg flex space-x-2 p-4 items-center hover:bg-gray-100 duration-[0.2s] ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-sm">Add user</p>
            </button>
          </div>

          {/* logout */}
          <button
            onClick={logout}
            className="w-full rounded-lg flex space-x-2 p-4 items-center hover:bg-gray-100 duration-[0.2s] ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 fill-red-600"
            >
              <path
                fillRule="evenodd"
                d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>

            <p className="text-sm">Logout</p>
          </button>
        </div>

        <div
          onClick={() => {
            setOpenMenu(false);
          }}
          className="bg-black w-full h-full absolute left-0 top-0 bg-opacity-50 backdrop-blur-sm duration-[0.2s] ease-in-out"
        />
      </div>
    </div>
  );
}

export default Appbar;
