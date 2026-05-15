import UserProfileCard from "./components/UserProfileCard";
import "./App.css";

function App() {
  const userData = {
    profileImage:
      "https://static01.nyt.com/images/2022/11/15/realestate/16garden01/oakImage-1668536396627-videoSixteenByNine3000.jpg",
    name: "Thejaswi",
    role: "Associate Software Engineer",
    bio: "I’m an Associate Software Engineer who’s always learning and adapting",
  };
  return (
    <div className="app">
      <UserProfileCard user={userData} />
    </div>
  );
}

export default App;