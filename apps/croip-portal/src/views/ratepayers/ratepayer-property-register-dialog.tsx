'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  Building2Icon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  AlertCircleIcon,
  Loader2Icon,
  MapPinIcon,
  FileTextIcon
} from 'lucide-react'

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

interface RatepayerPropertyRegisterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ratepayer: any
  onSuccess: (property: any) => void
}

export function RatepayerPropertyRegisterDialog({
  open,
  onOpenChange,
  ratepayer,
  onSuccess
}: RatepayerPropertyRegisterDialogProps) {
  const [propertyName, setPropertyName] = useState('')
  const [propertyType, setPropertyType] = useState('RESIDENTIAL')
  const [ownershipType, setOwnershipType] = useState('FREEHOLD')
  const [streetName, setStreetName] = useState(ratepayer?.address || '')
  const [houseNumber, setHouseNumber] = useState('')
  const [documentRef, setDocumentRef] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const completion = ratepayer?.completion
  const isKycVerified = completion?.hasVerifiedKyc ?? false
  const isProfileComplete = completion?.isProfileComplete ?? false
  const isEligible = isKycVerified && isProfileComplete

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isEligible) {
      toast.error('Cannot create property: Ratepayer KYC must be verified and profile must be complete.')
      return
    }

    if (!propertyName.trim()) {
      toast.error('Please enter a property name.')
      return
    }

    setSubmitting(true)
    try {
      // Use ratepayer coordinates or default Accra coords
      let coords = [-0.1870, 5.6037]
      if (ratepayer.locationGeo?.coordinates && Array.isArray(ratepayer.locationGeo.coordinates)) {
        coords = [
          Number(ratepayer.locationGeo.coordinates[0]),
          Number(ratepayer.locationGeo.coordinates[1])
        ]
      }

      // Generate a small polygon footprint around the ratepayer's pinpoint location
      const [lng, lat] = coords
      const d = 0.0003
      const polygonGeoJson = {
        type: 'Polygon',
        coordinates: [[
          [lng - d, lat - d],
          [lng + d, lat - d],
          [lng + d, lat + d],
          [lng - d, lat + d],
          [lng - d, lat - d]
        ]]
      }

      const payload = {
        ratepayerId: ratepayer.id,
        propertyName: propertyName.trim(),
        propertyType,
        ownershipType,
        streetName: streetName.trim() || ratepayer.address || 'Main Street',
        houseNumber: houseNumber.trim() || 'Plot 1',
        polygonGeoJson,
        documents: [
          {
            documentType: 'LAND_TITLE_CERTIFICATE',
            documentNumber: documentRef.trim() || `DOC-${Date.now()}`,
            fileUrl: 'https://croip.gov.gh/docs/sample-land-title.pdf'
          }
        ]
      }

      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (data.success && data.data) {
        toast.success(`Property "${data.data.code}" registered and linked to ratepayer!`)
        onSuccess(data.data)
        onOpenChange(false)
        setPropertyName('')
        setHouseNumber('')
      } else {
        toast.error(data.error || 'Failed to register property')
      }
    } catch (err) {
      console.error('Failed to create property:', err)
      toast.error('An unexpected error occurred while creating property.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Building2Icon className="size-4 text-primary" />
            Register Property for Ratepayer
          </DialogTitle>
          <DialogDescription className="text-xs">
            Link a new property to <strong>{ratepayer?.legalName || ratepayer?.code}</strong>.
          </DialogDescription>
        </DialogHeader>

        {/* KYC & Completion Gate Warning Banner */}
        {!isEligible ? (
          <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-300 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-xs">
              <ShieldAlertIcon className="size-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>Property Creation Restricted</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              In accordance with CROIP revenue governance, a ratepayer must complete their profile including <strong>KYC Verification</strong> before registering any properties.
            </p>
            <div className="pt-1 flex flex-wrap gap-1 text-[10px]">
              {!isKycVerified && (
                <Badge variant="outline" className="border-rose-400/40 text-rose-700 dark:text-rose-300">
                  KYC Verification Pending
                </Badge>
              )}
              {!isProfileComplete && (
                <Badge variant="outline" className="border-rose-400/40 text-rose-700 dark:text-rose-300">
                  Profile Incomplete ({completion?.completionPercentage ?? 50}%)
                </Badge>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground pt-1">
              Please approve KYC verification and complete the address/pinpoint location in the Bio tab before continuing.
            </p>
          </div>
        ) : (
          <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 flex items-center gap-2 text-xs">
            <ShieldCheckIcon className="size-4 text-emerald-600 shrink-0" />
            <span>Ratepayer is fully verified & eligible for property creation.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 py-1">
          <div className="space-y-1.5">
            <Label htmlFor="prop-name" className="text-xs font-medium">
              Property Name / Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="prop-name"
              placeholder="e.g. Mensah Family Residence"
              value={propertyName}
              onChange={e => setPropertyName(e.target.value)}
              className="text-xs h-9"
              disabled={!isEligible}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Property Type</Label>
              <select
                value={propertyType}
                onChange={e => setPropertyType(e.target.value)}
                className="w-full text-xs h-9 px-2 rounded-md border border-input bg-background"
                disabled={!isEligible}
              >
                <option value="RESIDENTIAL">Residential</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="MIXED_USE">Mixed Use</option>
                <option value="INDUSTRIAL">Industrial</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Ownership Type</Label>
              <select
                value={ownershipType}
                onChange={e => setOwnershipType(e.target.value)}
                className="w-full text-xs h-9 px-2 rounded-md border border-input bg-background"
                disabled={!isEligible}
              >
                <option value="FREEHOLD">Freehold</option>
                <option value="LEASEHOLD">Leasehold</option>
                <option value="CUSTOMARY">Customary</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Street Name</Label>
              <Input
                placeholder="e.g. Independence Ave"
                value={streetName}
                onChange={e => setStreetName(e.target.value)}
                className="text-xs h-9"
                disabled={!isEligible}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium">House / Plot No.</Label>
              <Input
                placeholder="e.g. House 14B"
                value={houseNumber}
                onChange={e => setHouseNumber(e.target.value)}
                className="text-xs h-9"
                disabled={!isEligible}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium flex items-center gap-1.5">
              <FileTextIcon className="size-3 text-muted-foreground" />
              Ownership Proof Document Number
            </Label>
            <Input
              placeholder="e.g. GHA-LTC-2026-9921"
              value={documentRef}
              onChange={e => setDocumentRef(e.target.value)}
              className="text-xs h-9"
              disabled={!isEligible}
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={submitting || !isEligible || !propertyName.trim()}
              className="gap-1.5"
            >
              {submitting ? (
                <>
                  <Loader2Icon className="size-3.5 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register Property'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
