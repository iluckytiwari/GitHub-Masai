document.addEventListener('DOMContentLoaded', fetchUsers);

document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const messageDiv = document.getElementById('message');
    
    if (!name || !email) {
        messageDiv.textContent = 'All fields are required.';
        messageDiv.style.color = 'red';
        return;
    }
    
    const newUser = { name, email };
    
    try {
        const response = await fetch('https://mockapi.io/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });
        
        if (!response.ok) {
            throw new Error('Failed to add user. Email might already exist.');
        }
        
        messageDiv.textContent = 'User added successfully!';
        messageDiv.style.color = 'green';
        document.getElementById('userForm').reset();
        fetchUsers(); // Refresh the user list
    } catch (error) {
        messageDiv.textContent = error.message;
        messageDiv.style.color = 'red';
    }
});

async function fetchUsers() {
    try {
        const response = await fetch('https://mockapi.io/users');
        if (!response.ok) {
            throw new Error('Failed to fetch users.');
        }
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        document.getElementById('message').textContent = error.message;
    }
}

function displayUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
}
