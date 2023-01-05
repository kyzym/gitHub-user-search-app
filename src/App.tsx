import { Container } from "components/Container";
import { Search } from "components/Search";
import { Header } from "components/TheHeader";
import { UserCard } from "components/UserCard";
import { Toaster } from "react-hot-toast";
import { defaultUser } from "mock";
import { GithubError, GithubUser, LocalGithubUser } from "types";
import { useState } from "react";
import { isGithubUser } from "utils/typeguards";
import { extractLocalUser } from "utils/extract-local-user";

const BASE_URL = "https://api.github.com/users/";

function App() {
  const [user, setUser] = useState<LocalGithubUser | null>(defaultUser);

  const fetchUser = async (userName: string) => {
    const url = BASE_URL + userName;

    const res = await fetch(url);
    const user = (await res.json()) as GithubUser | GithubError;

    if (isGithubUser(user)) {
      setUser(extractLocalUser(user));
    } else {
      setUser(null);
    }
  };

  return (
    <>
      <Container>
        <Header />
        <Search hasError={!user} onSubmit={fetchUser} />
        {user && <UserCard {...user} />}
      </Container>
      <div>
        <Toaster />
      </div>
    </>
  );
}

export default App;
