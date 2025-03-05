import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
  dir: 'practicalTutorialsOnTheFrontEnd',
  link: '/practicalTutorialsOnTheFrontEnd',
  sidebar: "auto",
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [demoNote],
})
