# Project Direction (Reference)

This document records the shift in product direction for DreamRoute.

## Before (what we tried to build)
- Content-heavy platform: admin CMS (17 pages), social/video studio, content calendar, prompts/assets management
- Counselling predictor + simulator with fabricated/estimated data + unsourced probability
- Exam targets database (rank/score, prone to staleness)
- Workplace content
- Open Gemini content-generation proxy
- Heavy ops/marketing tooling

Complexity: ~multi-product (CMS + edtech + content marketing).

## Now (what we want to build)
Core: Career Assessment & Recommendation Platform (deterministic, explainable).

Keep:
- Knowledge base: data/education/index.ts, data/careers/index.ts
- Core surface: careers, education, scholarships, saved careers, auth
- Blog: retained pending traffic/content strategy decision (secure later if kept)

Remove (done): CMS/admin, counselling/exams/workplace, open proxy, unused models/components.

## MVP focus
Deterministic, explainable assessment (not LLM judge). Avoid O*NET CC-BY-ND adaptation. Map to careers/skills, explainable rationale. Track outcomes later.

See /tmp/original_vs_current.md and /tmp/removed_content.md for full details.
