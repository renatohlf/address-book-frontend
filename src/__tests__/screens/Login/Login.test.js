import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "../../../screens/Login/index";
import 'mutationobserver-shim';

const server = setupServer(
  rest.get("/login", (req, res, ctx) => {
    return res(
      ctx.json({
        user: {
          id: 3,
          name: "reco",
          email: "reco@reco.com",
        },
        token: "",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Loads login page", async () => {
    render(<Router history={createMemoryHistory()}>
            <Login />
    </Router>);

    await waitFor(() => screen.getByPlaceholderText("Username"));

    expect(screen.getByPlaceholderText("Username")).toHaveTextContent("");
    expect(screen.getByPlaceholderText("Password")).toHaveTextContent("");
});


test("Should show error messages for required fields", async () => {
    const { queryByText } = render(<Router history={createMemoryHistory()}>
            <Login />
    </Router>);

    const userName = screen.getByPlaceholderText('Username');
    const password = screen.getByPlaceholderText('Password');

    fireEvent.change(userName,{ target: { value: 'user@user.com' } })
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => screen.getByDisplayValue('user@user.com'));

    expect(userName).toHaveValue('user@user.com');
    expect(password).toHaveValue('');
    expect(queryByText("Username is required")).toBeNull();
    expect(queryByText("Password is required")).toBeTruthy();
    
    
});

// test('handlers server error', async () => {
// //   server.use(
// //     rest.get('/login', (req, res, ctx) => {
// //       return res(ctx.status(400))
// //     })
// //   )

// //   render(<Login />)

// //   fireEvent.click(screen.getByRole('button'))

// //   await waitFor(() => screen.getByPlaceholderText('Username'))

// //   expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')

// })
