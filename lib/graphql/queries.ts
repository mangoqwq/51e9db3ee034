import { gql } from './events_api';

export const GET_ALL_EVENTS = gql(`
  query GetAllEvents {
    sampleEvents {
      id
      name
      event_type
      permission
      start_time
      end_time
      description
      speakers {
        name
      }
      public_url
      private_url
      related_events
    }
  }
`);
