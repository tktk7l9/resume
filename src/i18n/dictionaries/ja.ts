const dictionary = {
  meta: {
    title: "齋藤拓也のresume",
    description:
      "フロントエンドエンジニア 齋藤拓也の職務経歴書。Next.js・React・TypeScriptを中心としたWebアプリ開発の経歴とスキルを掲載。",
    headline: "フロントエンドエンジニア（業務委託）",
  },
  nav: {
    about: "自己紹介",
    timeline: "経歴",
    projects: "個人開発",
    skills: "スキル",
    contact: "連絡先",
    links: "リンク",
  },
  sections: {
    about: "自己紹介",
    timeline: "経歴",
    projects: "個人開発",
    skills: "スキル",
  },
  timeline: {
    responsibilities: "担当範囲",
    achievements: "成果",
    present: "現在",
    yearLabel: "年",
    monthLabel: "ヶ月",
  },
  header: {
    switchLanguage: "English",
    switchLanguageAria: "Switch to English",
  },
  footer: {
    copyright: "© {year} {name}",
  },
  contact: {
    pageTitle: "お問い合わせ",
    metaTitle: "お問い合わせ | 齋藤拓也のresume",
    metaDescription:
      "齋藤拓也へのお問い合わせフォーム。お仕事のご依頼・ご相談はこちらから。",
    description:
      "お仕事のご依頼やご相談など、お気軽にメッセージをお送りください。通常2〜3営業日以内にご返信いたします。",
    backToResume: "経歴書に戻る",
    form: {
      name: "お名前",
      namePlaceholder: "山田 太郎",
      email: "メールアドレス",
      emailPlaceholder: "you@example.com",
      subject: "件名",
      subjectPlaceholder: "お仕事のご相談",
      message: "メッセージ",
      messagePlaceholder: "ご要件やご質問など、お気軽にお書きください。",
      required: "必須",
      submit: "送信する",
      submitting: "送信中…",
    },
    errors: {
      name: "お名前を入力してください。",
      email: "有効なメールアドレスを入力してください。",
      subject: "件名を入力してください。",
      message: "メッセージを10文字以上で入力してください。",
      server: "送信中にエラーが発生しました。時間をおいて再度お試しください。",
      config:
        "メール送信機能が未設定のため、現在お問い合わせを受け付けられません。お手数ですが直接メールでご連絡ください。",
      rate: "短時間に多くの送信がありました。しばらく時間をおいて再度お試しください。",
    },
    success: {
      title: "送信ありがとうございます",
      message:
        "メッセージを受け付けました。内容を確認のうえ、追ってご返信いたします。",
      sendAnother: "もう一度送信する",
    },
  },
} as const;

export default dictionary;
export type Dictionary = typeof dictionary;
