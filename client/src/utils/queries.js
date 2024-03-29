import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_EXE = gql`
  query getUser {
    getUser{ _id
    email
    username
    savedExercise 
      {
        _id
        equipment
        gifUrl
        name
        target
        bodyPart}
      },
  }
`;
export const QUERY_GET_EXE = gql`
  query getEXE($bodyName:String!) {
   
    getEXE(bodyName:$bodyName) { 

    bodyPart
    equipment
    gifUrl
    name
    target}
      
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
