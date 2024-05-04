import {  signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Form, Error, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-button";

// const errors = {
//     "auth/email-already-in-use" : "이미 존재하는 이메일입니다."
// }



export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name === "password") {
            setPassword(value)
        } else if (name === "email") {
            setEmail(value)
        }
    };
    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(email === "" || password === "" ) return ;
        try{
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            //redirect to the home page
            navigate("/");
        }catch(e){
            //setError
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        }finally{

        }
        

        console.log(name, email, password);
    };

    return (
        <Wrapper>
            <Title>Login to ⨊</Title>
            <Form onSubmit={onSubmit}>
                <Input 
                    onChange={onChange}
                    name="email" 
                    value={email} 
                    placeholder="Email" 
                    type="email" 
                    required 
                />
                <Input
                    onChange={onChange}
                    name="password"
                    value={password}
                    placeholder="Password"
                    type="password"
                    required
                />
                <Input type="submit" value={isLoading ? "Loading" : "LogIn"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                계정이 없으신가요? <Link to="/create-account">회원가입</Link>
            </Switcher>
            <GithubButton />
        </Wrapper>)
}