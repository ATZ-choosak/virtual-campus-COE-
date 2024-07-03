/* eslint-disable react/prop-types */
import imagePath from "../module/imagePath";

function UserCard({ data }) {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md">
      <img className="w-full h-28 object-cover" src={imagePath(data.image)} />
      <div className="p-4">
        <p className="text-lg font-bold">{data.name}</p>
        <p>{data.position}</p>
      </div>
    </div>
  );
}

export default UserCard;
