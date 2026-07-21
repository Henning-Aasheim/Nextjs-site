import { useTranslations } from "next-intl"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { use } from "react"
import { FileDown } from "lucide-react"
import { Metadata } from "next"
import { FaBluesky, FaGithub, FaLinkedin } from "react-icons/fa6"
import { IoMdMail } from "react-icons/io"
import Shinshu from "../../icons/shinshu.svg"
import CivitaIcon from "../../icons/civita.svg"
import UiO from "../../icons/uio_segl.svg"

// This is the metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations("metaAbout");

  return {
    title: t("title"),
    description: t("description"),
  };
}

// ---- Data: CV path per locale <ref: index=10406232 firstWord=1 lastWord=25/> ----

const localeToCvPath: Record<string, string> = {
  no: "/resumes/cv-no.pdf",
  "en-GB": "/resumes/cv-en-GB.pdf",
  // ja: "/resumes/cv-ja-JP.pdf",
}

// ---- Data: previous Civita work (unchanged) <ref: index=10406203 firstWord=1 lastWord=40/> ----

const civita = [
  {
    id: 1,
    url: "https://civita.no/notat/mikrobrikkekrigen/",
    title: "Mikrobrikkekrigen",
    image: "/civita/mikrobrikker.webp",
    date: "2024-04-09",
    category: "international",
    excerpt: "Mikrobrikken er viktig for Norge og Vesten og Kina har blitt en rival. Dette notatet ser på kampen om den digitale utviklingen, en ideologisk kamp der Vesten kriger med Kina for å holde på den teknologiske ledelsen.",
  },
  {
    id: 2,
    url: "https://civita.no/notat/det-indiske-valget-er-india-pa-vei-bort-fra-sin-demokratiske-tradisjon/",
    title: "Det indiske valget",
    image: "/civita/india.webp",
    date: "2024-04-19",
    category: "international",
    excerpt: "Den sittende statsministeren, Narendra Modi, vinner trolig valget. Kan Modis autokratiske tendenser bli et problem? Er demokratiet i fare? Og hva skjer med Indias voksende økonomi?",
  },
  {
    id: 3,
    url: "https://civita.no/podcast/digitale-utfordringer-del-3-kampen-om-mikrochipene/",
    title: "Kampen om mikrochipene",
    image: "/civita/podkast.webp",
    date: "2024-04-09",
    category: "international",
    excerpt: "Hva er mikrochiper og hvorfor er de så viktige i dagens samfunn? Blir den neste store konflikten en microchip-krig?",
  },
  {
    id: 4,
    url: "https://civita.no/notat/har-norsk-offentlig-sektor-et-produktivitetsproblem/",
    title: "Norsk offentlig sektor og produktivitet",
    image: "/civita/offentlig_sektor.webp",
    date: "2024-04-09",
    category: "economy",
    excerpt: "Hvor effektiv er egentlig norsk offentlig sektor? Og hva får vi igjen for pengene? Er produktivitet i offentlig sektor mulig å måle?",
  },
]

// ---- Data: Experience items (replaces repeated JSX in the experience section) ----
// Mirrors the three list items from the original experience block
//   UiO, UiO, CivitaIcon, with translation keys:
//   experience-1-title/employer/date, experience-2-..., experience-3-...
// See original markup in <ref: index=10406202 firstWord=1 lastWord=35/> and <ref: index=10406206 firstWord=1 lastWord=30/>.

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface ExperienceItem {
  id: string;
  icon: IconComponent;
  titleKey: string;
  subtitleKey: string;
  dateKey: string;
}

const experienceItems: ExperienceItem[] = [
  {
    id: "experience-1",
    icon: UiO,
    titleKey: "experience-1-title",
    subtitleKey: "experience-1-employer",
    dateKey: "experience-1-date",
  },
  {
    id: "experience-2",
    icon: UiO,
    titleKey: "experience-2-title",
    subtitleKey: "experience-2-employer",
    dateKey: "experience-2-date",
  },
  {
    id: "experience-3",
    icon: CivitaIcon,
    titleKey: "experience-3-title",
    subtitleKey: "experience-3-employer",
    dateKey: "experience-3-date",
  },
]

// ---- Data: Education items (replaces repeated JSX in the education section) ----
// Mirrors the four list items from the original education block:
//   UiO, UiO, UiO, Shinshu with translation keys education-1-... through education-4-...
// See original markup in <ref: index=10406209 firstWord=1 lastWord=40/> and related segments <ref: index=10406212 firstWord=1 lastWord=30/>.

