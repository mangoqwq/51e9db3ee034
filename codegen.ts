import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "https://api.hackthenorth.com/v3/frontend-challenge",
    documents: ['lib/**/*.tsx', 'lib/**/*.ts'],
    generates: {
        'lib/graphql/events_api/': {
            preset: 'client',
            presetConfig: {
                gqlTagName: 'gql',
            }
        },
    }
};

export default config;
