import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import { toast } from 'react-toastify';

function Filme() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [ filme, setFilme] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{

        async function loadFilme() {

            await api.get(`/movie/${id}`, {
                params:{
                    api_key: 'd77efc32b35cf97946f4ad2611f9dee0',
                    language: 'pt-BR'
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch((erro)=>{
                console.log("Deu erro: "+ erro);
                navigate('/', { replace: true });
                return
            })

        }
        loadFilme();
    }, [ navigate, id ])

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeFlix');
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const temFilme = filmesSalvos.some( (filmeSalvando) => filmeSalvando.id === filme.id);

        if(temFilme) {
            toast.warn('Esse filme já está na sua lista :)');
            return
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeFlix', JSON.stringify(filmesSalvos));
        toast.success("Filme salvo na lista!");
    }

    if(loading) {
        return(
            <div>
                <h1>Carregando detalhes..</h1>
            </div>
        )
    }
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average.toFixed(2)} / 10</strong>

            <div className='area-btns'>
                <button className='btn' onClick={salvarFilme}>Add favoritos</button>
                <button className='btn'>
                    <a target='blank' rel='noreferrer' href={`https://youtube.com/results?search_query=${filme.title}+trailer+legendado`} >Assista ao trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;