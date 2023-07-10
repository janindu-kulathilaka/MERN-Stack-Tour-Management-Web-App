import { useContext, useState } from "react";
import { UserContext } from "../components/UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccooutNav from "../components/AccountNav";

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");

    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccooutNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto ">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-xs mt-2">
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
