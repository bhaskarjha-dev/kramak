# Human Tasks

> **⚠️ This template has moved.** In Kramak v1.1, the canonical human tasks template is located at:
>
> [.kramak/templates/HUMAN-TASKS.template.md](../.kramak/templates/HUMAN-TASKS.template.md)
>
> **Protocol:** Tracks human action items requiring developer or operator intervention.  
> **TTL Policy:** Default TTL for blocking tasks is **48h**; non-blocking tasks is **1 week**.  
> If TTL expires without resolution: auto-escalate (`phase: "escalated"`) or proceed with best judgment + documentation.

---

## Blocking (must resolve before pipeline continues)
- [ ] [TASK-001] Description of blocking task — blocking WI-XXX — TTL: 48h — created: [YYYY-MM-DD]

## Non-Blocking (can proceed, but track for follow-up)
- [ ] [TASK-002] Description of non-blocking task — affects WI-XXX (low priority) — TTL: 1w — created: [YYYY-MM-DD]

## Resolved
- [x] [TASK-000] Initial setup task — resolved on [YYYY-MM-DD]
