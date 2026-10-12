# CROIP — Approach 2: Meeting Notes & Decisions

**Topic:** Approach 2 — Standards-based integration with CROIP as the control point
**Date:** 9 October 2026
**Status:** Working decisions (pending government business rules)

---

## 1. Summary

Under Approach 2, CROIP publishes the standards and APIs. Concessionaires keep running their own operations and systems. **The payment platform sits on CROIP.** Every payment is made through CROIP and is **acknowledged, receipted and verified** by CROIP.

Concessionaires get to run things their own way. They never handle the money: they issue bills, and ratepayers pay those bills through CROIP.

> **Guiding principle:** Concessionaires are independent, but only within guardrails they cannot step outside.

---

## 2. Decisions

### 2.1 Standards-based integration

| # | Decision |
|---|---|
| D1 | CROIP publishes open **APIs and data standards** for property, billing and payment data. |
| D2 | Any concessionaire that conforms to the standards can connect, **whatever system it uses**. CROIP receives the same data set from everyone. |
| D3 | Concessions follow **district assemblies**. Concessionaires can be **onboarded and offboarded** at any time through CROIP's concessionaire management, and a replacement connects to the same published standards. |

### 2.2 Concessionaire autonomy

| # | Decision |
|---|---|
| D4 | Concessionaires keep **their own software** for property records, valuation, billing, field operations and district-specific needs. Payment collection is not one of them: it runs through CROIP. |
| D5 | Existing concessionaire systems (3–4 players have already built them) are **not replaced** in the early stages. They integrate with CROIP. |
| D6 | **Bill calculation sits with the concessionaire, and CROIP verifies it.** The concessionaire calculates the bill in its own system and submits it to CROIP in the published standard format. |
| D6a | **CROIP verifies the rate card.** Each municipality's rate card must be submitted to CROIP and verified before it is used. |
| D6b | **A bill cannot be paid until the rate card it uses is verified by CROIP.** Bills built on an unverified rate card stay unpayable and do not appear as payable in the ratepayer app. |
| D6c | CROIP checks every submitted bill against the verified rate card version it cites. A bill that doesn't match is rejected back to the concessionaire. |
| D7 | Concessionaires remain responsible for property verification, assessment, field agents and walk-in property registration for ratepayers. |

### 2.3 Unified ratepayer app

| # | Decision |
|---|---|
| D8 | There is **one national ratepayer app**, not a separate app per concessionaire. |
| D9 | The app works in every district, whichever concessionaire manages it, because all data follows the same standard. |

### 2.4 Payments: the payment platform sits on CROIP

