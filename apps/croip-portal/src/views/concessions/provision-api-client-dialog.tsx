'use client'

import { useState } from 'react'

import { KeyRoundIcon, CopyIcon, ShieldAlertIcon, CheckIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface ProvisionedCredentials {
  id: string
  concessionId: string
  clientId: string
  clientSecret: string
  status: string
  expiresAt: string
}

interface ProvisionApiClientDialogProps {
  concessionId: string
  onProvisioned?: (credentials: ProvisionedCredentials) => void

  /** Render as a plain button inline instead of the default outlined one. */
  buttonLabel?: string
  buttonVariant?: 'default' | 'outline' | 'secondary'
}

/**
 * Button + one-time secret reveal dialog for provisioning a concession's API client.
 *
 * The governance service returns `clientSecret` in plaintext exactly once — it is never
 * stored server-side and cannot be retrieved again. The reveal dialog therefore requires
 * the user to explicitly confirm they copied it before it can be closed, mirroring how
 * Stripe/AWS handle one-time credential reveal.
 */
export function ProvisionApiClientDialog({
  concessionId,
  onProvisioned,
  buttonLabel = 'Provision New Client',
  buttonVariant = 'default'
}: ProvisionApiClientDialogProps) {
  const [provisioning, setProvisioning] = useState(false)
  const [revealOpen, setRevealOpen] = useState(false)
  const [credentials, setCredentials] = useState<ProvisionedCredentials | null>(null)
  const [confirmedCopied, setConfirmedCopied] = useState(false)

  const handleProvision = async () => {
    setProvisioning(true)

    try {
      const res = await fetch(`/api/concessions/${concessionId}/api-clients`, { method: 'POST' })
      const data = await res.json()

      if (data.success) {
        const creds: ProvisionedCredentials = data.data

        setCredentials(creds)
        setConfirmedCopied(false)
        setRevealOpen(true)

        toast.success('API client provisioned')
        onProvisioned?.(creds)
      } else {
        toast.error(data.error || 'Failed to provision API client')
      }
    } catch {
      toast.error('Network error provisioning API client')
    } finally {
      setProvisioning(false)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  return (
    <>
      <Button
        type="button"
        variant={buttonVariant}
        size="sm"
        onClick={handleProvision}
        disabled={provisioning}
        className="text-xs"
      >
        {provisioning ? <Spinner className="size-3 mr-1.5" /> : <KeyRoundIcon className="size-3.5 mr-1.5" />}
        {buttonLabel}
      </Button>

      <Dialog
        open={revealOpen}
        onOpenChange={open => {
          // Block dismissal until the operator explicitly confirms the secret was copied.
          if (!open && !confirmedCopied) return
          setRevealOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-lg" showCloseButton={confirmedCopied}>
          <DialogHeader>
            <DialogTitle className="text-base font-semibold flex items-center gap-2">
              <KeyRoundIcon className="size-4 text-primary" />
              API Client Provisioned
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Machine-to-machine credentials for this concessionaire&apos;s backend integration.
            </DialogDescription>
          </DialogHeader>

          <Alert variant="destructive" className="my-1">
            <ShieldAlertIcon />
            <AlertTitle className="text-xs font-semibold">Copy this secret now — you won&apos;t see it again</AlertTitle>
            <AlertDescription className="text-[11px]">
              The client secret is shown here exactly once and is never stored in retrievable form.
              If it is lost, the only recourse is to provision a brand new client.
            </AlertDescription>
          </Alert>

          <div className="grid gap-3.5 py-1 text-xs">
            <div className="grid gap-1.5">
              <Label className="text-xs font-medium">Client ID</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-md border bg-muted/40 px-3 py-2 font-mono text-[11px] break-all">
                  {credentials?.clientId}
                </code>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8 shrink-0"
                  onClick={() => credentials && copyToClipboard(credentials.clientId, 'Client ID')}
                  title="Copy Client ID"
                >
                  <CopyIcon className="size-3.5" />
                </Button>
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs font-medium">Client Secret</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 font-mono text-[11px] break-all">
                  {credentials?.clientSecret}
                </code>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8 shrink-0"
                  onClick={() => credentials && copyToClipboard(credentials.clientSecret, 'Client secret')}
                  title="Copy Client Secret"
                >
                  <CopyIcon className="size-3.5" />
                </Button>
              </div>
            </div>

            {credentials?.expiresAt && (
              <p className="text-[11px] text-muted-foreground">
                Expires {new Date(credentials.expiresAt).toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            )}

            <label className="flex items-start gap-2.5 rounded-md border bg-muted/20 p-3 cursor-pointer">
              <Checkbox
                checked={confirmedCopied}
                onCheckedChange={checked => setConfirmedCopied(checked === true)}
              />
              <span className="text-[11px] text-foreground">
                I have copied this client secret somewhere secure. I understand it cannot be retrieved again.
              </span>
            </label>
          </div>

          <DialogFooter>
            <Button
              size="sm"
              className="text-xs"
              disabled={!confirmedCopied}
              onClick={() => setRevealOpen(false)}
            >
              <CheckIcon className="size-3.5 mr-1.5" />
              Done — Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
