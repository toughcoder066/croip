import { PrismaClient } from '@prisma/client';
import crypto from 'node:crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

const PERMISSIONS = [
  // User & Identity
  { code: 'users.manage', name: 'Manage Users', description: 'Create, update, activate and suspend user accounts' },
  { code: 'users.read', name: 'View Users', description: 'View user profiles, status and audit details' },
  { code: 'roles.manage', name: 'Manage Roles', description: 'Assign and revoke system roles and permissions' },
  { code: 'roles.read', name: 'View Roles', description: 'Read system roles and permission catalogs' },

  // Municipalities / Concessions (Concessions are Municipalities)
  { code: 'municipalities.manage', name: 'Manage Municipalities', description: 'Configure municipality (MMDA concession) boundaries and revenue scopes' },
  { code: 'municipalities.read', name: 'View Municipalities', description: 'View municipality jurisdictions, logos and concession statuses' },
  { code: 'concessionaires.manage', name: 'Manage Concessionaires', description: 'Onboard and assign operators to municipal concessions' },
  { code: 'concessionaires.read', name: 'View Concessionaires', description: 'View active concessionaire entities and status' },

  // Rate Cards & Tariffs
  { code: 'rate_cards.review', name: 'Review Rate Cards', description: 'Review and verify municipal rate card submissions' },
  { code: 'rate_cards.read', name: 'View Rate Cards', description: 'View municipal rate card schedules and tariffs' },

  // Bills
  { code: 'bills.review', name: 'Review Bills', description: 'Inspect calculated bills and recomputation differences' },
  { code: 'bills.read', name: 'View Bills', description: 'View citizen property bills and payment statuses' },
  { code: 'bills.own.read', name: 'View Own Bills', description: 'Citizens view bills generated for their owned or claimed properties' },

  // Properties & Ratepayer Ownership Claims
  { code: 'properties.manage', name: 'Manage All Properties', description: 'Register, verify, and update property registries across municipalities' },
  { code: 'properties.read', name: 'View All Properties', description: 'Inspect all municipal property registries (staff/auditors)' },
  { code: 'properties.search', name: 'Search & Discover Properties', description: 'Search properties by Ghana Post GPS or Property ID to discover and initiate an ownership claim' },
  { code: 'properties.claim', name: 'Claim Property', description: 'Citizens submit ownership claims on enumerated municipal properties' },
  { code: 'properties.own.manage', name: 'Manage Own Properties', description: 'Citizens update details and manage documentation of their claimed properties' },
  { code: 'properties.own.read', name: 'View Own Properties', description: 'Citizens inspect private details of their claimed and verified properties' },

  // Payments, Reconciliation & Disbursements
  { code: 'payments.read', name: 'View Payments', description: 'View cashless transactions and payment intents' },
  { code: 'payments.manage', name: 'Manage Payments', description: 'Process assisted payments and manual reversals' },
  { code: 'payments.own.initiate', name: 'Initiate Own Payments', description: 'Citizens make cashless payments (MoMo / Card) for their properties' },
  { code: 'reconciliation.manage', name: 'Manage Reconciliation', description: 'Reconcile independent bank settlements with ledger' },
  { code: 'reconciliation.read', name: 'View Reconciliation', description: 'View 4-state settlement reconciliation reports' },
  { code: 'disbursements.prepare', name: 'Prepare Disbursements', description: 'Compile daily settlement disbursement batches' },
  { code: 'disbursements.approve', name: 'Approve Disbursements', description: 'Checker approval for daily bank disbursements' },
  { code: 'split_rules.manage', name: 'Manage Split Rules', description: 'Draft revenue split allocation rules' },
  { code: 'split_rules.approve', name: 'Approve Split Rules', description: 'Checker approval for revenue split allocation policies' },

  // Citizen Support, Receipts & Disputes
  { code: 'disputes.manage', name: 'Manage Disputes', description: 'Investigate and resolve ratepayer billing disputes' },
  { code: 'disputes.read', name: 'View Disputes', description: 'View ratepayer billing dispute tickets' },
  { code: 'disputes.own.manage', name: 'Manage Own Disputes', description: 'Citizens raise and track billing or valuation disputes on their claimed properties' },
  { code: 'receipts.reissue', name: 'Reissue Receipts', description: 'Re-issue signed QR payment receipts' },
  { code: 'receipts.verify', name: 'Verify Receipts', description: 'Verify authentic QR receipts' },

  // Platform Ops & Audit
  { code: 'audit_log.read', name: 'View Audit Logs', description: 'Read tamper-evident audit records' },
  { code: 'integrations.manage', name: 'Manage Integrations', description: 'Configure SMS (Arkesel), payment gateways, and vault secrets' },
  { code: 'jobs.manage', name: 'Manage Workers', description: 'Monitor background queues and retry dead-letter jobs' }
];

