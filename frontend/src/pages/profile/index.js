import React, { useState, useEffect } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ong_name = localStorage.getItem('ong_name');
    const id_ong = localStorage.getItem('id_ong');  
    const history = useHistory();
    useEffect(()=>{
        api.get('/profile', {
            headers:{
                Authorization: id_ong,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    }, [id_ong]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: id_ong,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert("Erro ao deletar caso, tente novamente.");
        }
    }

    function handleLogout(){
        try{
            localStorage.clear();
            history.push('/');
        }catch (err){
            alert("Erro ao realizar logout, verifique os campos e tente novamente.");
        }
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero"/> 
                <span>Bem vindo, {ong_name} </span>  
                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)} </p>
                        <button type="button" onClick={()=>handleDeleteIncident(incident.id)}> 
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}