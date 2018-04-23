import React, { Component } from 'react'
import Axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = { description: '', list: [] }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkPending = this.handleMarkPending.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.refresh = this.refresh.bind(this)
        this.refresh()
    }

    handleChange(event) {
        this.setState({ ...this.state, description: event.target.value })
    }

    handleAdd() {
        const description = this.state.description;
        Axios.post(URL, { description })
            .then(resp => { 
                this.refresh()
             })
    }

    handleRemove(todo) {
        Axios.delete(`${URL}/${todo._id}`)
            .then(() => this.refresh(this.state.description))
    }

    handleMarkPending(todo) {
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsDone(todo) {
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => this.refresh(this.state.description))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleClear() {
        this.refresh()
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        Axios.get(`${URL}?sort=-createAt${search}`)
            .then(resp => {
                this.setState({ ...this.state, description: description, list: resp.data })
            })
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro' ></PageHeader>
                <TodoForm handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                    description={this.state.description} />
                <TodoList list={this.state.list}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkPending={this.handleMarkPending}
                    handleRemove={this.handleRemove} />
            </div>
        )
    }
}