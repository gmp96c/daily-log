import { gql } from '@apollo/client';

export const GET_TASKS_QUERY = gql`
    query GET_TASKS($id: ID!) {
        User(where: { id: $id }) {
            id
            name
            currentTasks {
                id
                body
                tips(where: { pinnedBy_some: { id: $id } }) {
                    id
                    body
                    _pinnedByMeta {
                        count
                    }
                }
            }
        }
    }
`;

export const GET_TIPS = gql`
    query GET_TIPS($id: ID!) {
        Task(where: { id: $id }) {
            id
            tips {
                body
                id
                _pinnedByMeta {
                    count
                }
            }
        }
    }
`;
