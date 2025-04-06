document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageDiv = document.getElementById('message');
    
    if (!name || !email || !password) {
        messageDiv.textContent = 'All fields are required.';
        messageDiv.style.color = 'red';
        return;
    }
    
    const userData = { name, email, password };
    
    try {
        const response = await fetch('https://mockapi.io/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to register. Email might already exist.');
        }
        
        messageDiv.textContent = 'Registration successful!';
        messageDiv.style.color = 'green';
        document.getElementById('registrationForm').reset();
    } catch (error) {
        messageDiv.textContent = error.message;
        messageDiv.style.color = 'red';
    }
});
