import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
    margin-top: 20px;
    background-color: white;
    font-weight: 500;
    width:100%;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display:flex;
    gap:5px;
    align-items:center;
    justify-content:center;
    color: black;
    cursor:pointer;
`;

const Logo = styled.img`
    height:25px;
`;

export default function GithubButton(){
    const navigate = useNavigate();
    const onClick = async () => {
        try{
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");
        }catch (error){
            console.log(error);
        }
    };
    return (
        <Button onClick={onClick}>
            <Logo src="/github-mark.svg" />
            Github로 계속하기
        </Button>
    )
}