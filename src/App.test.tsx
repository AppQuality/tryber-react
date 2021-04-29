import * as React from 'react'
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import API from './utils/api'
import {mocked} from "ts-jest/utils";

import App from "./App";

jest.mock('./utils/api')

const mockedApi = mocked(API, true);

test("try login", async () => {
    // render(<App/>);
    //
    // const credentials = {
    //     username: "username",
    //     password: "password"
    // }
    // const data = [
    //     {
    //         name: "pippo",
    //         id: 1
    //     }
    // ]
    // const authdata = {token: "asd"}
    //
    // mockedApi.login.mockResolvedValueOnce(authdata);
    // mockedApi.campaigns.mockImplementationOnce((token) => {
    //     if (token === authdata.token) {
    //         return Promise.resolve(data)
    //     } else {
    //         return Promise.resolve({"err": "unauthorized"})
    //     }
    // })
    //
    // userEvent.type(screen.getByTestId('user'), credentials.username)
    // userEvent.type(screen.getByTestId('pass'), credentials.password)
    //
    // userEvent.click(screen.getByTestId('loginbtn'))
    //
    //
    // expect(API.login).toHaveBeenCalledWith(credentials);
    //
    // expect(API.login).toHaveBeenCalledTimes(1);
    //
    //
    // await waitFor(() => screen.getByTestId('projectlist'))
    //
    // expect(API.campaigns).toHaveBeenCalledTimes(1)


    //expect(screen.getByTestId('projectlist', {name: data[0].name})).toBeInTheDocument()


});
