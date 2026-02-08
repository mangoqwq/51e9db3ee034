/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  sampleEvent: TEvent;
  sampleEvents: Array<TEvent>;
};


export type QuerySampleEventArgs = {
  id: Scalars['Float']['input'];
};

export type TEvent = {
  __typename?: 'TEvent';
  description?: Maybe<Scalars['String']['output']>;
  end_time: Scalars['Float']['output'];
  event_type: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  permission?: Maybe<Scalars['String']['output']>;
  private_url: Scalars['String']['output'];
  public_url?: Maybe<Scalars['String']['output']>;
  related_events: Array<Scalars['Int']['output']>;
  speakers: Array<TSpeaker>;
  start_time: Scalars['Float']['output'];
};

export type TSpeaker = {
  __typename?: 'TSpeaker';
  name: Scalars['String']['output'];
  profile_pic?: Maybe<Scalars['String']['output']>;
};

export type GetAllEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEventsQuery = { __typename?: 'Query', sampleEvents: Array<{ __typename?: 'TEvent', id: number, name: string, event_type: string, permission?: string | null, start_time: number, end_time: number, description?: string | null, public_url?: string | null, private_url: string, related_events: Array<number>, speakers: Array<{ __typename?: 'TSpeaker', name: string }> }> };


export const GetAllEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sampleEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"event_type"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"speakers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"public_url"}},{"kind":"Field","name":{"kind":"Name","value":"private_url"}},{"kind":"Field","name":{"kind":"Name","value":"related_events"}}]}}]}}]} as unknown as DocumentNode<GetAllEventsQuery, GetAllEventsQueryVariables>;