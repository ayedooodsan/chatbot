import { graphql, compose } from 'react-apollo';
import inviteUsersGql from './inviteUsers.gql';
import invitedUsersGql from './invitedUsers.gql';

const withInvitedUsers = graphql(invitedUsersGql, {
  name: 'invitedUsers',
  options: props => ({
    variables: {
      id: props.projectId
    }
  }),
  props: ({ invitedUsers: { loading, project, error } }) => {
    return {
      loading,
      invitedUsers: project ? project.invitedUsers : [],
      error
    };
  }
});

const withInviteUsers = graphql(inviteUsersGql, {
  name: 'inviteUsers',
  props: ({ inviteUsers }) => ({
    inviteUsers: ({ id, userIds }) =>
      inviteUsers({
        variables: { id, userIds },
        refetchQueries: ['project']
      })
  })
});

export default comp =>
  compose(
    withInvitedUsers,
    withInviteUsers
  )(comp);
