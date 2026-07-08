import type { QrType } from "@/lib/qr/types";

export const LANGUAGES = ["tr", "en"] as const;
export type Language = (typeof LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<Language, string> = {
  tr: "TR",
  en: "EN",
};

type Translation = {
  header: {
    home: string;
    types: string;
    login: string;
    history: string;
    logout: string;
  };
  home: {
    title: string;
    subtitle: string;
    cta: string;
  };
  auth: {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    sending: string;
    checkEmail: string;
    error: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    empty: string;
    delete: string;
    createdAt: string;
    backToGenerate: string;
  };
  save: {
    button: string;
    saving: string;
    saved: string;
    loginToSave: string;
  };
  generateIndex: {
    title: string;
    subtitle: string;
  };
  generateType: {
    heading: (typeLabel: string) => string;
  };
  qrTypeLabels: Record<QrType, string>;
  preview: {
    label: string;
    placeholder: string;
    downloadPng: string;
    downloadSvg: string;
  };
  forms: {
    url: { label: string; placeholder: string; error: string };
    text: { label: string; placeholder: string; error: string };
    vcard: {
      firstName: string;
      firstNameError: string;
      lastName: string;
      phone: string;
      email: string;
      emailError: string;
      company: string;
    };
    wifi: {
      ssid: string;
      ssidError: string;
      password: string;
      security: string;
      wpa: string;
      wep: string;
      nopass: string;
      hidden: string;
    };
    email: {
      to: string;
      toError: string;
      subject: string;
      body: string;
    };
    sms: {
      phone: string;
      phoneError: string;
      message: string;
    };
    tel: {
      phone: string;
      phoneError: string;
    };
    geo: {
      latitude: string;
      latitudeError: string;
      longitude: string;
      longitudeError: string;
    };
  };
};

export const translations: Record<Language, Translation> = {
  tr: {
    header: {
      home: "Ana Sayfa",
      types: "QR Türleri",
      login: "Giriş Yap",
      history: "Geçmişim",
      logout: "Çıkış",
    },
    home: {
      title: "QR Kod Üretici",
      subtitle:
        "Link, WiFi, kişi kartı ve daha fazlası için saniyeler içinde özelleştirilebilir QR kod oluştur.",
      cta: "QR Kod Oluştur",
    },
    auth: {
      title: "Giriş Yap",
      subtitle: "E-postana giriş bağlantısı gönderelim, şifre gerekmez.",
      emailLabel: "E-posta",
      emailPlaceholder: "sen@ornek.com",
      submit: "Giriş bağlantısı gönder",
      sending: "Gönderiliyor...",
      checkEmail: "E-postana bir giriş bağlantısı gönderdik. Gelen kutunu kontrol et.",
      error: "Giriş sırasında bir hata oluştu, tekrar dene.",
    },
    dashboard: {
      title: "Geçmişim",
      subtitle: "Kaydettiğin QR kodları burada bulabilirsin.",
      empty: "Henüz kaydedilmiş bir QR kodun yok.",
      delete: "Sil",
      createdAt: "Oluşturulma",
      backToGenerate: "QR Kod Oluştur",
    },
    save: {
      button: "Geçmişe Kaydet",
      saving: "Kaydediliyor...",
      saved: "Kaydedildi",
      loginToSave: "Kaydetmek için giriş yap",
    },
    generateIndex: {
      title: "Ne tür bir QR kod oluşturmak istersin?",
      subtitle: "Bir tür seç, formu doldur, QR kodun anında oluşsun.",
    },
    generateType: {
      heading: (typeLabel) => `${typeLabel} QR Kodu Oluştur`,
    },
    qrTypeLabels: {
      url: "Link",
      text: "Metin",
      vcard: "Kişi (vCard)",
      wifi: "WiFi",
      email: "E-posta",
      sms: "SMS",
      tel: "Telefon",
      geo: "Konum",
    },
    preview: {
      label: "Önizleme",
      placeholder: "Formu doldurunca QR kodun burada görünecek",
      downloadPng: "PNG indir",
      downloadSvg: "SVG indir",
    },
    forms: {
      url: { label: "URL", placeholder: "https://ornek.com", error: "Geçerli bir URL girin (https:// ile başlamalı)" },
      text: { label: "Metin", placeholder: "Metninizi girin", error: "Metin boş olamaz" },
      vcard: {
        firstName: "Ad",
        firstNameError: "Ad gerekli",
        lastName: "Soyad",
        phone: "Telefon",
        email: "E-posta",
        emailError: "Geçerli bir e-posta girin",
        company: "Şirket",
      },
      wifi: {
        ssid: "Ağ Adı (SSID)",
        ssidError: "Ağ adı (SSID) gerekli",
        password: "Şifre",
        security: "Güvenlik",
        wpa: "WPA/WPA2",
        wep: "WEP",
        nopass: "Şifresiz",
        hidden: "Gizli ağ",
      },
      email: {
        to: "Alıcı e-posta",
        toError: "Geçerli bir e-posta girin",
        subject: "Konu",
        body: "Mesaj",
      },
      sms: {
        phone: "Telefon numarası",
        phoneError: "Telefon numarası gerekli",
        message: "Mesaj",
      },
      tel: {
        phone: "Telefon numarası",
        phoneError: "Telefon numarası gerekli",
      },
      geo: {
        latitude: "Enlem",
        latitudeError: "Enlem gerekli",
        longitude: "Boylam",
        longitudeError: "Boylam gerekli",
      },
    },
  },
  en: {
    header: {
      home: "Home",
      types: "QR Types",
      login: "Log In",
      history: "History",
      logout: "Log Out",
    },
    home: {
      title: "QR Code Generator",
      subtitle:
        "Create customizable QR codes in seconds for links, WiFi, contact cards, and more.",
      cta: "Create a QR Code",
    },
    auth: {
      title: "Log In",
      subtitle: "We'll send a login link to your email, no password needed.",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      submit: "Send login link",
      sending: "Sending...",
      checkEmail: "We sent a login link to your email. Check your inbox.",
      error: "Something went wrong signing in, please try again.",
    },
    dashboard: {
      title: "History",
      subtitle: "Find the QR codes you've saved here.",
      empty: "You haven't saved any QR codes yet.",
      delete: "Delete",
      createdAt: "Created",
      backToGenerate: "Create a QR Code",
    },
    save: {
      button: "Save to History",
      saving: "Saving...",
      saved: "Saved",
      loginToSave: "Log in to save",
    },
    generateIndex: {
      title: "What kind of QR code do you want to create?",
      subtitle: "Pick a type, fill in the form, and your QR code appears instantly.",
    },
    generateType: {
      heading: (typeLabel) => `Create ${typeLabel} QR Code`,
    },
    qrTypeLabels: {
      url: "Link",
      text: "Text",
      vcard: "Contact (vCard)",
      wifi: "WiFi",
      email: "Email",
      sms: "SMS",
      tel: "Phone",
      geo: "Location",
    },
    preview: {
      label: "Preview",
      placeholder: "Your QR code will appear here once you fill in the form",
      downloadPng: "Download PNG",
      downloadSvg: "Download SVG",
    },
    forms: {
      url: { label: "URL", placeholder: "https://example.com", error: "Enter a valid URL (must start with https://)" },
      text: { label: "Text", placeholder: "Enter your text", error: "Text cannot be empty" },
      vcard: {
        firstName: "First name",
        firstNameError: "First name is required",
        lastName: "Last name",
        phone: "Phone",
        email: "Email",
        emailError: "Enter a valid email",
        company: "Company",
      },
      wifi: {
        ssid: "Network name (SSID)",
        ssidError: "Network name (SSID) is required",
        password: "Password",
        security: "Security",
        wpa: "WPA/WPA2",
        wep: "WEP",
        nopass: "No password",
        hidden: "Hidden network",
      },
      email: {
        to: "Recipient email",
        toError: "Enter a valid email",
        subject: "Subject",
        body: "Message",
      },
      sms: {
        phone: "Phone number",
        phoneError: "Phone number is required",
        message: "Message",
      },
      tel: {
        phone: "Phone number",
        phoneError: "Phone number is required",
      },
      geo: {
        latitude: "Latitude",
        latitudeError: "Latitude is required",
        longitude: "Longitude",
        longitudeError: "Longitude is required",
      },
    },
  },
};
