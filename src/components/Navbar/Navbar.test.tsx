import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from "../../UserContext";
// le wrapper BrowserRouter évite les erreurs de contexte causées par les Link présents dans la Navbar

describe("Navbar", () => {

  const onTokenChange = jest.fn()

  it('shows the login and signin buttons when we are disconnected', () => {
    render(<Navbar onTokenChange={onTokenChange} />, { wrapper: BrowserRouter })
    const signUpButton = screen.getByText(/Inscription/i)
    const loginButton = screen.getByText(/Connexion/i)
    expect(signUpButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('shows the logout button when a user in logged in', () => {
    const user = {
      id: 1,
      email: "jane@mail.fr",
      password: "supersecret",
      role: "USER"
    }
    render(
      <UserContext.Provider value={user}>
        <Navbar onTokenChange={onTokenChange} />
      </UserContext.Provider>, { wrapper: BrowserRouter }
    )
    const logoutButton = screen.getByText(/Déconnexion/i);
    expect(logoutButton).toBeInTheDocument();
  })
})
