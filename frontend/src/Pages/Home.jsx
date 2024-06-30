import { useEffect, useState } from "react";
import { getAllRooms } from "../api/apiFunctions";
import LoadingIcon from "../Components/LoadingIcon";
import config from "../config";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_room = async () => {
      let rooms = await getAllRooms();

      setData(rooms);

      setLoading(false);
    };

    fetch_room();
    
  }, []);

  return (
    <div className="container mx-auto">
      <LoadingIcon Open={loading} />
      <div className="max-w-2xl mx-auto space-y-2 gap-2 grid grid-cols-3 p-2">
        {data
          ? data.map((data) => (
              <div
                className="p-2 shadow-md rounded-md space-y-4"
                key={data._id}
              >
                <p>{data.room_name}</p>
                {data.users.map((user) => (
                  <div className="flex items-center space-x-2" key={user._id}>
                    <img
                      className="w-10 rounded-full h-10 object-cover"
                      src={`${config.apiUrl}/${user.image}`}
                      alt="profile"
                    />
                    <p className="text-xs">{user.name}</p>
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Home;
