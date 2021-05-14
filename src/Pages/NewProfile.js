import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NewProfile.css';

class NewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickName: '',
      name: '',
      mail: '',
      pass: '',
      street: '',
      house: '',
      neighborhood: '',
      state: '',
      country: '',
    };
    this.newStorage = this.newStorage.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.createNewProfile = this.createNewProfile.bind(this);
  }

  inputHandler({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  newStorage() {
    const {
      nickName,
      name,
      mail,
      pass,
      street,
      house,
      neighborhood,
      state,
      country,
    } = this.state;
    localStorage.setItem('newUser', JSON.stringify({
      nickName,
      name,
      mail,
      pass,
      street,
      house,
      neighborhood,
      state,
      country,
    }));
  }

  createNewProfile() {
    this.newStorage();
  }

  render() {
    const {
      nickName,
      name,
      mail,
      pass,
      login,
      street,
      house,
      neighborhood,
      state,
      country,
    } = this.state;
    return (
      <div className="newProfContainer">
        <forms className="forms">
          <section className="userForms">
            <input
              placeholder="Insira seu E-mail"
              name="mail"
              value={ mail }
              type="text"
              className="userMail"
              onChange={ this.inputHandler }
            />
            <input
              placeholder="Insira seu Nome"
              name="name"
              value={ name }
              type="text"
              className="userName"
              onChange={ this.inputHandler }
            />
            <input
              placeholder="Como deseja ser Chamado?"
              name="nickName"
              value={ nickName }
              type="text"
              className="userNickName"
              onChange={ this.inputHandler }
            />
            <input
              placeholder="Crie um Login de Usuário"
              name="login"
              value={ login }
              type="password"
              className="userPass"
              onChange={ this.inputHandler }
            />
            <input
              placeholder="Insira sua Senha"
              name="pass"
              value={ pass }
              type="password"
              className="userPass"
              onChange={ this.inputHandler }
            />
          </section>
          <section className="adressForms">
            <input
              placeholder="Insira sua Rua"
              name="street"
              value={ street }
              type="text"
              className="userStreet"
              onChange={ this.inputHandler }
            />
            <input
              placeholder="Numero da Residencia"
              name="house"
              value={ house }
              type="number"
              className="userHouseNumber"
              onChange={ this.inputHandler }
            />
            <input
              placeholder="Bairro"
              name="neighborhood"
              value={ neighborhood }
              type="text"
              className="userNeighborhood"
              onChange={ this.inputHandler }
            />
            <input
              placeholder="Estado"
              name="state"
              value={ state }
              type="text"
              className="userState"
              onChange={ this.inputHandler }
            />
            <input
              placeholder="Pais"
              name="country"
              value={ country }
              type="text"
              className="userCountry"
              onChange={ this.inputHandler }
            />
          </section>
        </forms>
        <section className="vipSection">
          <h1>Conteúdo Vip!</h1>
          <p>Seja um usuário vip e tenha acesso a conteudos exclusivos como:</p>
          <ul>
            <li>Editar e Salvar Receitas</li>
            <li>Ver Receitas de Outros Usuários</li>
            <li>Cursos Online</li>
            <li>Kit Exclusivo Your Wish Our Dish</li>
          </ul>
          <h3>Acesse o link para maiores informações</h3>
          <Link href="/cadastro">
            <p className="vipImg">Vip</p>
          </Link>
        </section>
        <section className="sectionSubmit">
          <input type="checkbox" className="userAccount" onChange={ this.inputHandler } />
          <input type="checkbox" className="userAccount" onChange={ this.inputHandler } />
          <Link to="/perfil">
            <button
              type="button"
              onClick={ this.createNewProfile() }
            >
              Cadastrar
            </button>
          </Link>
        </section>
      </div>
    );
  }
}

export default NewProfile;
