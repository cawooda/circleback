export const typeDefs = `#graphql
  type AppUser {
    pid: String!
    emailVerified: Boolean!
  }
    
  type Address {
    Number: String!
    Street: String!
    City: String!
    Postcode: String!
  }
    type UserProfile {
    PID: String!
    First: String!
    Last: String!
    PreferredName: String!
}

    type PlanManager {
    Name: String!
    Email: String!
    InvoicesEmail: String!
    Address: Address!
    Phone: String!
}

    type CustomerProfile {
    PID: String!
    NDISNumber: String!
    PlanManager: PlanManager!
    Address: Address!
    Phone: String!
}

    type ProviderProfile {
    PID: String!
    ABN: String!
    BusinessName: String!
    Address: Address!
    Phone: String!
}

    type Product {
    Name: String!
    Code: String!
    MaxPrice: Float!
}
    
    type Service {
    Provider: ProviderProfile!
    Product: Product!
    Price: Float!
}

    enum Period {
    Daily
    Weekly
    Monthly
}

    type ServiceSchedule {
    Service: Service!
    Units: Int!
    Frequency: Int!
    Period: Period!
    StartDate: String!
    EndDate: String!
}

    type TermsAndConditions {
    Heading: String!
    Paragraph: String!
}

    type ServiceAgreement {
    Customer: CustomerProfile!
    Provider: ProviderProfile!
    Date: String!
    ServiceSchedule: [ServiceSchedule!]!
    TermsAndConditions: [TermsAndConditions!]!
    ProviderSignature: String!
    CustomerSignature: String!
    IsSent: Boolean!
}
    type Query {
    getMe: AppUser!
    getUsers: [AppUser]
    }  
`;
