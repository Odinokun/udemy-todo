import React, {Component} from 'react';
import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';


export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Create portfolio'),
      this.createTodoItem('Find cool job'),
      this.createTodoItem('Go to fishing')
    ],
    term: ''
  };

  createTodoItem(label) {
    return {
      label: label,
      important: false,
      done: false,
      id: this.maxId++
    }
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      //ищем индекс элемента у которого id точно такой как мы получили
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        //находим кусок массива ДО удаляемого элемента
        ...todoData.slice(0, idx),
        //находим кусок массива ПОСЛЕ удаляемого элемента
        ...todoData.slice(idx + 1)
      ];
      //возвращаем измененный массив
      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    // генерируем id и элемент
    const newItem = this.createTodoItem(text);

    // добавляем элемент в массив
    this.setState(({todoData}) => {
      const newArr = [
        //берем старый массив + новый элемент
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      }
    });
  };

  // принимаем массив, id изменяемого элемента
  // и свойство которое меняем true/false/true
  toggleProperty(arr, id, propName) {
    //ищем индекс элемента у которого id точно такой как мы получили
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx]; //старый объект
    //создали дубликат старого объекта и изменили в нем значение done
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    // возвращаем новый массив с дубликатом объекта
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ]
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  //принимаем массив объектов и значение фильтра
  search(items, term) {
    // если в фильтре пустая строка, то возвращаем весь массив
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      // возвращаем те элементы которые при сравнении вернули true
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  onSearchChange = (term) => {
    this.setState({ term });
  };

  render() {

    const {todoData, term} = this.state;

    //для фильтрации
    const visibleItems = this.search(todoData, term);

    //считаем законченные дела
    const doneCount = todoData.filter((el) => el.done).length;
    //считаем НЕзаконченные дела
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter/>
        </div>

        <TodoList
          todos={visibleItems}  //передаем отфильтрованные элементы
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm
          addItem={this.addItem}/>
      </div>
    );
  }

};