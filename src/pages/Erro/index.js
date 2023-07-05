import { Link } from 'react-router-dom';
import './styles.css';

function Erro() {
    return(
        <div className="not-found">
            <h2>404</h2>
            <p>Página não encontrada :(</p>

            <Link to='/'>Todos os filmes</Link>
        </div>
    )
}

export default Erro;