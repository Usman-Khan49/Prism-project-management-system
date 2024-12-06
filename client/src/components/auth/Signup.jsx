import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';
import '../../styles/auth.css';

function Signup({ theme }) {
  const navigate = useNavigate();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const logoRef = useRef(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsExpanded(true);
    };

    const handleMouseUp = () => {
      setIsExpanded(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Additional logo hover effect
    const logoElement = logoRef.current;
    
    const handleLogoHover = () => {
      logoElement.style.transform = 'scale(1.1) rotate(5deg)';
    };

    const handleLogoLeave = () => {
      logoElement.style.transform = 'scale(1) rotate(0deg)';
    };

    logoElement.addEventListener('mouseenter', handleLogoHover);
    logoElement.addEventListener('mouseleave', handleLogoLeave);

    // Set active  className after mount
    setIsActive(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      logoElement.removeEventListener('mouseenter', handleLogoHover);
      logoElement.removeEventListener('mouseleave', handleLogoLeave);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const data = await authService.register({
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during sign up');
    }
  };

  return (
    <>
      <div 
        className={`custom-cursor ${isExpanded ? 'expanded' : ''}`} 
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`
        }}
      ></div>

      <div className={`container ${isActive ? 'active' : ''} ${theme}`}>
        <img 
          ref={logoRef}
          className='logo' 
          src='https://freesvg.org/img/1455418577.png' 
          alt='Vite Logo' 
        />
        <p>Sign up to PRISM</p>

        <form onSubmit={handleSignup}>
          <div className='email'>
            <p>Email</p>
            <input 
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Email'
              required 
            />
          </div>
          <div className='password'>
            <p>Password</p>
            <input 
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Password'
              required 
            />
          </div>
          <div className='password'>
            <p>Confirm Password</p>
            <input 
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder='Confirm Password'
              required 
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className='signin'>Sign Up</button>
        </form>

        <div className='or-container'>
          <span className='or-text'>OR</span>
        </div>

        <button className='google-button'>
          <img 
            className='google-logo' 
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' 
            alt='Google Logo' 
          />
          <span>Continue with Google</span>
        </button>

        <div className='signuplink'>
          <p>Already have an account?</p>
          <Link to='/'>Sign in</Link>
        </div>
      </div>
    </>
  );
}

export default Signup;