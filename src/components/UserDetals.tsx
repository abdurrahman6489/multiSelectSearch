import { IUser } from "../models/model";
import "../App.css";
interface UserDetailsProps extends IUser {
  onClick: (user: IUser) => void;
  navigatedIndex: number;
  index: number;
}

const UserDetails = ({
  age,
  firstName,
  lastName,
  email,
  gender,
  id,
  image,
  onClick,
  maidenName,
  navigatedIndex,
  index,
}: UserDetailsProps) => {
  const userName = `${firstName} ${lastName}`;
  const navigatedSuggestionStyle =
    navigatedIndex === index ? { backgroundColor: "lightGray" } : {};
  return (
    <div
      className="user_detail_container"
      style={{ ...navigatedSuggestionStyle }}
      onClick={() =>
        onClick({
          age,
          email,
          firstName,
          gender,
          id,
          image,
          lastName,
          maidenName,
        })
      }
    >
      <img
        src={image}
        alt={userName}
        height="30px"
        width={"30px"}
        className="user_image"
      />
      <div className="user_details">
        <p>{userName}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default UserDetails;
