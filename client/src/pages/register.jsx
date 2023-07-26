import React, { useState } from 'react'; 

function RegisterPage() {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://192.168.0.101:1337/postUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pseudo, email, password })
          });
          
          const data = await response.json();
          if (data.success) {
            alert('Inscription réussie !');
          } else {
            alert('Erreur lors de l\'inscription');
          }
        } catch (error) {
          console.error('Erreur lors de l\'envoi des données :', error);
          alert('Erreur lors de l\'envoi des données');
        }
    };


    return ( 
        
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form  onSubmit={handleSubmit} className="login">
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="text" value={pseudo}  onChange={(e) => setPseudo(e.target.value)} required className="login__input" placeholder="Pseudo"/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="text" value={email}  onChange={(e) => setEmail(e.target.value)} required className="login__input" placeholder="Email"/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="password"  value={password}  onChange={(e) => setPassword(e.target.value)} required className="login__input" placeholder="Password"/>
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

export default RegisterPage;