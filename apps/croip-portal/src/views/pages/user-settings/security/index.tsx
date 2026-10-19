// Component Imports
import { Separator } from '@/components/ui/separator'

import { TwoFactorAuth } from '@/views/pages/user-settings/security/two-factor-auth'
import DangerZone from '@/views/pages/user-settings/general/danger-zone'

const UserSecurity = () => {
  return (
    <section className='py-3'>
      <TwoFactorAuth />
      <Separator className='my-10' />
      <DangerZone />
    </section>
  )
}

export default UserSecurity