interface EducationItem {
  id: string;
  icon: IconComponent;
  titleKey: string;
  subtitleKey: string;
  dateKey: string;
}

const educationItems: EducationItem[] = [
  {
    id: "education-1",
    icon: UiO,
    titleKey: "education-1-title",
    subtitleKey: "education-1-university",
    dateKey: "education-1-date",
  },
  {
    id: "education-2",
    icon: UiO,
    titleKey: "education-2-title",
    subtitleKey: "education-2-university",
    dateKey: "education-2-date",
  },
  {
    id: "education-3",
    icon: UiO,
    titleKey: "education-3-title",
    subtitleKey: "education-3-university",
    dateKey: "education-3-date",
  },
  {
    id: "education-4",
    icon: Shinshu,
    titleKey: "education-4-title",
    subtitleKey: "education-4-university",
    dateKey: "education-4-date",
  },
]

// ---- Main page component ----

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params)

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations("about")

  const cvHref = localeToCvPath[locale] ?? localeToCvPath["no"] // default to Norwegian

  return (
    <div className="relative w-10/11 md:w-4/5 xl:w-2/3 max-w-[1300px] mx-auto pt-5 mb-5">
    <div className="flex flex-col gap-5">

      {/* PROFILE IMAGE */}
      <div className="flex-none text-white xl:col-start-1 xl:row-start-1">
        <div className="bg-danger p-5 rounded-lg
                 dark:bg-[color-mix(in_srgb,var(--color-danger)_12%,var(--color-darkNavyLight))]
                 dark:border dark:border-danger/60
                 dark:shadow-[0_0_20px] dark:shadow-danger/10
                 flex items-center justify-center
                 flex-row text-left gap-5">
          {/* The top-30 has to change when the warning banner is removed */}
          <img
            src="/profile_image.jpg"
            alt="Profile Image"
            className="w-40 h-40 object-cover rounded-full border-2 dark:border border-background dark:border-danger shrink-0"
          />
          <div className="">

            <h1 className="text-2xl font-bold">
              {t("profile-heading")}
            </h1>
            <h2 className="text-base text-background sm:text-1xl italic mt-1">
              {t("work-title")}
            </h2>
            <h2 className="text-base text-background sm:text-1xl mt-1">
              {t("employer")}
            </h2>

            <div className="mt-4">
              <ul className="flex flex-row flex-wrap gap-4 justify-start">
                <li>
                  <a href="https://bsky.app/profile/henningaasheim.bsky.social" target="_blank" rel="noopener noreferrer">
                    <FaBluesky className="soMeButton" />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Henning-Aasheim" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="soMeButton" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/henning-%C3%A5sheim-8114232a2/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="soMeButton" />
                  </a>
                </li>
                <li>
                  <a href="mailto:henning.aasheim@outlook.com">
                    <IoMdMail className="inline w-7 h-7 hover:text-background" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT COLUMN */}
      <div className="flex flex-col gap-5 xl:col-start-2 xl:row-start-1">

            {/* INTRODUCTION + RESUME */}
            <section className=" px-5 sm:px-10 py-5
                     dark:rounded-lg
                     dark:bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-darkNavyLight))]
                     dark:border dark:border-primary/60
                     dark:shadow-[0_0_20px] dark:shadow-primary/10">
                    <h1 className="text-xl sm:text-3xl font-bold mb-2">
                    {t("heading")}
                    </h1>

                    <p className="text-base sm:text-xl mb-10 text-left dark:text-gray-300">
                    {t("description")}
                    </p>

                    <div className="flex justify-center lg:justify-start">
                    <a href={cvHref} className="mb-3 px-3 font-bold text-lg text-background bg-danger rounded-full
                                                border-2 border-background hover:text-white hover:border-white
                                                hover:bg-danger/60
                                                dark:rounded-3xl dark:text-gray-300 dark:border dark:border-danger
                                                dark:bg-[color-mix(in_srgb,var(--color-danger)_12%,var(--color-darkNavyLight))]
                                                dark:shadow-[0_0_20px] dark:shadow-danger/10 dark:hover:shadow-danger/40" 
                    download>
                        <div className="p-3">
                            <FileDown className="inline mr-2 mb-0.5" />
                            {t("resume")}
                        </div>
                    </a>
                    </div>
            </section>

            {/* EXPERIENCE */}
            <section className="px-5 sm:px-10 py-5
                     dark:rounded-lg
                     dark:bg-[color-mix(in_srgb,var(--color-secondary)_12%,var(--color-darkNavyLight))]
                     dark:border dark:border-secondary/60
                     dark:shadow-[0_0_20px] dark:shadow-secondary/10">
                    <div className="mt-2 lg:mt-4">
                        <h1 className="text-xl sm:text-3xl font-bold">
                            {t("experience-heading")}
                        </h1>
                        <ol className="list-disc list-inside mb-10 mt-8">
                            {experienceItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li
                                key={item.id}
                                className="mb-5 list-none flex items-center"
                                >
                                <div className="experienceItems group">
                                    <span>
                                    <Icon
                                        width={60}
                                        height={60}
                                        className="experienceIcons"
                                    />
                                    </span>
                                    <div className="flex flex-col ml-8 pl-15">
                                    <h2 className="experienceTitle sm:text-2xl">
                                        {t(item.titleKey)}
                                    </h2>
                                    <h3 className="experienceSubtitle sm:text-1xl">
                                        {t(item.subtitleKey)}
                                    </h3>
                                    <time className="experienceDate">
                                        {t(item.dateKey)}
                                    </time>
                                    </div>
                                </div>
                                </li>
                            );
                            })}
                        </ol>
                    </div>
            </section>

            {/* EDUCATION */}
            <section className="px-5 sm:px-10 py-5
                     dark:rounded-lg
                     dark:bg-[color-mix(in_srgb,var(--color-danger)_12%,var(--color-darkNavyLight))]
                     dark:border dark:border-danger/60
                     dark:shadow-[0_0_20px] dark:shadow-danger/10">
                    <div className="mt-2 lg:mt-4">
                        <h1 className="text-xl sm:text-3xl font-bold">
                            {t("education-heading")}
                        </h1>
                        <ol className="list-disc list-inside mb-10 mt-8">
                            {educationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li
                                key={item.id}
                                className="mb-5 list-none flex items-center"
                                >
                                <div className="experienceItems group">
                                    <span>
                                        <Icon
                                            width={60}
                                            height={60}
                                            className="experienceIcons"
                                        />
                                    </span>
                                    <div className="flex flex-col ml-8 pl-15">
                                        <h2 className="experienceTitle sm:text-2xl">
                                            {t(item.titleKey)}
                                        </h2>
                                        <h3 className="experienceSubtitle sm:text-1xl">
                                            {t(item.subtitleKey)}
                                        </h3>
                                        <time className="experienceDate">
                                            {t(item.dateKey)}
                                        </time>
                                    </div>
                                </div>
                                </li>
                            );
                            })}
                        </ol>
                    </div>
            </section>

            {/* PREVIOUS WORK */}
            <section className="px-5 sm:px-10 py-5
                     dark:rounded-lg
                     dark:bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-darkNavyLight))]
                     dark:border dark:border-primary/60
                     dark:shadow-[0_0_20px] dark:shadow-primary/10">
                    <div className="lg:mt-2">
                        <h1 className="text-xl sm:text-3xl font-bold mb-6">
                            {t("previous-work")}
                        </h1>

                        <div>
                            {civita.map((item) => (
                            <article key={item.id} className="group">
                                <div className="xs:w-4/5 sm:w-full mx-auto max-w-75 sm:max-w-none">
                                <a href={item.url}>
                                    <div className="flex flex-row flex-wrap mb-4 items-center overflow-hidden 
                                                    shadow-lg dark:bg-primary/30
                                                    dark:rounded-lg bg-bgDark
                                                    hover:scale-102 hover:transition-transform 
                                                    transition-colors duration-600 ease-in-out
                                                    hover:shadow-xl hover:text-gray-600">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-38 sm:h-28 sm:w-45 object-cover sm:mr-4
                                                   mask-b-from-90% sm:mask-r-from-90% sm:mask-b-from-100%"
                                    />
                                    <h2 className="font-bold text-base 2xs:text-xl md:text-2xl flex-1
                                                    items-center sm:items-baseline 
                                                    my-4 sm:my-0
                                                    mx-3 sm:mx-0">
                                        {item.title}
                                    </h2>
                                    </div>
                                </a>
                                </div>
                            </article>
                            ))}
                        </div>
                    </div>
            </section>

        </div>

    </div>
    </div>
  );
}
