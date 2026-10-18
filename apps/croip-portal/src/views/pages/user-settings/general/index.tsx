// Component Imports
import { Separator } from '@/components/ui/separator'

import ConnectAccount from '@/views/pages/user-settings/general/connect-account'
import EmailPass from '@/views/pages/user-settings/general/email-password'
import PersonalInfo from '@/views/pages/user-settings/general/personal-info'

const UserGeneral = () => {
  return (
    <section className='py-3'>
      <PersonalInfo />
      <Separator className='my-10' />
      <EmailPass />
      <Separator className='my-10' />
      <ConnectAccount />
    </section>
  )
}

export default UserGeneral
