import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import Blog from "./Blog";
import { UserContext } from "../../UserContext";
import { GET_BLOG } from "../../graphql/queries";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";

const mocks = [
    {
      request: {
        query: GET_BLOG,
        variables: {
          getBlogId: "1",
        },
      },
      result: {
        data: {
          getBlog: {
            id: "1",
            name: "blog",
            updated_at: "2023-07-05T19:21:44.425Z", // included updated_at at the getBlog level
            user: {
              id: "1",
              name: "testeur",
              email: "test@mail.com",
              pseudo: "testuser",
              updated_at: "2023-07-05T19:21:44.425Z"
            },
            posts: [],
            description: "Test description",
            picture: {
              id: "1",
              name: "picture",
              link: "http://test.com/test.jpg",
              updated_at: "2023-07-05T19:21:44.425Z",
              created_at: "2023-07-05T19:21:44.425Z"
            }
          }
        }
      }
    }
  ];
  
test("renders Blog", async () => {
    render(
      <MemoryRouter initialEntries={["/blogs/1"]}>
        <UserContext.Provider value={null}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Routes>
              <Route path="/blogs/:blogId" element={<Blog />} />
            </Routes>
          </MockedProvider>
        </UserContext.Provider>
      </MemoryRouter>
    );

  expect(screen.getByText("Chargement...")).toBeInTheDocument();

  await waitFor(() => {
    const blogWelcomeText = screen.getByText("Bienvenue sur le blog de testuser");
    expect(blogWelcomeText).toBeInTheDocument();
  });

  await waitFor(() => {
    const blogDescriptionText = screen.getByText("Description : Test description");
    expect(blogDescriptionText).toBeInTheDocument();
  });

  await waitFor(() => {
    const loadingElement = screen.queryByText("Chargement...");
    expect(loadingElement).not.toBeInTheDocument();
  });
});