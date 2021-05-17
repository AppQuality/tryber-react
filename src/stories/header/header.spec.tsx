import { render, screen } from "@testing-library/react";
import { Header, User } from "./Header";
import { LoggedOutHeader } from "./Header.stories";
import "../../i18n";

const testUser: User = {
  id: 1234,
  username: "testuser0001",
  name: "test",
  surname: "user",
  email: "testuser@email.it",
  image:
    "https://secure.gravatar.com/avatar/45396ba87c1cf9397abba7f834b1d31c?s=96&d=http%3A%2F%2Fcrowd.app-quality.com%2Fwp-content%2Fthemes%2Fcrowdappquality%2Fimg%2FAQavatar.png&r=g",
};

describe("logged out site-header", () => {
  it("should render with the correct text", () => {
    render(<LoggedOutHeader {...LoggedOutHeader.args} />);
    expect(screen.getByText("login")).toBeInTheDocument();
  });
});

describe("logged in site-header", () => {
  it("should render with the correct user informations", () => {
    render(<Header user={testUser} />);
    expect(
      screen.getByText(`${testUser.name} ${testUser.surname}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`(T${testUser.id})`)).toBeInTheDocument();
  });
});
