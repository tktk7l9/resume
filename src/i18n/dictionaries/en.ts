const dictionary = {
  meta: {
    title: "Takuya Saito — Resume",
    description:
      "Resume of Takuya Saito, a full-stack engineer working across Next.js, React and TypeScript, Go backends and Cloudflare / AWS infrastructure.",
    headline: "Full-stack Engineer (Contract)",
  },
  nav: {
    about: "About",
    timeline: "Experience",
    projects: "Side Projects",
    skills: "Skills",
    contact: "Contact",
    links: "Links",
    toc: "Contents",
    portfolio: "Personal apps portal",
    opensInNewTab: " (opens in a new tab)",
    skipToContent: "Skip to content",
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
    types: {
      work: "Work",
      education: "Education",
      project: "Project",
    },
  },
  header: {
    switchLanguage: "日本語",
    switchLanguageAria: "日本語に切り替え",
  },
  footer: {
    copyright: "© {year} {name}",
    backToTop: "Back to top",
  },
  closing: {
    title: "Thanks for reading this far",
    description:
      "For project inquiries or collaboration, feel free to reach out through the form. I usually reply within 2–3 business days.",
    cta: "Go to the contact form",
  },
  notFound: {
    title: "Page not found",
    description: "The URL may have changed or the page may have been removed.",
    backToResume: "Back to resume",
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
      messageHint: "at least 10 characters",
      submit: "Send message",
      submitting: "Sending…",
    },
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      subject: "Please enter a subject.",
      message: "Please enter a message of at least 10 characters.",
      server:
        "Something went wrong while sending. Your message is still here — please try again later, or email me directly at the address below.",
      config:
        "The contact form is not configured yet, so it cannot send right now. Your message is still here — please email me directly at the address below.",
      rate: "Too many messages were sent in a short time. Your message is still here — please wait a while and try again.",
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
