import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '' },
    list: []
}

// um componente de classe para viabilizar 2 coisas, vou precisar nesse exemplo
// trabalhar com o metódo de ciclo de vida do react e vou precisar ter estado
export default class UserCrud extends Component {

    state = { ...initialState }

    // essa função será chamada quando um componente for ser exibido na tela
    // dentro dessa função vou fazer uma chamada no meu backend para obter a lista
    // daquilo que está cadastrado dentro de db.json
    componentWillMount() {
        axios(baseUrl).then(resp => {
            // aquilo que recebi como resposta da minha requisição eu salvo dentro da lista
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        // fazendo um post ou um put para essa url de usuarios http://localhost:3001/users
        // o json server vai persistir esse usuário no meu db.json e o próprio json server 
        // retorna pra mim o usuário já com id preenchido, e se tiver sido atualizado ou
        // email ou o nome retorna o objeto atualizado
        // então pegando o resp.data vou pegar exatamente os dados que foram retornados 
        // pelo json server 
        axios[method](url, user)
            .then( resp => {
                // resp.data é extament o usuario que foi obtido pelo webservice
                const list = this.getUpdatedList(resp.data)
                // depois que eu inclui ou salvei usuario eu vou querer limpar o formulário 
                // e finalmente vou atualizar a lista que foi obtida de getUpdatedList
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add = true) {
        // estou removendo o usuário da lista e colocando de novo só que na primeira posição 
        const list = this.state.list.filter(u => u.id !== user.id)
        // unshift coloca um elemento na primeira posição do array
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        // vou clonar o usuario usando o operador spread, porque nessa função vou alterar 
        // o conteúdo de usuário, então não é interessante alterar diretamente no state
        // e sim clonar o objeto e alterar esse clone e depois setar o estado usando a 
        // função setstate()
        const user = { ...this.state.user }
        // vou usar o nome do input pra procurar a propriedade dentro do estado, ou seja,
        // dentro de user, o nome do input tem que ser name, e do outro input tem que ser email
        // user[qual o attr do user] = valor que esta dentro do meu campo input
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name" value={this.state.user.name} onChange={e => this.updateField(e)} placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="email" className="form-control" name="email" value={this.state.user.email} onChange={e => this.updateField(e)} placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {       
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}