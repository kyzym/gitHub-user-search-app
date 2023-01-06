import { LocalGithubUser } from "types";
import styles from "./UserTitle.module.scss";

interface UserTitleProps
  extends Pick<LocalGithubUser, "name" | "login" | "created"> {}

const localDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const UserTitle = ({ created, login, name }: UserTitleProps) => {
  const joinedDate = localDate.format(new Date(created));
  const gitHibUrlFirstPart = "https://github.com/";

  return (
    <div className={styles.userTitle}>
      <h2>{name}</h2>
      <a href={gitHibUrlFirstPart + login} target="_blank" rel="noreferrer">
        <h3>{login}</h3>
      </a>
      <span>{joinedDate}</span>
    </div>
  );
};
