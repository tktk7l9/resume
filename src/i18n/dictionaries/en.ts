const dictionary = {
  meta: {
    title: "Takuya Saito — Resume",
    description:
      "Resume of Takuya Saito, a frontend engineer specializing in Next.js, React and TypeScript.",
    headline: "Frontend Engineer (Contract)",
  },
  nav: {
    about: "About",
    timeline: "Experience",
    projects: "Side Projects",
    skills: "Skills",
    contact: "Contact",
    links: "Links",
  },
  sections: {
    about: "About",
    timeline: "Experience",
    projects: "Side Projects",
    skills: "Skills",
  },
  timeline: {
    responsibilities: "Responsibilities",
    achievements: "Achievements",
    present: "Present",
    yearLabel: "y",
    monthLabel: "mo",
  },
  header: {
    switchLanguage: "日本語",
    switchLanguageAria: "日本語に切り替え",
  },
  footer: {
    copyright: "© {year} {name}",
  },
  contact: {
    pageTitle: "Contact",
    metaTitle: "Contact | Takuya Saito — Resume",
    metaDescription:
      "Contact form for Takuya Saito. Feel free to reach out for project inquiries or collaboration.",
    description:
      "Feel free to send a message for project inquiries, collaboration, or any questions. I usually reply within 2–3 business days.",
    backToResume: "Back to resume",
    form: {
      name: "Name",
      namePlaceholder: "Jane Doe",
      email: "Email",
      emailPlaceholder: "you@example.com",
      subject: "Subject",
      subjectPlaceholder: "Project inquiry",
      message: "Message",
      messagePlaceholder: "Tell me about your project, question, or idea.",
      required: "required",
      submit: "Send message",
      submitting: "Sending…",
    },
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      subject: "Please enter a subject.",
      message: "Please enter a message of at least 10 characters.",
      server: "Something went wrong while sending. Please try again later.",
      config:
        "The contact form is not configured yet. Please email me directly for now.",
      rate: "Too many messages were sent in a short time. Please wait a while and try again.",
    },
    success: {
      title: "Thank you for your message",
      message:
        "Your message has been received. I'll review it and get back to you soon.",
      sendAnother: "Send another message",
    },
  },
} as const;

export default dictionary;
