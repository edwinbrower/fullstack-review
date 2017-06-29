import React from 'react';

const RepoListEntry = (props) => (
  <div>
    <a href={props.repo.html_url} target="_blank"> {props.repo.name} </a>
  </div>
);

export default RepoListEntry;
