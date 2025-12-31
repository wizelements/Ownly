import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database for demo mode...\n')

  // 1. Create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@ownly.com' },
    update: {},
    create: {
      clerkId: 'demo_user_clerk_id',
      email: 'demo@ownly.com',
      firstName: 'Alex',
      lastName: 'Johnson',
      phone: '+1 (555) 123-4567',
      role: 'CUSTOMER',
      onboarded: true,
    },
  })
  console.log('✅ Created demo user:', demoUser.email)

  // 2. Create sample business (LLC)
  const demoBusiness = await prisma.business.upsert({
    where: { id: 'demo_business_id' },
    update: {},
    create: {
      id: 'demo_business_id',
      userId: demoUser.id,
      name: 'Spark Digital',
      legalName: 'Spark Digital LLC',
      ein: '12-3456789',
      type: 'LLC',
      state: 'DE',
      formationDate: new Date('2024-06-15'),
      formationStatus: 'ACTIVE',
      registeredAgent: 'Delaware Registered Agent Services',
      businessAddress: {
        street: '123 Innovation Way',
        city: 'Wilmington',
        state: 'DE',
        zip: '19801',
      },
      mailingAddress: {
        street: '456 Tech Boulevard, Suite 200',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
      },
      boiStatus: 'FILED',
      boiFiledAt: new Date('2024-07-01'),
      plan: 'FOUNDER',
      successShield: true,
      shieldExpiresAt: new Date('2025-06-15'),
      active: true,
    },
  })
  console.log('✅ Created demo business:', demoBusiness.legalName)

  // 3. Create sample team members (BusinessMember)
  const teamMembers = [
    {
      businessId: demoBusiness.id,
      name: 'Alex Johnson',
      email: 'alex@sparkdigital.com',
      ownership: 60,
      role: 'Managing Member',
      address: {
        street: '456 Tech Boulevard, Suite 200',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
      },
      dateOfBirth: new Date('1988-03-15'),
    },
    {
      businessId: demoBusiness.id,
      name: 'Jordan Rivera',
      email: 'jordan@sparkdigital.com',
      ownership: 40,
      role: 'Member',
      address: {
        street: '789 Startup Lane',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
      },
      dateOfBirth: new Date('1990-07-22'),
    },
  ]

  for (const member of teamMembers) {
    await prisma.businessMember.upsert({
      where: {
        id: `demo_member_${member.email.split('@')[0]}`,
      },
      update: {},
      create: {
        id: `demo_member_${member.email.split('@')[0]}`,
        ...member,
      },
    })
  }
  console.log('✅ Created', teamMembers.length, 'team members')

  // 4. Create sample invoices
  const invoices = [
    {
      id: 'demo_invoice_001',
      businessId: demoBusiness.id,
      invoiceNumber: 'INV-2024-001',
      clientName: 'Acme Corporation',
      clientEmail: 'billing@acme.com',
      clientAddress: {
        street: '100 Corporate Drive',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
      items: [
        { description: 'Website Redesign', quantity: 1, unitPrice: 5000 },
        { description: 'SEO Optimization', quantity: 1, unitPrice: 1500 },
        { description: 'Maintenance (3 months)', quantity: 3, unitPrice: 500 },
      ],
      subtotal: 8000,
      tax: 640,
      total: 8640,
      status: 'PAID' as const,
      issueDate: new Date('2024-11-01'),
      dueDate: new Date('2024-11-30'),
      paidDate: new Date('2024-11-25'),
    },
    {
      id: 'demo_invoice_002',
      businessId: demoBusiness.id,
      invoiceNumber: 'INV-2024-002',
      clientName: 'TechStart Inc',
      clientEmail: 'finance@techstart.io',
      clientAddress: {
        street: '200 Startup Street',
        city: 'San Jose',
        state: 'CA',
        zip: '95101',
      },
      items: [
        { description: 'Mobile App Development - Phase 1', quantity: 1, unitPrice: 15000 },
        { description: 'UI/UX Design Package', quantity: 1, unitPrice: 3000 },
      ],
      subtotal: 18000,
      tax: 1440,
      total: 19440,
      status: 'SENT' as const,
      issueDate: new Date('2024-12-15'),
      dueDate: new Date('2025-01-15'),
    },
    {
      id: 'demo_invoice_003',
      businessId: demoBusiness.id,
      invoiceNumber: 'INV-2024-003',
      clientName: 'GreenLeaf Ventures',
      clientEmail: 'accounts@greenleaf.vc',
      clientAddress: {
        street: '50 Venture Circle',
        city: 'Palo Alto',
        state: 'CA',
        zip: '94301',
      },
      items: [
        { description: 'Consulting Services - Q4', quantity: 40, unitPrice: 150 },
      ],
      subtotal: 6000,
      tax: 480,
      total: 6480,
      status: 'OVERDUE' as const,
      issueDate: new Date('2024-10-01'),
      dueDate: new Date('2024-10-31'),
    },
    {
      id: 'demo_invoice_004',
      businessId: demoBusiness.id,
      invoiceNumber: 'INV-2024-004',
      clientName: 'Metro Media Group',
      clientEmail: 'ap@metromedia.com',
      clientAddress: {
        street: '888 Media Way',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001',
      },
      items: [
        { description: 'Brand Strategy Workshop', quantity: 2, unitPrice: 2500 },
        { description: 'Logo Design & Brand Assets', quantity: 1, unitPrice: 4000 },
      ],
      subtotal: 9000,
      tax: 720,
      total: 9720,
      status: 'DRAFT' as const,
      issueDate: new Date('2024-12-28'),
      dueDate: new Date('2025-01-28'),
    },
  ]

  for (const invoice of invoices) {
    await prisma.invoice.upsert({
      where: { id: invoice.id },
      update: {},
      create: invoice,
    })
  }
  console.log('✅ Created', invoices.length, 'invoices')

  // 5. Create sample tasks for the playbook
  const tasks = [
    {
      id: 'demo_task_001',
      userId: demoUser.id,
      title: 'Open business bank account',
      description: 'Set up a dedicated business checking account with Mercury or Relay.',
      category: 'BANKING' as const,
      status: 'COMPLETED' as const,
      priority: 'HIGH' as const,
      completedAt: new Date('2024-06-20'),
    },
    {
      id: 'demo_task_002',
      userId: demoUser.id,
      title: 'File quarterly estimated taxes',
      description: 'Calculate and pay Q4 2024 estimated taxes to IRS.',
      category: 'TAX' as const,
      status: 'TODO' as const,
      priority: 'URGENT' as const,
      dueDate: new Date('2025-01-15'),
    },
    {
      id: 'demo_task_003',
      userId: demoUser.id,
      title: 'Review and update Operating Agreement',
      description: 'Annual review of LLC operating agreement with any updates needed.',
      category: 'COMPLIANCE' as const,
      status: 'IN_PROGRESS' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-02-01'),
    },
  ]

  for (const task of tasks) {
    await prisma.task.upsert({
      where: { id: task.id },
      update: {},
      create: task,
    })
  }
  console.log('✅ Created', tasks.length, 'playbook tasks')

  // 6. Create a sample note
  await prisma.note.upsert({
    where: { id: 'demo_note_001' },
    update: {},
    create: {
      id: 'demo_note_001',
      userId: demoUser.id,
      title: 'Q1 2025 Goals',
      content: `## Revenue Goals
- Reach $50k MRR by end of Q1
- Sign 3 new retainer clients
- Launch productized service offering

## Operations
- Hire first contractor for development work
- Set up SOPs for client onboarding
- Implement project management system`,
      tags: ['goals', 'quarterly', 'planning'],
    },
  })
  console.log('✅ Created sample note')

  console.log('\n🎉 Demo seed data created successfully!')
  console.log('\n📊 Summary:')
  console.log('   - 1 demo user (demo@ownly.com)')
  console.log('   - 1 business (Spark Digital LLC)')
  console.log('   - 2 team members')
  console.log('   - 4 invoices (paid, sent, overdue, draft)')
  console.log('   - 3 playbook tasks')
  console.log('   - 1 note')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
