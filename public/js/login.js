const loginForm = async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('#login');
    const password = document.querySelector('#password-login');    
    
    if ( username.value && password.value) {
        
        
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username: username.value, password: password.value}),
            headers: {'Content-Type': 'application/json' }
        })
        
        if (response && response.ok) {
            
            document.location.replace('/');
        } else {
            alert('Failed attempt to log in.');
        }
    } else {
        alert('Failed to login, please fill out all the fields')
    }
};

const signupForm = async (event) => {
    event.preventDefault();
    
    
    const username = document.querySelector('#username-signup');
    const password = document.querySelector('#password-signup');
    
    let response = null;
    
    if (username.value && password.value) {
        
        response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username: username.value, password: password.value }),
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        alert('Failed to signup, incorrect username or password entered');
    }
    
    if (response && response.ok) { 
        document.location.replace('/');
    } else {
        alert('Failed to sign up.');
    } 
};

document
.querySelector('.login-form')
.addEventListener('submit', loginForm);

document
.querySelector('.signup-form')
.addEventListener('submit', signupForm);