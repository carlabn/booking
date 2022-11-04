
import AuthContext from '../store/auth-context';
import { useContext } from 'react'; 
import { useHistory } from 'react-router-dom';

const Logout = () => {
  
    const ctx = useContext(AuthContext);
    const history = useHistory();

    ctx.onLogout();
    history.push("/login");

}

export default Logout;