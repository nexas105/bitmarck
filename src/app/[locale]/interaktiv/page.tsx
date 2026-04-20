import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {QuizGame} from '@/components/interactive/quiz-game';
import {CareerExplorer} from '@/components/interactive/career-explorer';
import {SkillRadar} from '@/components/interactive/skill-radar';
import {Sparkles, ClipboardCheck, Map, Radar} from 'lucide-react';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function InteractivePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Interactive');

  return (
    <main className="py-4xl px-md md:px-xl bg-surface min-h-screen">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-2xl text-center">
          <div className="inline-flex items-center gap-sm rounded-full bg-accent/8 px-md py-xs mb-md">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-label font-medium text-accent">{t('badge')}</span>
          </div>
          <h1 className="text-section font-bold text-text-primary tracking-tight">
            {t('pageTitle')}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mt-md max-w-2xl mx-auto">
            {t('pageIntro')}
          </p>
        </div>

        {/* Game cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {/* Quiz */}
          <div className="rounded-2xl border border-border/60 bg-surface-raised p-lg shadow-card md:col-span-2">
            <div className="flex items-center gap-sm mb-lg">
              <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <ClipboardCheck className="h-4.5 w-4.5 text-accent" />
              </div>
              <h2 className="text-heading font-bold text-text-primary tracking-tight">
                {t('quiz.title')}
              </h2>
            </div>
            <QuizGame />
          </div>

          {/* Career Explorer */}
          <div className="rounded-2xl border border-border/60 bg-surface-raised p-lg shadow-card md:col-span-1">
            <div className="flex items-center gap-sm mb-lg">
              <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <Map className="h-4.5 w-4.5 text-accent" />
              </div>
              <h2 className="text-heading font-bold text-text-primary tracking-tight">
                {t('careerExplorer.title')}
              </h2>
            </div>
            <CareerExplorer />
          </div>

          {/* Skill Radar */}
          <div className="rounded-2xl border border-border/60 bg-surface-raised p-lg shadow-card md:col-span-1">
            <div className="flex items-center gap-sm mb-lg">
              <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <Radar className="h-4.5 w-4.5 text-accent" />
              </div>
              <h2 className="text-heading font-bold text-text-primary tracking-tight">
                {t('skillRadar.title')}
              </h2>
            </div>
            <SkillRadar />
          </div>
        </div>
      </div>
    </main>
  );
}
