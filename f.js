document.addEventListener("DOMContentLoaded", () => {

    const loginContainer = document.getElementById('login-container');
    const appContainer = document.getElementById('app-container');
    const usernameInput = document.getElementById('username');
    const loginButton = document.getElementById('login-button');
    const greeting = document.getElementById('greeting');
    const clockElement = document.getElementById('clock');
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const weatherElement = document.getElementById('weather');

const backgrounds = [
        'url(image1.jpg)', 'url(image2.jpg)', 'url(image3.jpg)', 'url(image4.jpg)'
    ];


function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
 }


function loadRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = backgrounds[randomIndex];
}


function saveUsername(username) {
    localStorage.setItem('username', username);
}

    function getUsername() {
        return localStorage.getItem('username');
    }

    function saveTodoList(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function getTodoList() {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    }

    function renderTodoList() {
        const todos = getTodoList();
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo;
            li.addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodoList(todos);
                renderTodoList();
            });
            todoList.appendChild(li);
        });
    }

    function fetchWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const apiKey = 'YOUR_API_KEY_HERE';
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                const response = await fetch(url);
                const data = await response.json();
                weatherElement.textContent = `Temperature: ${data.main.temp}°C, Weather: ${data.weather[0].description}`;
            });
        } else {
            weatherElement.textContent = 'Geolocation is not supported by this browser.';
        }
    }


    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            saveUsername(username);
            greeting.textContent = username;
            loginContainer.classList.add('hidden');
            appContainer.classList.remove('hidden');
            loadRandomBackground();
            updateClock();
            setInterval(updateClock, 1000);
            renderTodoList();
            fetchWeather();
        }
    });

    addTodoButton.addEventListener('click', () => {
        const todo = todoInput.value.trim();
        if (todo) {
            const todos = getTodoList();
            todos.push(todo);
            saveTodoList(todos);
            renderTodoList();
            todoInput.value = '';
        }
    });


    const storedUsername = getUsername();
    if (storedUsername) {
        greeting.textContent = storedUsername;
        loginContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        loadRandomBackground();
        updateClock();
        setInterval(updateClock, 1000);
        renderTodoList();
        fetchWeather();
    }
});
