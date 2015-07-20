import React from 'react';

export default class Picture extends React.Component {
  constructor (props) {
    super(props);
  }
  clickHandler () {
    this.props.onClick(this.props.id);
  }
  render () {
    var cls = 'picture ' + (this.props.favorite ? 'favorite' : '');
    return (
      <div className={cls} onClick={this.clickHandler.bind(this)} >
        <img src={this.props.src} width="200" title={this.props.title} />
      </div>
    );
  }
}
