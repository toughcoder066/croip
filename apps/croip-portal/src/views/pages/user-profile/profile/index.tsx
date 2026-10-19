// Components Imports
import AboutSection from '@/views/pages/user-profile/profile/about-section'
import { ActivityTimeline } from '@/views/pages/user-profile/profile/activity-timeline'

function Profile() {
  return (
    <div className='grid grid-cols-12 gap-6'>
      {/* About Section */}
      <div className='col-span-12 lg:col-span-4'>
        <AboutSection />
      </div>

      {/* Activity Timeline */}
      <div className='col-span-12 lg:col-span-8'>
        <ActivityTimeline />
      </div>
    </div>
  )
}

export default Profile

