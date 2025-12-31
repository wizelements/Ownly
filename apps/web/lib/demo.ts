export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

export const demoUser = {
  id: 'demo_user_123',
  firstName: 'Demo',
  lastName: 'User',
  fullName: 'Demo User',
  emailAddresses: [{ emailAddress: 'demo@ownly.com' }],
  primaryEmailAddress: { emailAddress: 'demo@ownly.com' },
  imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=DU',
}

export const demoUserData = {
  id: 'demo_user_123',
  clerkId: 'demo_user_123',
  email: 'demo@ownly.com',
  firstName: 'Demo',
  lastName: 'User',
  role: 'CUSTOMER',
  onboarded: true,
  businesses: [
    {
      id: 'demo_business_1',
      name: 'TechVentures',
      legalName: 'TechVentures LLC',
      type: 'LLC',
      state: 'DE',
      formationStatus: 'ACTIVE',
    },
    {
      id: 'demo_business_2',
      name: 'CreativeStudio',
      legalName: 'CreativeStudio LLC',
      type: 'SINGLE_MEMBER_LLC',
      state: 'CA',
      formationStatus: 'ACTIVE',
    },
  ],
}

export const demoStats = {
  businessCount: 2,
  invoiceCount: 5,
  totalRevenue: 1250000, // in cents = $12,500
  tasksDue: 3,
}
