import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './styles.css';
import { toast } from "react-toastify";

function Favoritos() {

    const [ filmes, setFilmes ] = useState([]);
    
    useEffect(()=>{

        const minhaLista = localStorage.getItem('@primeFlix');
        setFilmes(JSON.parse(minhaLista) || []);

    }, []);

    function excluirFilme(id) {
        let filtrarFilmes = filmes.filter( (filme) => {
            return (filme.id !== id);
        } )

        setFilmes(filtrarFilmes);
        localStorage.setItem('@primeFlix', JSON.stringify(filtrarFilmes));
        toast.success('Filme removido da sua lista..')
    }

    return(
        <div className="meus-filmes">
            <h2>Meus filmes favoritos</h2>

            {filmes.length === 0 && <span>Você ainda não adicionou nenhum filme à sua lista :(</span>}

            <ul>
                {filmes.map((filme)=>{
                    return(
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div className="area-btns">
                                <Link to={`/filme/${filme.id}`} >Ver detalhes</Link>
                                <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;