'use client'

// React Imports
import { useEffect, useRef, useState } from 'react'

// Third-party Imports
import { ImageIcon, LockIcon, Trash2Icon, UploadCloudIcon } from 'lucide-react'
import { toast } from 'sonner'

// Component Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useUserSession } from '@/context/user-session-context'

export interface CountryOption {
  id?: string
  value: string
  label: string
  code: string
  flag?: string
}

const PersonalInfo = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  // Form State
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [country, setCountry] = useState('ghana')
  const [countries, setCountries] = useState<CountryOption[]>([
    {
      value: 'ghana',
      label: 'Ghana',
      code: 'GH',
      flag: '/images/flags/ghana.png'
    }
  ])
  const [isSuperAdmin, setIsSuperAdmin] = useState(true)
  const [roleDisplay, setRoleDisplay] = useState('Super Administrator')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load canonical database countries from CROIP Shared Services microservice
  useEffect(() => {
    fetch('/api/reference/countries')
      .then(res => res.json())
      .then(data => {
        if (data.countries && Array.isArray(data.countries) && data.countries.length > 0) {
          setCountries(data.countries)
        }
      })
      .catch(() => {})
  }, [])


  const { user: sessionUser, updateUser } = useUserSession()

  useEffect(() => {
    if (sessionUser) {
      const parts = (sessionUser.fullName || '').split(' ').filter(Boolean)
      setFirstName(parts[0] || 'CROIP')
      setLastName(parts.slice(1).join(' ') || 'Super Administrator')
      setMobile(sessionUser.phone || '+233 20 000 0000')
      setCountry(sessionUser.country?.toLowerCase() || 'ghana')
      setRoleDisplay(sessionUser.roleName || sessionUser.role || 'Super Administrator')
      setIsSuperAdmin(
        sessionUser.role === 'SUPER_ADMIN' ||
          sessionUser.code === 'USR-SUPERADMIN' ||
          sessionUser.email === 'superuser@croip.com'
      )
      if (sessionUser.imageUrl) {
        setPreview(sessionUser.imageUrl)
      }
    }
  }, [sessionUser])

  useEffect(() => {
    if (!file) return

    const url = URL.createObjectURL(file)
    setPreview(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])

  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)

  const onSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return

    if (!f.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, WebP, GIF)')
      e.currentTarget.value = ''
      return
    }

    if (f.size > 5 * 1024 * 1024) {
      toast.error('Avatar file must be smaller than 5MB')
      e.currentTarget.value = ''
      return
    }

    try {
      setIsUploadingAvatar(true)
      const formData = new FormData()
      formData.append('file', f)

      const res = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (data.success && data.url) {
        setPreview(data.url)
        updateUser({ imageUrl: data.url })
        toast.success('Avatar photo uploaded successfully.')
      } else {
        toast.error(data.error || 'Failed to upload avatar.')
      }
    } catch {
      toast.error('Network error while uploading avatar.')
    } finally {
      setIsUploadingAvatar(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const openPicker = () => inputRef.current?.click()

  const removeAvatar = async () => {
    const defaultUrl = '/images/avatars/avatar-1.webp'
    setPreview(defaultUrl)
    updateUser({ imageUrl: defaultUrl })
    if (inputRef.current) inputRef.current.value = ''

    try {
      await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: defaultUrl })
      })
      toast.success('Avatar reset to default.')
    } catch {
      // ignore
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const resolvedCountry = countries.find(c => c.value === country)?.label || country
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: mobile,
          country: resolvedCountry,
          imageUrl: preview
        })
      })

      const data = await res.json()

      if (data.success) {
        const updatedFullName = `${firstName} ${lastName}`.trim()
        updateUser({
          fullName: updatedFullName,
          phone: mobile,
          country: resolvedCountry,
          imageUrl: preview
        })
        toast.success('Personal information updated successfully.')
      } else {
        toast.error(data.error || 'Failed to update personal information.')
      }
    } catch {
      toast.error('An unexpected error occurred while saving profile.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
      {/* Vertical Tabs List */}
      <div className='flex flex-col space-y-1'>
        <h3 className='text-base font-semibold'>Personal Information</h3>
        <p className='text-muted-foreground text-sm'>Manage your personal information and profile details.</p>
      </div>

      {/* Content */}
      <div className='space-y-6 lg:col-span-2'>
        <form onSubmit={handleSubmit} className='mx-auto space-y-6'>
          {/* Avatar Upload */}
          <div className='w-full space-y-2'>
            <Label>Your Avatar</Label>
            <div className='flex items-center gap-4'>
              <div
                role='button'
                tabIndex={0}
                aria-label='Upload your avatar'
                onClick={openPicker}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openPicker()
                  }
                }}
                className='flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed hover:opacity-95'
              >
                {preview ? (
                  <img src={preview} alt='avatar preview' className='h-full w-full object-cover' />
                ) : (
                  <ImageIcon />
                )}
              </div>

              <div className='flex items-center gap-2'>
                <input ref={inputRef} type='file' accept='image/*' className='hidden' onChange={onSelect} />
                <Button
                  type='button'
                  variant='outline'
                  onClick={openPicker}
                  disabled={isUploadingAvatar}
                  className='flex items-center gap-2'
                >
                  <UploadCloudIcon className='size-4' />
                  {isUploadingAvatar ? 'Uploading...' : 'Upload avatar'}
                </Button>
                <Button
                  type='button'
                  variant='ghost'
                  onClick={removeAvatar}
                  disabled={isUploadingAvatar || (!preview || preview === '/images/avatars/avatar-1.webp')}
                  className='text-destructive!'
                >
                  <Trash2Icon className='size-4' />
                </Button>
              </div>
            </div>
            <p className='text-muted-foreground text-xs'>Pick a photo not more than 5MB.</p>
          </div>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div className='flex flex-col items-start gap-2'>
              <Label htmlFor='first-name'>First Name</Label>
              <Input
                id='first-name'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder='First name'
                required
              />
            </div>

            <div className='flex flex-col items-start gap-2'>
              <Label htmlFor='last-name'>Last Name</Label>
              <Input
                id='last-name'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder='Last name'
                required
              />
            </div>

            <div className='flex flex-col items-start gap-2'>
              <Label htmlFor='mobile-number'>Mobile</Label>
              <Input
                id='mobile-number'
                type='tel'
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                placeholder='+233 20 000 0000'
              />
            </div>

            <div className='flex flex-col items-start gap-2'>
              <Label htmlFor='country'>Country</Label>
              <Select value={country} onValueChange={val => setCountry(val || 'ghana')}>
                <SelectTrigger id='country' className='w-full'>
                  <SelectValue placeholder='Select Country' />
                </SelectTrigger>
                <SelectContent className='max-h-100'>
                  <SelectGroup>
                    {countries.map(c => (
                      <SelectItem key={c.value} value={c.value}>
                        <span className='truncate'>{c.label}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Role Field - Locked for Superadmin */}
            <div className='space-y-2 sm:col-span-2'>
              <Label htmlFor='role'>Platform Role</Label>
              <TooltipProvider delay={100}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <div
                        className='cursor-not-allowed'
                        title='This field is locked and cannot be edited.'
                      />
                    }
                  >
                    <div className='relative flex items-center'>
                      <Input
                        id='role'
                        value={roleDisplay}
                        disabled
                        className='bg-muted/50 cursor-not-allowed pr-10 font-medium'
                      />
                      <LockIcon className='text-muted-foreground pointer-events-none absolute right-3 size-4' />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This field is locked and cannot be edited.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className='flex justify-end pt-2'>
            <Button type='submit' disabled={isSubmitting} className='max-sm:w-full'>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PersonalInfo
