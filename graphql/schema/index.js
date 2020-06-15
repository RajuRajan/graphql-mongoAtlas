const { buildSchema } = require('graphql')

module.exports = buildSchema(`
        type Roles {
            id: ID!
            name: String!
            description: String!     
        }
        
        type RoleAccessMap {
            id: ID!
            name: String!
            roleId: Roles!
            access: Boolean!
        }

        type User {
            _id: ID!
            firstName: String!
            lastName: String!
            phoneNo: Int!
            telephoneNo: Int!
            email: String!
            roleId: RoleAccessMap!
            countryId: Int!
            cityId: Int!
            designationId: Int!
            dob: Int!
            password: String
        }

        type Designation {
            id: ID!
            name: String!
            description: String!
        }

        type ResetPassword {
            id: ID!
            secretKey: Int!
            userId: String!
            expiresAt: String!
        }

        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
        }

        type ResetPassRes {
            isMatched: Boolean!
            status: String!
            isPasswordChanged: Boolean!
        }

        input UserInput {
            firstName: String!
            lastName: String!
            phoneNo: Int!
            telephoneNo: Int!
            email: String!
            roleId: Int!
            countryId: Int!
            cityId: Int!
            designationId: Int!
            dob: Int!
            password: String
        }

        type RootQuery {
            users: [User!]!
            login(email: String!, password: String!): AuthData!
            forgotPassword(email: String!): ResetPassRes 
        }

        type RootMutation {
            createUser(userInput: UserInput): User 
            checkSecretKey(secretKey: Int!): ResetPassRes
            resetPassword(secretKey: Int!, password: String!): ResetPassRes
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
`);
