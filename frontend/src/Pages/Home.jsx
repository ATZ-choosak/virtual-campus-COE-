import { Rooms, Users } from "../Mockup/database";

function Home() {
  const getUser = (id) => {
    let res = Users.find((e) => e.id === id);
    return res;
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-2xl mx-auto space-y-2 gap-2 grid grid-cols-3 p-2">
        {Rooms.map((data, i) => (
          <div className="p-2 shadow-md rounded-md space-y-4" key={i}>
            <p>{data.room_name}</p>
            {data.users.map((user) => (
              <div className="flex items-center space-x-2" key={user}>
                <img className="w-10 rounded-full h-10 object-cover" src={getUser(user).image} alt="profile" />
                <p className="text-xs">{getUser(user).name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
