import { useState } from "react";
function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://192.168.0.101:1337/getParams/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
          });
  
        const data = await response.json();
        const pswdverf = data.data[0].password
        if (data.success) {
        //   alert('Connexion réussie !');
          
          if (pswdverf == password){
            alert('gsdufusdgfjh')
          }else{
            alert('mot de passe incorrect')
          }
        } else {
          alert('Identifiants invalides. Veuillez réessayer.');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Erreur lors de la connexion');
      }
    };
    return ( 
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form onSubmit={handleSubmit} className="login">
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="text"  value={email}  onChange={(e) => setEmail(e.target.value)} required className="login__input" placeholder="User name / Email"/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="password"value={password}  onChange={(e) => setPassword(e.target.value)} required  className="login__input" placeholder="Password"/>
                        </div>
                        <button type="submit" className="button login__submit">
                            <span className="button__text">Log In Now</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>				
                    </form>
                    <div className="social-login">
                        <h3>log in via</h3>
                        <div className="social-icons">
                            <a href="#" className="social-login__icon fab fa-instagram"></a>
                            <a href="#" className="social-login__icon fab fa-facebook"></a>
                            <a href="#" className="social-login__icon fab fa-twitter"></a>
                        </div>
                    </div>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>		
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>		
            </div>
        </div>
     );
}

export default LoginPage;