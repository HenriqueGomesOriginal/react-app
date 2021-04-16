import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImage from '../../assets/icon.png'
import padlock from '../../assets/aspnet-featured2.png'
import loading from '../../assets/loading.gif'

export default function Login() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    var load_img = {loading}
    //load_img.style = "display: none";

    async function login(e) {
        e.preventDefault();
        var img  = document.createElement("img");
        var sect = document.getElementById("form");

        img.id = "loading";
        img.src = load_img.loading;
        img.style = "width: 10%;height: 20%;margin-left: 120px;margin-top: -180px;margin-right: auto;position: absolute;";
        sect.appendChild(img);

        //load_img.style = "display: true";
        console.log({loading});

        const data = {
            userName,
            password,
        };

        try {
            const response = await api.post('api/auth/v1/signin', data);

            localStorage.setItem('userName', userName);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            //load_img.style = "display: none";

            history.push('/books');
        } catch (error) {
            img.remove();
            alert('Login failed! Try again!');
        }

    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImage} alt="Erudio Logo"/>
                <form id="form" onSubmit={login}>
                    <h1>Access your Account</h1>
                    <input
                        placeholder="Username"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Login</button>
                </form>
            </section>
            <img src={padlock} alt="Login"/>
        </div>
    )
}