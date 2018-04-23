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
        this.handelAdd = this.handelAdd.bind(this)
        this.handelChange = this.handelChange.bind(this)
        this.refresh = this.refresh.bind(this)
        this.handelRemove = this.handelRemove.bind(this)
        this.refresh()
    }

    handelChange(event) {
        this.setState({ ...this.state, description: event.target.value })
    }

    handelAdd() {
        const description = this.state.description;
        Axios.post(URL, { description })
            .then(resp => { 
                this.refresh()
             })
    }

    handelRemove(todo) {
        Axios.delete(`${URL}/${todo._id}`)
            .then(() => this.refresh())
    }

    refresh() {
        Axios.get(`${URL}?sort=-createAt`)
            .then(resp => {
                this.setState({ ...this.state, description: '', list: resp.data })
            })
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro' ></PageHeader>
                <TodoForm handelAdd={this.handelAdd}
                    handelChange={this.handelChange}
                    description={this.state.description} />
                <TodoList list={this.state.list} handelRemove={this.handelRemove} />
            </div>
        )
    }
}