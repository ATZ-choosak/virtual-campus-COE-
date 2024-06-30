import { useEffect, useState } from "react";
import { login } from "./api/apiFunctions";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function App() {
  const [year, setYear] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date();
    setYear(date.getFullYear());
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    login({ username: formProps.username, password: formProps.password })
      .then((res) => {
        if (res.access_token) {
          navigate("Home");
        } else {
          toast.error(res.message, {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center w-96 mx-auto space-y-5 text-center mt-28 p-4">
        <img className="w-40 h-40 object-cover" src="PSU-Logo.png" alt="logo" />
        <p className="text-lg font-bold">Login to Virtual Campus Admin</p>
        <form onSubmit={submit} className="flex flex-col w-full space-y-5">
          <input
            className="bg-gray-100 p-4 rounded-lg outline-none"
            type="text"
            placeholder="Username"
            name="username"
          />
          <input
            className="bg-gray-100 p-4 rounded-lg outline-none"
            type="password"
            placeholder="Password"
            name="password"
          />
          <button
            className="text-white bg-blue-700 outline-none p-4 rounded-lg"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <div className="fixed left-0 bottom-4 text-center w-full p-4">
        <p className="text-xs">
          © {year} คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์
          มหาวิทยาลัยสงขลานครินทร์
        </p>
      </div>
    </div>
  );
}

export default App;
