import React from 'react';
import KataGroups from './katagroups';

class Page extends React.Component {

  render() {
    //console.log(this.props.groups);
    const {groups} = this.props;
    const groupNames = Object.keys(groups);
    return (
          <KataGroups groupNames={groupNames} />
        );
  }

}

class KataGroup extends React.Component {
  render() {
    const {name, count} = this.props;
    return <li>{name} ({count})</li>
  }
}


import JSONLoader from './JSONLoader.js';
const url = 'http://katas.tddbin.com/katas/es6/language/__grouped__.json';

JSONLoader.loadRemoteFile(url, (err, {groups}) => {
  React.render(<Page groups={groups} />, document.getElementById('app'));
});