> **Why (Minister's direction, given after the meeting):** The Minister wants CROIP to handle payments and disbursement. His concern is that municipalities have misused funds when collections sit in their own bank accounts. This replaces the meeting's earlier idea of letting each concessionaire run its own gateway.

| # | Decision |
|---|---|
| D10 | **The payment platform sits on CROIP, not the concessionaire.** CROIP connects to the partner bank's payment gateway (MoMo, cards, bank). CROIP is not a fintech: the bank processes the payment, and CROIP starts the payment and stores the gateway's response. |
| D11 | Concessionaires **do not run their own payment gateways** for property rates. Their agents' cashless assisted payments also go through CROIP's payment APIs. |
| D12 | The **gateway callback goes to CROIP**. CROIP then confirms the payment to the concessionaire in real time. This is the start of reconciliation. |
| D13 | **Acknowledgement of payment comes from CROIP.** CROIP sends the receipt by app, SMS and email. |
| D14 | Receipts carry a **QR code that is verified against CROIP**. |
| D15 | CROIP handles **central messaging and notifications**. |

**Why this works as a safeguard:** Every payment passes through CROIP's platform, so no collection can bypass it. The money never touches a concessionaire's account, and CROIP holds the full payment record from the moment payment starts.

### 2.5 Revenue split and disbursement

| # | Decision |
|---|---|
| D16 | **CROIP handles disbursement.** Collections are paid out to recipients by CROIP's instruction to the partner bank, not by municipalities or concessionaires. |
| D17 | **Revenue split percentages are a government business decision.** CROIP applies the split rules **at the point of payment confirmation**. |
| D18 | Collections **never sit in municipal (assembly) or concessionaire bank accounts** before CROIP's split and disbursement. This is the Minister's direction, given past misuse of funds. |
| D19 | Disbursement is expected to run **every 24 hours**, through the partner bank's reconciliation and disbursement process. |

**Disbursement model** (CROIP handles disbursement under both options)

| Option A — Central pool (Minister's preference) | Option B — Split at payment |
|---|---|
| All collections go into a CROIP-controlled central account first. | CROIP tells the bank to split each payment as it is confirmed. |
| CROIP pays out shares on a set schedule (daily). | Each share goes straight to its destination account. |
| Matches the Minister's current proposal. | Money reaches recipients faster. Needs bank support for split settlement. |

**Example (illustrative):** A ratepayer pays a GH₵200 bill.

| Share | % | Amount | Destination |
|---|---|---|---|
| Central pool (government / development) | 50% | GH₵100 | Central account |
| Municipality / concessionaire operations | x% | — | Per government rules |
| Data providers (e.g. NIA, health services) | y% | — | Per government rules |

*Percentages are placeholders until government issues the business rules.*

### 2.6 Governance

| # | Decision |
|---|---|
| D20 | CROIP is built **for government oversight** and is **operated by a government team**. The consortium builds it and hands it over. |
| D21 | Building CROIP (paid by government) is **separate** from any consortium member acting as a concessionaire for specific municipalities. |
| D22 | CROIP has **its own dedicated government team**, independent of every concessionaire and of the consortium, to run the platform and oversee concessionaires. |
| D23 | CROIP has **its own role-based access control (RBAC)** for internal users, from senior oversight officials to system administrators. Access is limited by role and, where relevant, by region or municipality. Every action is recorded in an audit log. |

**CROIP internal roles (proposed)**

| Role | Who | Access |
|---|---|---|
| Executive / Oversight | Minister, senior Ministry officials, CROIP leadership | Read-only national dashboards: revenue billed vs collected, compliance and concessionaire KPIs. Approves policy changes (split rules, disbursement model). |
| Super Admin | CROIP platform lead | Full system configuration. Manages CROIP user accounts and roles. Cannot edit financial records. |
| Concessionaire Manager | CROIP partnerships team | Onboards and offboards concessionaires. Assigns municipalities. Manages API credentials. |
| Rate Card Verifier | CROIP compliance team | Reviews and verifies municipal rate cards. Approves or rejects bills that fail checks. |
| Finance & Reconciliation Officer | CROIP finance team | Reviews payment callbacks and reconciliation. Prepares daily disbursement instructions. |
| Disputes / Support Officer | CROIP support team | Handles ratepayer complaints, missing receipts and QR verification issues. |
| Auditor | Internal audit, Auditor-General | Read-only access to all records and audit logs. |
| System Administrator | CROIP technical team | Infrastructure, integrations, monitoring and messaging. No access to change financial data. |

*Key controls:* separation of duties (for example, the person who verifies a rate card is not the person who approves disbursements), two-person approval for split-rule and disbursement changes, and MFA for every internal role.

---

## 3. Payment flow

```mermaid
sequenceDiagram
    participant R as Ratepayer (Unified App)
    participant C as Concessionaire System
    participant X as CROIP (Payment Platform)
    participant B as Partner Bank Gateway

    C->>X: Submit municipality rate card
    X->>X: Verify rate card (bills not payable until verified)
    C->>X: Submit bill (calculated by concessionaire, standard format)
    X->>X: Check bill against verified rate card version
    X->>R: Verified bill visible and payable in unified app
    R->>X: Pay bill (MoMo / card / bank)
    X->>B: Start payment through bank API
    B-->>X: Payment callback
    X->>X: Store gateway response and apply revenue split rules
    X->>R: Receipt with QR code (app / SMS / email)
    X->>C: Real-time payment confirmation
    X->>B: Daily reconciliation and disbursement instruction
    B-->>X: Settlement confirmation
```

---

## 4. What changes from the current Approach 2 page

| Current page | Updated position |
|---|---|
| CROIP routes payments through one partner bank | **No change.** The payment platform sits on CROIP and connects to the partner bank's gateway. |
| CROIP calculates bills from the rate card | **Concessionaire calculates bills**. CROIP verifies the rate card and checks each bill against it. Bills can't be paid until the rate card is verified. |
| "CROIP reconciles and notifies" | CROIP issues the receipt and QR code, and confirms each payment to the concessionaire in real time. |
| No revenue split or disbursement section | Split rules applied at confirmation, daily disbursement, model chosen by government |
| Concessionaires' own systems not mentioned | Concessionaires keep their own systems and connect through published standards |

---

## 5. Open items

| # | Item | Owner |
|---|---|---|
| O1 | Government to set the revenue split percentages and recipients | Government / Ministry |
| O2 | Government to confirm Option A (central pool, the Minister's preference) or Option B (split at payment). CROIP handles disbursement either way. | Government / Ministry |
| O3 | Confirm daily (24-hour) disbursement frequency with the partner bank | Consortium + Bank |
| O4 | Define the rate card verification process: who approves at CROIP, turnaround time, and how rate card changes are versioned | Consortium + Government |
| O5 | ~~Confirm who will operate CROIP~~ **Closed:** a government team operates CROIP (D20). Still to agree: the handover and training plan, and any consortium support period after handover. | Government + Consortium |
| O6 | Put the Approach 2 diagram on its own slide, update it with these decisions, and review | Team |
