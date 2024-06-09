import {
  ChangeEvent,
  KeyboardEvent as KeyboardEventInput,
  useEffect,
  useRef,
  useState,
} from "react";
import "../App.css";
import { useDebounce } from "../hooks/useDebounce";
import { fetchUserData } from "../services/service";
import { IUser, IUserSelected } from "../models/model";
import UserDetails from "./UserDetals";
import UserPill from "./UserPill";

const AppMultiSelect = () => {
  const [input, setInput] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [suggestions, setSuggestions] = useState<IUserSelected[]>([]);
  const [navigatedSuggestion, setNavigatedSuggestion] = useState<number>(-1);
  const [selectedUsersSet, setSelectedUsersSet] = useState(new Set<number>());
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedInput = useDebounce(input);

  const navigatedSuggestionStyle = navigatedSuggestion > -1 ? "lightGray" : "";
  const focusTheInputField = () => inputRef.current?.focus();

  const handleUserDetailClick = (user: IUser) => {
    setSelectedUsers((prev) => [...prev, { ...user }]);
    setSelectedUsersSet(new Set([...selectedUsersSet, user.id]));
    setSuggestions([]);
    setInput("");
    focusTheInputField();
  };
  const handlePillClick = (id: number) => {
    const updatedSelectedUsers = selectedUsers.filter((user) => user.id !== id);
    selectedUsersSet.delete(id);
    setSelectedUsersSet(new Set([...selectedUsersSet]));
    setSelectedUsers(updatedSelectedUsers);
    setInput("");
    setSuggestions([]);
    focusTheInputField();
  };
  const handleKeyDown = (event: KeyboardEventInput<HTMLInputElement>) => {
    if (
      event.key === "Backspace" &&
      inputRef.current?.value === "" &&
      selectedUsers?.length > 0
    ) {
      handlePillClick(selectedUsers[selectedUsers.length - 1]?.id);
    }
  };

  const handleNavigateSuggestions = (event: KeyboardEvent) => {
    console.log({ key: event?.key });
    if (
      suggestions?.length === 0 ||
      (event?.key !== "ArrowDown" &&
        event?.key !== "ArrowUp" &&
        event?.key !== "Enter") ||
      (event?.key === "Enter" && navigatedSuggestion === -1)
    ) {
      return;
    }
    if (event?.key === "ArrowDown") {
      setNavigatedSuggestion((prev) =>
        prev < suggestions?.length - 1 ? prev + 1 : 0
      );
    } else if (event?.key === "ArrowUp")
      setNavigatedSuggestion((prev) =>
        prev > 0 ? prev - 1 : suggestions?.length - 1
      );
    else if (event?.key === "Enter") {
      console.log("in enter key fun");
      handleUserDetailClick(suggestions[navigatedSuggestion]);
      setNavigatedSuggestion(-1);
    }
  };
  useEffect(() => {
    if (debouncedInput.trim() === "") return;
    //other wise fetch the data
    const getUserData = async (userName: string) => {
      const data = await fetchUserData(userName);
      const updatedSuggestions = data.map((user) => ({
        ...user,
      }));
      setSuggestions(updatedSuggestions);
    };
    getUserData(debouncedInput);
  }, [debouncedInput]);

  useEffect(() => {
    // Add the event listener
    const listener = (event: KeyboardEvent) => handleNavigateSuggestions(event);
    window.addEventListener("keydown", listener);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [suggestions]);
  return (
    <>
      <div className="search_container" onClick={() => focusTheInputField()}>
        <div className="search_input_container">
          {/*pills */}
          {selectedUsers?.map((user) => (
            <UserPill key={user.id} {...user} onClick={handlePillClick} />
          ))}
          <input
            type="text"
            className="search_input"
            value={input}
            ref={inputRef}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setInput(event.target.value)
            }
            onKeyDown={handleKeyDown}
          />
        </div>
        <ul className="suggestions-list">
          {suggestions
            ?.filter((user) => !selectedUsersSet.has(user.id))
            .map((user, index) => (
              <UserDetails
                {...user}
                key={user.id}
                onClick={handleUserDetailClick}
                index={index}
                navigatedIndex={navigatedSuggestion}
              />
            ))}
        </ul>
      </div>
    </>
  );
};

export default AppMultiSelect;
