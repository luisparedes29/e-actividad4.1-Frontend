import {debounce} from './debounce.js'
const input = document.querySelector('#search');
const userList = document.querySelector('.user-list');
const form = document.querySelector('#form');
const URL = 'https://api.github.com/search/users?q=';
const URL_USUARIO = 'https://api.github.com/users/';
const URL_REPOS = 'https://api.github.com/users/';
const loader= document.querySelector('#onload')

form.addEventListener('submit', (e) => {
    userList.innerHTML = ``;
    e.preventDefault();
    let search = input;
    console.log(search.value);
    loader.classList.toggle('mostrar');
    const buscarDebounced = debounce(buscar, 5000);
    buscarDebounced(search);
    // debounce(()=> buscar(search),5000);
    // buscar(search);
});

function buscar(search) {
    fetch(`${URL}${search.value}`)
        .then((data) => data.json())
        .then((users) => {
            if (users.total_count === 0) {
                alert('Usuario no encontrado');
            }
            console.log(users);
            const user = users.items.slice(0, 3);
            console.log(user);
            user.forEach((u) => {
                let element = document.createElement('article');
                element.classList.add('contenedorTarjeta');
                let fig = document.createElement('figure');
                fig.classList.add('contenedorImg');
                let imgUsuario = document.createElement('img');
                imgUsuario.classList.add('imgUsuario');
                console.log(u.login);
                let contSecundario = document.createElement('div');
                contSecundario.classList.add('contSecundario');
                let nombreUsuario = document.createElement('p');
                nombreUsuario.classList.add('nombre');
                let username = document.createElement('p');
                username.classList.add('username');
                let repositorios = document.createElement('p');
                let company = document.createElement('p');
                company.classList.add('company');

                fetch(`${URL_USUARIO}${u.login}`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);

                        imgUsuario.src = `${data.avatar_url}`;
                        username.innerHTML = `<span class=username>${u.login}</span> `;
                        repositorios.innerHTML = `Repositorios: <span class="numRepo">${data.public_repos}</span>`;
                        userList.appendChild(element);
                        element.appendChild(fig);
                        fig.appendChild(imgUsuario);
                        element.appendChild(contSecundario);
                        contSecundario.appendChild(username);
                        if (data.name) {
                            nombreUsuario.innerHTML = `name:<span class="nombre">${data.name}</span> `;
                            contSecundario.appendChild(nombreUsuario);
                        } else {
                            nombreUsuario.innerHTML = `name: <span class="name">N/A</span>`;
                            contSecundario.appendChild(nombreUsuario);
                        }
                        if (data.company) {
                            company.innerHTML = `Company: <span class="company">${data.company}</span>`;
                            contSecundario.appendChild(company);
                        } else {
                            company.innerHTML = `Company: <span class="company">N/A</span>`;
                            contSecundario.appendChild(company);
                        }
                        contSecundario.appendChild(repositorios);
                    });
            });
        });
        input.value='';
        loader.classList.toggle('mostrar');
}
