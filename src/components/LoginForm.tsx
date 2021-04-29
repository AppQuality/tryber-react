import React, {useState} from "react";
import PropTypes from "prop-types";
import API from '../utils/api'
import {Button} from '../stories/button/Button';
import {Input} from '../stories/form/Form';


// @ts-ignore
export default function LoginForm({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
// @ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await API.login({
            username,
            password,
        })
        if (res.error) {
            debugger
            setError(res.error);
        }
        if (res.token) {
            setToken(res.token);
        }
        return;
    };
    return (
        <form onSubmit={handleSubmit}>
            {error ? <p>{error}</p> : ""}


            <Input type="text" name={'username'} onChange={e => {
                // @ts-ignore
                setUserName(e.target.value)
            }
            } data-testid="user"></Input>

            <Input name={'password'} type="password" onChange={e => {
                // @ts-ignore
                setPassword(e.target.value)
            }} data-testid="pass"></Input>

            <div>
                <Button htmlType={"submit"} size={'sm'} data-testid="loginbtn">Submit</Button>
            </div>
        </form>
    );
}

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired,
};
