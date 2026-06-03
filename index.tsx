import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MessageCircle,
  Send,
  Instagram,
  Zap,
  Sparkles,
  ShieldCheck,
  Clock,
  Copy,
  Check,
  Star,
  HeartHandshake,
  Settings,
  X,
} from "lucide-react";
import heroImage from "@/assets/hero-chat.jpg";

type ChannelKey = "whatsapp" | "telegram" | "instagram";
type ChannelConfig = { text: string; url: string };
type ButtonsConfig = Record<ChannelKey, ChannelConfig>;

const STORAGE_KEY = "messengerButtons";
const OWNER_PASSWORD = "admin"; // простой пароль для демо

const utm = (content: string) =>
  `utm_source=landing&utm_medium=button&utm_campaign=messenger&utm_content=${content}`;

const withUtm = (url: string, content: string) => {
  if (!url) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${utm(content)}`;
};

const DEFAULT_CONFIG: ButtonsConfig = {
  whatsapp: {
    text: "Написать в WhatsApp",
    url: "https://wa.me/77001234567?text=" + encodeURIComponent("Здравствуйте! Хочу узнать о услуге и ценах."),
  },
  telegram: {
    text: "Написать в Telegram",
    url: "https://t.me/your_channel",
  },
  instagram: {
    text: "Перейти в Instagram",
    url: "https://instagram.com/your_username",
  },
};

function loadConfig(): ButtonsConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      whatsapp: { ...DEFAULT_CONFIG.whatsapp, ...parsed.whatsapp },
      telegram: { ...DEFAULT_CONFIG.telegram, ...parsed.telegram },
      instagram: { ...DEFAULT_CONFIG.instagram, ...parsed.instagram },
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ответ за 5 минут в WhatsApp, Telegram и Instagram" },
      {
        name: "description",
        content:
          "Получите быструю консультацию в удобном мессенджере: WhatsApp, Telegram или Instagram. Личные рекомендации, без спама, ответ за 5–15 минут.",
      },
      { property: "og:title", content: "Ответ за 5 минут — в удобном мессенджере" },
      { property: "og:description", content: "Консультация и персональные офферы в WhatsApp, Telegram и Instagram." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

function MessengerButtons({
  config,
  size = "lg",
}: {
  config: ButtonsConfig;
  size?: "lg" | "md";
}) {
  const base = size === "lg" ? "h-14 px-6 text-base" : "h-11 px-4 text-sm";
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={withUtm(config.whatsapp.url, "whatsapp")}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} inline-flex items-center gap-2 rounded-full bg-[var(--color-whatsapp)] font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-xl`}
      >
        <MessageCircle className="size-5" />
        {config.whatsapp.text}
      </a>
      <a
        href={withUtm(config.telegram.url, "telegram")}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} inline-flex items-center gap-2 rounded-full bg-[var(--color-telegram)] font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-xl`}
      >
        <Send className="size-5" />
        {config.telegram.text}
      </a>
      <a
        href={withUtm(config.instagram.url, "instagram")}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} inline-flex items-center gap-2 rounded-full font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:-translate-y-0.5 hover:shadow-xl`}
        style={{
          backgroundImage:
            "linear-gradient(135deg, var(--color-instagram-from), var(--color-instagram-to))",
        }}
      >
        <Instagram className="size-5" />
        {config.instagram.text}
      </a>
    </div>
  );
}