const ROLES: { code: string; name: string; description: string; permissions: string[] }[] = [
  {
    code: 'SUPER_ADMIN',
    name: 'Super Administrator',
    description: 'Full administrative access across all municipalities and platform services',
    permissions: PERMISSIONS.map((p) => p.code)
  },
  {
    code: 'CROIP_ADMIN',
    name: 'CROIP Central Administrator',
    description: 'Government oversight administrator managing users, municipal concessions, and standards',
    permissions: [
      'users.manage', 'users.read', 'roles.manage', 'roles.read',
      'municipalities.manage', 'municipalities.read', 'concessionaires.manage', 'concessionaires.read',
      'rate_cards.read', 'bills.read', 'properties.read', 'payments.read', 'reconciliation.read',
      'disputes.read', 'receipts.verify', 'audit_log.read', 'integrations.manage'
    ]
  },
  {
    code: 'RATE_CARD_VERIFIER',
    name: 'Rate Card Verifier',
    description: 'Reviews and approves municipality (MMDA concession) rate cards against statutory bylaws',
    permissions: ['rate_cards.review', 'rate_cards.read', 'bills.review', 'bills.read', 'properties.read', 'municipalities.read']
  },
  {
    code: 'FINANCE_OFFICER',
    name: 'Finance & Reconciliation Officer',
    description: 'Monitors payment collections, executes bank reconciliation, and prepares disbursement batches',
    permissions: [
      'payments.read', 'reconciliation.manage', 'reconciliation.read',
      'disbursements.prepare', 'split_rules.manage', 'bills.read', 'municipalities.read'
    ]
  },
  {
    code: 'FINANCE_APPROVER',
    name: 'Finance Checker / Approver',
    description: 'Maker-checker second approver for disbursements and revenue split rule policies',
    permissions: ['disbursements.approve', 'split_rules.approve', 'reconciliation.read', 'payments.read']
  },
  {
    code: 'CONCESSIONAIRE_ADMIN',
    name: 'Municipality / Concession Administrator',
    description: 'Manages revenue operations, field agents, and property submissions within assigned municipality (concession)',
    permissions: [
      'properties.manage', 'properties.read', 'bills.read', 'payments.read',
      'municipalities.read', 'users.read', 'disputes.read'
    ]
  },
  {
    code: 'FIELD_AGENT',
    name: 'Field Agent',
    description: 'Field officer performing property enumeration and cashless payment assistance in assigned municipality',
    permissions: ['properties.manage', 'properties.read', 'payments.manage', 'receipts.verify']
  },
  {
    code: 'DISPUTES_OFFICER',
    name: 'Disputes & Support Officer',
    description: 'Customer care officer addressing ratepayer grievances and reissuing digital receipts',
    permissions: ['disputes.manage', 'disputes.read', 'receipts.reissue', 'receipts.verify', 'bills.read']
  },
  {
    code: 'AUDITOR',
    name: 'Independent Auditor',
    description: 'Read-only oversight of audit logs, financial states, and transactions across all municipalities',
    permissions: [
      'audit_log.read', 'users.read', 'roles.read', 'payments.read',
      'reconciliation.read', 'bills.read', 'properties.read', 'rate_cards.read', 'municipalities.read'
    ]
  },
  {
    code: 'SYSTEM_ADMIN',
    name: 'System Administrator',
    description: 'Infrastructure and integration operations manager',
    permissions: ['integrations.manage', 'jobs.manage', 'audit_log.read']
  },
  {
    code: 'RATEPAYER',
    name: 'Citizen Ratepayer',
    description: 'Registered citizen discovering and claiming properties, managing owned properties, paying municipal bills, and tracking receipts',
    permissions: [
      'properties.search',
      'properties.claim',
      'properties.own.manage',
      'properties.own.read',
      'bills.own.read',
      'payments.own.initiate',
      'receipts.verify',
      'disputes.own.manage'
    ]
  }
];

async function main() {
  console.log('🌱 Seeding permissions with ratepayer property claims...');
  const permissionMap = new Map<string, string>();
  for (const perm of PERMISSIONS) {
    const record = await prisma.permission.upsert({
      where: { code: perm.code },
      update: { name: perm.name, description: perm.description },
      create: perm
    });
    permissionMap.set(perm.code, record.id);
  }
  console.log(`✅ Seeded ${PERMISSIONS.length} atomic permissions.`);

  console.log('🌱 Seeding roles and role-permission mappings...');
  const roleMap = new Map<string, string>();
  for (const roleDef of ROLES) {
    const roleRecord = await prisma.role.upsert({
      where: { code: roleDef.code },
      update: { name: roleDef.name, description: roleDef.description },
      create: {
        code: roleDef.code,
        name: roleDef.name,
        description: roleDef.description
      }
    });
    roleMap.set(roleDef.code, roleRecord.id);

    // Link permissions
    for (const permCode of roleDef.permissions) {
      const permId = permissionMap.get(permCode);
      if (permId) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: roleRecord.id,
              permissionId: permId
            }
          },
          update: {},
          create: {
            roleId: roleRecord.id,
            permissionId: permId
          }
        });
      }
    }
  }
  console.log(`✅ Seeded ${ROLES.length} system roles with updated permissions.`);

  console.log('🌱 Verifying Platform Super Admin user...');
  const superAdminRole = roleMap.get('SUPER_ADMIN');
  if (superAdminRole) {
    const adminEmail = 'admin@croip.gov.gh';
    const adminPhone = '233200000001';
    const passwordHash = hashPassword('AdminPassword123!');

    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: { status: 'ACTIVE' },
      create: {
        email: adminEmail,
        phone: adminPhone,
        accountType: 'STAFF',
        status: 'ACTIVE',
        credential: {
          create: { passwordHash }
        },
        staffProfile: {
          create: {
            fullName: 'CROIP System Administrator',
            department: 'Central Technology & Oversight',
            staffIdNumber: 'STAFF-HQ-001'
          }
        },
        roleAssignments: {
          create: {
            roleId: superAdminRole
          }
        }
      }
    });
    console.log(`✅ Super Admin ready (${adminUser.email})`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
