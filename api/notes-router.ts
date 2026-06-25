import { z } from "zod";
import { eq, and, desc, inArray } from "drizzle-orm";
import { createRouter, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { notes } from "../db/schema";

const STARTER_NOTES = [
  {
    "title": "About Clarion",
    "content": "# About Clarion Education & Skill Pvt. Ltd.\n\nClarion Education & Skill Pvt. Ltd. is a purpose-driven social enterprise that operates at the intersection of education, communication, and social innovation. Founded with the belief that access to quality learning tools and credible information should not be constrained by geography or income, Clarion has consistently worked to design low-cost, high-impact educational and communication solutions.\n\n## Our Core Philosophy\n\nAt Clarion, we believe that:\n\n- Education extends beyond classrooms and textbooks.\n- Every everyday object can become a learning medium.\n- Communication, when designed responsibly, can shift behaviour at scale.\n\nThis philosophy has guided our work across education systems, public health campaigns, livelihood missions, cultural documentation, and strategic communication initiatives.\n\nSee also: [[The 5 Rupee Notebook Initiative]], [[IEC & Behaviour Change]]",
    "tags": [
      "About",
      "Philosophy",
      "Social Enterprise"
    ]
  },
  {
    "title": "The 5 Rupee Notebook Initiative",
    "content": "# The ₹5 Notebook Initiative\n\nOne of Clarion's most widely recognised interventions has been the development of ultra-affordable school notebooks priced at ₹5, at a time when comparable notebooks in the market cost ₹25-₹30.\n\n## What made this initiative unique:\n\n- Redesign of the entire notebook value chain - from paper quality to printing scale.\n- Integration of IEC and social messaging on notebook covers and selected inner pages.\n- Use of notebooks as a learning and awareness medium beyond school hours, engaging parents and guardians.\n- Leveraging advertising by government departments, CSR programmes, and NGOs to subsidise production costs.\n\n## Scale & Impact\n\n- Hundreds of thousands of notebooks distributed across Bihar, Jharkhand, and West Bengal.\n- Adoption by multiple district administrations and government departments.\n- Recognition as a case study in sustainability and social entrepreneurship.\n\nSee also: [[About Clarion]], [[IEC & Behaviour Change]]",
    "tags": [
      "Education",
      "Notebooks",
      "Impact"
    ]
  },
  {
    "title": "IEC & Behaviour Change",
    "content": "# IEC & Behaviour Change Communication (BCC)\n\nClarion has developed a strong body of work in designing **IEC (Information, Education and Communication)** material that is contextual, visual, and behaviour-focused, especially for low-literacy and rural audiences.\n\n## Key formats developed:\n\n- IEC-infused notebooks\n- Posters, charts, and visual advisories\n- Comic books and illustrated narratives\n- Thematic exercise books and learning aids\n\n## Thematic focus areas include:\n\n- Public health (COVID-19, hygiene, vaccination)\n- Child protection and safety\n- Nutrition and maternal health\n- Water, sanitation, and environmental conservation\n- Disaster preparedness and climate resilience\n\nSee also: [[MASK-MAN Comic]], [[Cultural Documentation]]",
    "tags": [
      "IEC",
      "BCC",
      "Public Health"
    ]
  },
  {
    "title": "MASK-MAN Comic",
    "content": "# Comic-Based Learning: MASK-MAN\n\nDuring the COVID-19 pandemic, Clarion conceptualised and developed **MASK-MAN**, a pandemic-sensitive comic book aimed at children and adolescents.\n\n## Key design strengths:\n\n- Storytelling through fictional characters, humour, and peer-to-peer interaction.\n- Clear differentiation between facts, myths, and taboos.\n- Step-by-step narrative flow: awareness → conflict → resolution → moral learning.\n- Inclusion of interactive elements such as puzzles, crosswords, and QR codes linking to authentic advisories.\n\n## Impact & Learning:\n\n- Enabled risk communication without fear-mongering.\n- Improved engagement and recall among young readers.\n- Demonstrated the effectiveness of edutainment as a public health tool.\n\nSee also: [[IEC & Behaviour Change]], [[About Clarion]]",
    "tags": [
      "Comic",
      "Edutainment",
      "COVID-19"
    ]
  },
  {
    "title": "Cultural Documentation",
    "content": "# Cultural & Regional Documentation\n\nClarion has worked on thematic and culturally rooted educational material, using regional icons and narratives to strengthen identity and engagement.\n\n## Notable examples include:\n\n- Jannayak Birsa Munda themed notebooks and IEC material.\n- Region-specific notebooks and visual stories reflecting local history, livelihoods, and aspirations.\n\nThese interventions reinforce learning while simultaneously celebrating indigenous knowledge and regional pride.\n\nSee also: [[About Clarion]], [[Strategic Communication]]",
    "tags": [
      "Culture",
      "Regional Pride",
      "Documentation"
    ]
  },
  {
    "title": "Strategic Communication",
    "content": "# Strategic Communication, Branding & Perception Management\n\nClarion has supported institutions and initiatives through strategic communication and branding, particularly in the development and public sector space.\n\n## Key assignments include:\n\n- Branding and PR support for Pan IIT Alumni initiatives in Jharkhand.\n- Social media management, stakeholder communication, and visibility enhancement.\n- Perception management and narrative building for government-linked initiatives.\n\nClarion also undertakes Audio-Visual Documentation, capturing processes, milestones, and community-institution collaboration through audio-visual storytelling (e.g., NABARD FPOs in Jharkhand).\n\nSee also: [[About Clarion]], [[Cultural Documentation]]",
    "tags": [
      "Branding",
      "PR",
      "Audio-Visual"
    ]
  }
];

export const notesRouter = createRouter({
  list: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    let userNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, ctx.user.id))
      .orderBy(desc(notes.updatedAt));

    // Auto-seed starter notes for new users
    if (userNotes.length === 0) {
      for (const starter of STARTER_NOTES) {
        await db.insert(notes).values({
          userId: ctx.user.id,
          title: starter.title,
          content: starter.content,
          tags: starter.tags,
        });
      }
      userNotes = await db
        .select()
        .from(notes)
        .where(eq(notes.userId, ctx.user.id))
        .orderBy(desc(notes.updatedAt));
    }

    return userNotes;
  }),

  get: authedQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const [note] = await db
        .select()
        .from(notes)
        .where(and(eq(notes.id, input.id), eq(notes.userId, ctx.user.id)));
      return note ?? null;
    }),

  create: authedQuery
    .input(
      z.object({
        title: z.string().min(1).max(500),
        content: z.string(),
        tags: z.array(z.string()).optional(),
        source: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const [note] = await db.insert(notes).values({
        userId: ctx.user.id,
        title: input.title,
        content: input.content,
        tags: input.tags ?? [],
        source: input.source ?? null,
      });
      return { id: Number(note.insertId) };
    }),

  update: authedQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).max(500).optional(),
        content: z.string().optional(),
        tags: z.array(z.string()).optional(),
        source: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const { id, ...updates } = input;
      await db
        .update(notes)
        .set(updates)
        .where(and(eq(notes.id, id), eq(notes.userId, ctx.user.id)));
      return { success: true };
    }),

  delete: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db
        .delete(notes)
        .where(and(eq(notes.id, input.id), eq(notes.userId, ctx.user.id)));
      return { success: true };
    }),

  deleteMany: authedQuery
    .input(z.object({ ids: z.array(z.number()).min(1).max(100) }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db
        .delete(notes)
        .where(
          and(
            inArray(notes.id, input.ids),
            eq(notes.userId, ctx.user.id)
          )
        );
      return { success: true };
    }),

});
