import React from 'react';
import './style.css';
import axios from 'axios';

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
    this.state = { data: [] };
  }

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
    console.log(this.state.data);

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
      </section>
    );
  }
}
