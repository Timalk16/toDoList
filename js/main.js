'use strict';

 const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

    let todoData = [];

    


    let render = function () {
        todoList.textContent = '';
        todoCompleted.textContent = '';

        todoData.forEach(function (item, i) {
            const li = document.createElement('li');
            li.classList.add('todo-item');

            li.innerHTML = '<span class="text-todo">' +  item.value  + '</span>' + 
                           '<div class="todo-buttons">' +
                                '<button class="todo-remove"></button>' +
                                '<button class="todo-complete"></button>' +
                           '</div>';
            if (item.completed) {
                todoCompleted.append(li);
            } else {
                todoList.append(li);
            }

            const todoCompletedBtn = li.querySelector('.todo-complete');
            const todoRemoveBtn = li.querySelector('.todo-remove');

            todoCompletedBtn.addEventListener('click', function () {
                item.completed = !item.completed; 
                localStorage.setItem('todo', JSON.stringify(todoData));  
                render();
            });
            todoRemoveBtn.addEventListener('click', function () {
                li.remove();
                todoData.splice(item, 1);
                localStorage.setItem('todo', JSON.stringify(todoData)); 
               render();
            });
        });
    };

    if (localStorage.getItem('todo')) {
        todoData = JSON.parse(localStorage.getItem('todo'));
        render();
    }

    todoControl.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!headerInput.value) return;

        const newTodo = {
            value: headerInput.value,
            completed: false
        };

        localStorage.setItem('todo', JSON.stringify(todoData));

        todoData.push(newTodo);
        headerInput.value = '';

        render();
    });

    