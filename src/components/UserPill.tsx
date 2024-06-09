import { IUser } from "../models/model";
import "../App.css";
import { RxCross2 } from "react-icons/rx";
interface UserPillProps extends IUser {
  onClick: (id: number) => void;
}

const UserPill = ({ firstName, lastName, id, onClick }: UserPillProps) => {
  const userName = `${firstName} ${lastName}`;
  const Icon = RxCross2;
  return (
    <div className="pill_container">
      {userName}
      <div onClick={() => onClick(id)}>
        <Icon />
      </div>
    </div>
  );
};

export default UserPill;
