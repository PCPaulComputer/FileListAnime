/**
 * Header component
 * @author Paul M
 */
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
                <Link className="navbar-brand text-light text-center mx-auto" to="/"><p className="lead font-weight-bold">Pok&eacute;Files</p></Link>
            </nav>
        </header>   
    );
}

export default Header;