import { gql } from 'apollo-boost';

const getUserQuery = gql`
    query GetUser($id: ID){      
      UserDeatails(id: $id) {
        first_name,
    last_name,
    avatar

      }
            
    }
`;


export { getUserQuery };