function Landing() {
  const [config, setConfig] = useState<ButtonsConfig>(DEFAULT_CONFIG);
  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  const handleSave = (next: ButtonsConfig) => {
    setConfig(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    setEditorOpen(false);
  };

  const handleReset = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setConfig(DEFAULT_CONFIG);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-bold">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <HeartHandshake className="size-5" />
          </span>
          <span>ChatFirst</span>
        </a>
        <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
          <a href="#benefits" className="hover:text-foreground">Преимущества</a>
          <a href="#how" className="hover:text-foreground">Как это работает</a>
          <a href="#pricing" className="hover:text-foreground">Тарифы</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <a
          href={withUtm(config.whatsapp.url, "whatsapp_nav")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:inline-flex"
        >
          <MessageCircle className="size-4" />
          Связаться
        </a>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-10 size-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute right-0 top-40 size-96 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Zap className="size-3.5 text-primary" />
              Ответ за 5–15 минут
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
              Получите ответ за 5&nbsp;минут — в&nbsp;удобном мессенджере
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Задайте вопрос, получите персональную рекомендацию и оффер — без ожиданий и без спама.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Быстрые ответы</li>
              <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Личные рекомендации</li>
              <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Без спама</li>
            </ul>

            <div className="mt-8">
              <MessengerButtons config={config} />
              <p className="mt-3 text-sm text-muted-foreground">
                Нажмите кнопку — начнём диалог в том канале, который удобен вам. Рабочее время&nbsp;9:00–21:00.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 to-accent blur-2xl" />
            <img
              src={heroImage}
              alt="Человек с телефоном — общение в мессенджерах"
              className="relative w-full rounded-[2rem] border border-border object-cover shadow-2xl"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Почему пишут именно нам</h2>
          <p className="mt-3 text-muted-foreground">Тёплое общение, живые люди и честные ответы — а не бот.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: HeartHandshake, title: "Живые ответы", text: "Наши специалисты отвечают лично, без скриптов." },
            { icon: Sparkles, title: "Эксклюзивные предложения", text: "Специальные офферы только в чатах." },
            { icon: ShieldCheck, title: "Поддержка 7 дней", text: "Быстро, удобно и без выходных." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-accent/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Как это работает</h2>
            <p className="mt-3 text-muted-foreground">Три шага до ответа — это всё.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", title: "Выбираете мессенджер", text: "Кликните любую кнопку — WhatsApp, Telegram или Instagram." },
              { n: "02", title: "Пишете вопрос", text: "Можно скопировать готовый шаблон ниже — нам это очень помогает." },
              { n: "03", title: "Получаете ответ", text: "Персональная рекомендация, оффер или запись — в течение 5–15 минут." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                <div className="text-sm font-bold text-primary">{s.n}</div>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Template label="Общий вопрос" text='Здравствуйте! Хотел(а) бы узнать о [услуга/товар]. Какие есть варианты и цены?' />
            <Template label="Быстрая консультация" text='Привет! Нужна рекомендация по [вопрос]. Мой бюджет — [XXX].' />
            <Template label="Запись/заявка" text='Здравствуйте, хочу записаться на [услуга] на [дата/время]. Подтвердите, пожалуйста.' />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Что говорят клиенты</h2>
          <p className="mt-3 text-muted-foreground">Больше отзывов — в нашем Instagram.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { name: "Анна К.", text: "Ответили за 3 минуты в WhatsApp и помогли выбрать. Очень тепло!", avatar: "А" },
            { name: "Денис М.", text: "Удобно: написал в Telegram вечером — утром уже был оффер.", avatar: "Д" },
            { name: "Марина Л.", text: "Без давления, по делу. Записалась прямо в Instagram‑DM.", avatar: "М" },
          ].map((r) => (
            <figure key={r.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground">"{r.text}"</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-primary/15 font-bold text-primary">
                  {r.avatar}
                </div>
                <div className="text-sm font-medium">{r.name}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-accent/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Простые тарифы</h2>
            <p className="mt-3 text-muted-foreground">Индивидуальные решения — просто напишите нам в чат.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <PriceCard name="Консультация" price="Бесплатно" url={config.whatsapp.url} features={["Ответ на 1 вопрос", "Рекомендация по выбору", "Без обязательств"]} />
            <PriceCard name="Сопровождение" price="от 4 900 ₽" url={config.whatsapp.url} features={["Личный менеджер", "Подбор под задачу", "Чат 7 дней в неделю"]} highlight />
            <PriceCard name="VIP" price="по запросу" url={config.whatsapp.url} features={["Индивидуальное решение", "Приоритетный ответ", "Эксклюзивные офферы"]} />
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Не нашли подходящий вариант?{" "}
            <a className="font-medium text-primary underline-offset-4 hover:underline" href={withUtm(config.whatsapp.url, "pricing")} target="_blank" rel="noopener noreferrer">Напишите нам</a> — придумаем под вас.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Частые вопросы</h2>
          <p className="mt-3 text-muted-foreground">Коротко и по делу.</p>
        </div>
        <div className="mt-10 space-y-3">
          {[
            { q: "Сколько ждать ответа?", a: "В рабочее время (9:00–21:00) — обычно 5–15 минут." },
            { q: "Платно ли общение?", a: "Нет, консультация в чате бесплатная и ни к чему не обязывает." },
            { q: "Можно ли отменить запись?", a: "Да, в любой момент — просто напишите в тот же чат." },
            { q: "Безопасно ли это?", a: "Мы не передаём ваши данные третьим лицам и не рассылаем спам." },
          ].map((item) => (
            <details key={item.q} className="group rounded-xl border border-border bg-card p-5 shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                {item.q}
                <span className="text-primary transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-accent p-10 text-center shadow-sm sm:p-14">
          <Clock className="mx-auto size-8 text-primary" />
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Готовы начать диалог?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Выберите мессенджер — и получите персональный ответ за пару минут.
          </p>
          <div className="mt-8 flex justify-center">
            <MessengerButtons config={config} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <div className="flex items-center gap-2 text-sm">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <HeartHandshake className="size-4" />
            </span>
            <span className="font-semibold">ChatFirst</span>
            <span className="text-muted-foreground">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={withUtm(config.whatsapp.url, "whatsapp_footer")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-10 place-items-center rounded-full bg-[var(--color-whatsapp)] text-white transition hover:-translate-y-0.5">
              <MessageCircle className="size-5" />
            </a>
            <a href={withUtm(config.telegram.url, "telegram_footer")} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="grid size-10 place-items-center rounded-full bg-[var(--color-telegram)] text-white transition hover:-translate-y-0.5">
              <Send className="size-5" />
            </a>
            <a href={withUtm(config.instagram.url, "instagram_footer")} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full text-white transition hover:-translate-y-0.5" style={{ backgroundImage: "linear-gradient(135deg, var(--color-instagram-from), var(--color-instagram-to))" }}>
              <Instagram className="size-5" />
            </a>
          </div>
          <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground md:items-end">
            <p>Мы не передаём ваши данные третьим лицам.</p>
            <button
              onClick={() => setEditorOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <Settings className="size-3.5" />
              Редактировать кнопки связи
            </button>
          </div>
        </div>
      </footer>

      {editorOpen && (
        <ButtonsEditor
          initial={config}
          onClose={() => setEditorOpen(false)}
          onSave={handleSave}
          onReset={handleReset}
        />
      )}
    </main>
  );
}

function Template({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-primary">{label}</div>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">"{text}"</p>
      <button
        onClick={copy}
        className="mt-4 inline-flex h-9 items-center justify-center gap-2 self-start rounded-full border border-border bg-background px-4 text-sm font-medium transition hover:bg-accent"
      >
        {copied ? <><Check className="size-4 text-primary" /> Скопировано</> : <><Copy className="size-4" /> Скопировать шаблон</>}
      </button>
    </div>
  );
}

function PriceCard({
  name,
  price,
  features,
  highlight,
  url,
}: {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
  url: string;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-7 shadow-sm transition ${
        highlight ? "border-primary bg-card shadow-lg ring-2 ring-primary/20" : "border-border bg-card"
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          Популярный
        </span>
      )}
      <div className="text-sm font-medium text-muted-foreground">{name}</div>
      <div className="mt-2 text-3xl font-bold">{price}</div>
      <ul className="mt-5 flex-1 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={withUtm(url, `pricing_${name}`)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition ${
          highlight ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border bg-background hover:bg-accent"
        }`}
      >
        <MessageCircle className="size-4" />
        Узнать подробнее
      </a>
    </div>
  );
}

function ButtonsEditor({
  initial,
  onClose,
  onSave,
  onReset,
}: {
  initial: ButtonsConfig;
  onClose: () => void;
  onSave: (next: ButtonsConfig) => void;
  onReset: () => void;
}) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<ButtonsConfig>(initial);

  const update = (key: ChannelKey, field: keyof ChannelConfig, value: string) => {
    setDraft((d) => ({ ...d, [key]: { ...d[key], [field]: value } }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === OWNER_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Неверный пароль");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-border bg-background text-muted-foreground transition hover:bg-accent"
        >
          <X className="size-4" />
        </button>

        {!authed ? (
          <form onSubmit={submit}>
            <h3 className="text-xl font-bold">Доступ владельца</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Введите пароль, чтобы изменить ссылки и тексты кнопок. По умолчанию: <code className="rounded bg-muted px-1.5 py-0.5 text-xs">admin</code>
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              autoFocus
              className="mt-4 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-primary"
            />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Войти
            </button>
          </form>
        ) : (
          <>
            <h3 className="text-xl font-bold">Настроить кнопки связи</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Изменения сохраняются в этом браузере (localStorage).
            </p>

            <div className="mt-6 space-y-6">
              {(
                [
                  { key: "whatsapp" as const, label: "WhatsApp", icon: "🟢", placeholder: "https://wa.me/77001234567?text=..." },
                  { key: "telegram" as const, label: "Telegram", icon: "✳️", placeholder: "https://t.me/username" },
                  { key: "instagram" as const, label: "Instagram", icon: "📸", placeholder: "https://instagram.com/username" },
                ]
              ).map(({ key, label, icon, placeholder }) => (
                <div key={key} className="rounded-xl border border-border bg-background p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                  <label className="block text-xs font-medium text-muted-foreground">Текст кнопки</label>
                  <input
                    type="text"
                    value={draft[key].text}
                    onChange={(e) => update(key, "text", e.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-primary"
                  />
                  <label className="mt-3 block text-xs font-medium text-muted-foreground">Ссылка</label>
                  <input
                    type="url"
                    value={draft[key].url}
                    onChange={(e) => update(key, "url", e.target.value)}
                    placeholder={placeholder}
                    className="mt-1 h-10 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onSave(draft)}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Check className="size-4" /> Сохранить
              </button>
              <button
                onClick={() => {
                  onReset();
                  setDraft(DEFAULT_CONFIG);
                }}
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-medium transition hover:bg-accent"
              >
                Сбросить
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
