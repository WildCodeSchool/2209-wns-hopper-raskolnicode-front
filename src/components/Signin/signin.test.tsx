import { render, screen } from "@testing-library/react"
import Signin from "./Signup";
import { MockedProvider } from "@apollo/client/testing";
import { createUser } from "../../graphql/createUser";

const mocks = [
    {
        request: {
          query: createUser,
        },
    }
]

describe('Signin', ()=>{
    it('renders a button', ()=>{
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Signin/>
            </MockedProvider>
        )
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})

