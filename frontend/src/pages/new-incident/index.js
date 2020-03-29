import React, { useState }from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); 
    const [value, setValue] = useState('');
    const id_ong = localStorage.getItem('id_ong');
    const history = useHistory();
    async function handleNewIncident(e){
        e.preventDefault();
        const data = {title, description, value};
        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: id_ong,
                }
            });
            history.push('/profile');
        }catch(err){
            alert("Erro ao realizar cadastro, verifique os campos e tente novamente.");
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero"/> 
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso em detalhes.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Titulo do Caso" value={title} onChange={e => setTitle(e.target.value)}/>
                    <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}/>
                    <input placeholder="Valor em R$" value={value} onChange={e => setValue(e.target.value)}/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}