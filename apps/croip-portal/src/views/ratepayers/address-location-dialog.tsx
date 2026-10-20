'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { toast } from 'sonner'
import { MapPinIcon, Building2Icon, LandmarkIcon, CheckCircle2Icon, AlertCircleIcon, Loader2Icon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const PinpointMapPicker = dynamic(() => import('./pinpoint-map-picker'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[280px] rounded-lg bg-muted/40 animate-pulse flex items-center justify-center border border-border">
      <span className="text-xs text-muted-foreground flex items-center gap-2">
        <Loader2Icon className="size-4 animate-spin text-primary" />
        Loading interactive map...
      </span>
    </div>
  )
})

interface AddressLocationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ratepayerId: string
  currentFirstName?: string | null
  currentMiddleName?: string | null
  currentLastName?: string | null
  currentLegalName?: string | null
  currentPhone?: string | null
  currentEmail?: string | null
  currentAddress?: string | null
  currentLocationGeo?: any
  onSuccess: (updatedRatepayer: any) => void
}

export function AddressLocationDialog({
  open,
  onOpenChange,
  ratepayerId,
  currentFirstName = '',
  currentMiddleName = '',
  currentLastName = '',
  currentLegalName = '',
  currentPhone = '',
  currentEmail = '',
  currentAddress = '',
  currentLocationGeo,
  onSuccess
}: AddressLocationDialogProps) {
  // If first/last are missing but legalName is present, derive initial fallback parts
  let initFirst = currentFirstName || ''
  let initMiddle = currentMiddleName || ''
  let initLast = currentLastName || ''
  if (!initFirst && !initLast && currentLegalName) {
    const tokens = currentLegalName.trim().split(/\s+/).filter(Boolean)
    if (tokens.length === 1) initFirst = tokens[0]
    else if (tokens.length === 2) { initFirst = tokens[0]; initLast = tokens[1]; }
    else if (tokens.length >= 3) {
      initFirst = tokens[0]
      initMiddle = tokens.slice(1, -1).join(' ')
      initLast = tokens[tokens.length - 1]
    }
  }

  const [firstName, setFirstName] = useState(initFirst)
  const [middleName, setMiddleName] = useState(initMiddle)
  const [lastName, setLastName] = useState(initLast)
  const [phone, setPhone] = useState(currentPhone || '')
  const [email, setEmail] = useState(currentEmail || '')
  const [address, setAddress] = useState(currentAddress || '')

  let initLat = 5.6037
  let initLng = -0.1870
  if (currentLocationGeo?.coordinates && Array.isArray(currentLocationGeo.coordinates)) {
    initLng = Number(currentLocationGeo.coordinates[0]) || initLng
    initLat = Number(currentLocationGeo.coordinates[1]) || initLat
  }

  const [lat, setLat] = useState<number>(initLat)
  const [lng, setLng] = useState<number>(initLng)
  const [detecting, setDetecting] = useState(false)
  const [detectedZone, setDetectedZone] = useState<{
    assembly?: { id: string; name: string; code: string }
    region?: { id: string; name: string; code: string }
    matched?: boolean
  } | null>(null)
  const [saving, setSaving] = useState(false)

  const checkZone = useCallback(async (latitude: number, longitude: number) => {
    setDetecting(true)
    try {
      const res = await fetch('/api/geo/detect-zone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude })
      })
      const data = await res.json()
      if (data.success && data.data) {
        setDetectedZone(data.data)
      } else {
        setDetectedZone(null)
      }
    } catch {
      setDetectedZone(null)
    } finally {
      setDetecting(false)
    }
  }, [])

  useEffect(() => {
    if (open) {
      let f = currentFirstName || ''
      let m = currentMiddleName || ''
      let l = currentLastName || ''
      if (!f && !l && currentLegalName) {
        const tokens = currentLegalName.trim().split(/\s+/).filter(Boolean)
        if (tokens.length === 1) f = tokens[0]
        else if (tokens.length === 2) { f = tokens[0]; l = tokens[1]; }
        else if (tokens.length >= 3) {
          f = tokens[0]
          m = tokens.slice(1, -1).join(' ')
          l = tokens[tokens.length - 1]
        }
      }
      setFirstName(f)
      setMiddleName(m)
      setLastName(l)
      setPhone(currentPhone || '')
      setEmail(currentEmail || '')
      setAddress(currentAddress || '')
      checkZone(lat, lng)
    }
  }, [open, currentFirstName, currentMiddleName, currentLastName, currentLegalName, currentPhone, currentEmail, currentAddress, lat, lng, checkZone])

  const [locationChanged, setLocationChanged] = useState(false)

  const handleLocationSelect = (newLat: number, newLng: number) => {
    setLat(newLat)
    setLng(newLng)
    setLocationChanged(true)
    checkZone(newLat, newLng)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const body: Record<string, any> = {}
    if (firstName.trim()) body.firstName = firstName.trim()
    if (middleName.trim()) body.middleName = middleName.trim()
    if (lastName.trim()) body.lastName = lastName.trim()
    const assembled = [firstName.trim(), middleName.trim(), lastName.trim()].filter(Boolean).join(' ')
    if (assembled) body.legalName = assembled
    if (phone.trim()) body.phone = phone.trim()
    if (email.trim()) body.email = email.trim()
    if (address.trim()) body.address = address.trim()
    if (locationChanged) {
      body.latitude = lat
      body.longitude = lng
      body.locationGeo = {
        type: 'Point',
        coordinates: [lng, lat]
      }
    }

    if (Object.keys(body).length === 0) {
      toast.info('No profile changes detected to save.')
      return
    }

    setSaving(true)
    try {
      const res = await fetch(`/api/ratepayers/${ratepayerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()
      if (data.success) {
        toast.success('Ratepayer profile updated successfully!')
        onSuccess(data.data)
        onOpenChange(false)
      } else {
        toast.error(data.error || 'Failed to save profile details')
      }
    } catch (err) {
      console.error('Failed to update profile:', err)
      toast.error('An unexpected error occurred while saving.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <MapPinIcon className="size-4 text-primary" />
            Update Ratepayer Profile
          </DialogTitle>
          <DialogDescription className="text-xs">
            Update any part of this profile independently. Any individual section (Personal Details, Contact Info, Address, or Map Pin) can be modified without having to change the others.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-1">
          {/* Identity & Contact Details */}
          <div className="space-y-3 p-3 rounded-lg border border-border/80 bg-muted/20">
            {/* Name Fields: First, Middle, Last */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="space-y-1">
                <Label htmlFor="rp-first-name" className="text-xs font-medium">
                  First Name
                </Label>
                <Input
                  id="rp-first-name"
                  placeholder="e.g. Kwame"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="text-xs h-9 bg-background"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="rp-middle-name" className="text-xs font-medium">
                  Middle Name <span className="text-muted-foreground text-[10px]">(Optional)</span>
                </Label>
                <Input
                  id="rp-middle-name"
                  placeholder="e.g. Osei"
                  value={middleName}
                  onChange={e => setMiddleName(e.target.value)}
                  className="text-xs h-9 bg-background"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="rp-last-name" className="text-xs font-medium">
                  Last Name
                </Label>
                <Input
                  id="rp-last-name"
                  placeholder="e.g. Mensah"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="text-xs h-9 bg-background"
                />
              </div>
            </div>

            {/* Assembled Full Legal Name Preview */}
            {(firstName || lastName) && (
              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 px-0.5">
                <span className="font-medium text-foreground">Assembled Legal Name:</span>
                <span className="font-semibold text-primary">
                  {[firstName.trim(), middleName.trim(), lastName.trim()].filter(Boolean).join(' ')}
                </span>
              </div>
            )}

            {/* Contact Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-border/40">
              <div className="space-y-1">
                <Label htmlFor="rp-phone" className="text-xs font-medium flex items-center justify-between">
                  <span>Phone Number</span>
                  {!currentPhone && <Badge variant="outline" className="text-[9px] px-1 py-0 h-3.5 bg-amber-500/10 text-amber-600">Missing</Badge>}
                </Label>
                <Input
                  id="rp-phone"
                  placeholder="e.g. +233244000111"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="text-xs h-9 bg-background font-mono"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="rp-email" className="text-xs font-medium flex items-center justify-between">
                  <span>Email Address</span>
                  {!currentEmail && <Badge variant="outline" className="text-[9px] px-1 py-0 h-3.5 bg-amber-500/10 text-amber-600">Missing</Badge>}
                </Label>
                <Input
                  id="rp-email"
                  type="email"
                  placeholder="e.g. citizen@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="text-xs h-9 bg-background"
                />
              </div>
            </div>
          </div>

          {/* Street Address Input */}
          <div className="space-y-1.5">
            <Label htmlFor="rp-address" className="text-xs font-medium">
              Physical Street Address / Landmark
            </Label>
            <Input
              id="rp-address"
              placeholder="e.g. 14 Independence Avenue, Airport Residential Area"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="text-xs h-9"
            />
          </div>

          {/* Interactive Map Picker */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium flex items-center gap-1.5">
                <MapPinIcon className="size-3.5 text-primary" />
                Pinpoint Location (Click or drag pin)
              </Label>
              <span className="text-[11px] font-mono text-muted-foreground">
                [{lng.toFixed(4)}, {lat.toFixed(4)}]
              </span>
            </div>

            <PinpointMapPicker
              initialLat={lat}
              initialLng={lng}
              onLocationSelect={handleLocationSelect}
            />
          </div>

          {/* Real-time MMDA Detection Card */}
          <div className="p-3 rounded-lg border border-border/80 bg-muted/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1.5">
                <Building2Icon className="size-3.5 text-primary" />
                Automated Jurisdiction Cross-Reference
              </span>
              {detecting ? (
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Loader2Icon className="size-3 animate-spin" />
                  Checking zone...
                </span>
              ) : detectedZone?.assembly ? (
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
                  <CheckCircle2Icon className="size-2.5 mr-1" />
                  Matched
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px]">
                  <AlertCircleIcon className="size-2.5 mr-1" />
                  No MMDA boundary
                </Badge>
              )}
            </div>

            {detectedZone?.assembly ? (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground text-[10px] block">Detected MMDA:</span>
                  <span className="font-medium text-foreground">{detectedZone.assembly.name} ({detectedZone.assembly.code})</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block">Detected Region:</span>
                  <span className="font-medium text-foreground">{detectedZone.region?.name || '—'}</span>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-muted-foreground">
                Coordinates are captured. If an MMDA boundary is registered for this location in Shared Services, it will automatically link.
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={saving}
              className="gap-1.5"
            >
              {saving ? (
                <>
                  <Loader2Icon className="size-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Profile Updates'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export const UpdateProfileDialog = AddressLocationDialog
