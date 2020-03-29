import React, { useState }from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg'
import herosImg from '../../assets/heroes.png'

export default function Login(){
    const [id_ong, setId_ong] = useState('');
    const history = useHistory(); 

    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('sessions', {id_ong}); 
            localStorage.setItem('id_ong', id_ong);
            localStorage.setItem('ong_name', response.data.name);
            history.push('/profile');
        }catch(err){
            alert("Login inválido.");
        }
    }
    
    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be the hero"/> 
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input placeholder="Sua ID" value={id_ong} onChange={e => setId_ong(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={herosImg} alt="Heros"/> 
        </div>
    );
}