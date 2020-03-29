import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';


export default function Register(){
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    async function handleRegister(e){
        e.preventDefault();
        const data = {name, email, whatsapp, city, uf};
        try{
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id_ong}`);
            history.push('/');
        } catch(err ){
            alert("Erro ao realizar cadastro, verifique os campos e tente novamente.");
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero"/> 
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro e ajude a todos</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro 
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input value={name} placeholder="Nome da ONG"  onChange={e => setName(e.target.value)}/>
                    <input value={email} type="email" placeholder="Email" onChange={e =>setEmail(e.target.value)}/>
                    <input value={whatsapp} placeholder="WhatsApp" onChange={e =>setWhatsApp(e.target.value)}/>
                    <div className="input group">
                        <input value={city} placeholder="City" onChange={e =>setCity(e.target.value)}/>
                        <input value={uf} placeholder="UF" style={{width: 80}} onChange={e =>setUf(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}