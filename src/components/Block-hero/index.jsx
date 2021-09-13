import React from 'react';
import './style.css';
import axios from 'axios';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    console.log(() => {
      if (this.props.error) return 'classError';
      else return 'classNoError';
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            className={this.props.error ? 'classError' : 'classNoError'}
            type='text'
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

function Person(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.height}</td>
      <td>{props.mass}</td>
      <td>
        <button data-name={props.name} onClick={props.onClick}>
          delete {props.name}
        </button>
      </td>
    </tr>
  );
}

export default class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], error: false };
  }

  handleSubmit = (name) => {
    const copyData = [...this.state.data];

    const characterName = name;

    const index = copyData.findIndex(
      (item) => item.name.toLowerCase() === characterName.toLowerCase()
    );

    if (index >= 0) {
      copyData.splice(index, 1);
      this.setState({
        data: copyData,
        error: false,
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  handleClick = (e) => {
    const copyData = [...this.state.data];

    const characterName = e.target.dataset.name;

    const index = copyData.findIndex((item) => item.name === characterName);

    copyData.splice(index, 1);
    console.log(copyData);
    this.setState({
      data: copyData,
    });
  };

  componentDidMount() {
    axios.get('https://swapi.dev/api/people').then((response) => {
      this.setState({
        data: response.data.results,
      });
    });
  }

  render() {
    return (
      <section className='hero'>
        <table id='table'>
          <tbody>
            <tr>
              <td>Имя</td>
              <td>Вес</td>
              <td>Рост</td>
            </tr>

            {this.state.data.map((item) => (
              <Person
                key={`person ${item.name}`}
                {...item}
                onClick={this.handleClick}
              />
            ))}
          </tbody>
        </table>
        <NameForm onSubmit={this.handleSubmit} error={this.state.error} />,
      </section>
    );
  }
}
