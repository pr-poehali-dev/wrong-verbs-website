import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface TipProps {
  icon: string;
  title: string;
  description: string;
  example: string;
}

const Tip = ({ icon, title, description, example }: TipProps) => (
  <Card className="hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg">
        <Icon name={icon as any} size={24} className="text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="bg-secondary/30 p-3 rounded-md">
        <p className="text-sm font-medium italic">{example}</p>
      </div>
    </CardContent>
  </Card>
);

const GrammarTips = () => {
  const tips: TipProps[] = [
    {
      icon: 'Clock',
      title: 'Present Perfect',
      description: 'Используется для действий, связанных с настоящим. Формула: have/has + V3',
      example: 'I have been to London three times.'
    },
    {
      icon: 'Calendar',
      title: 'Past Simple vs Past Perfect',
      description: 'Past Simple — завершённое действие. Past Perfect — действие до другого в прошлом.',
      example: 'She had left before I arrived.'
    },
    {
      icon: 'Zap',
      title: 'Артикли a/an/the',
      description: 'a/an — неопределённые (впервые упоминаем). the — определённый (уже известно).',
      example: 'I saw a dog. The dog was friendly.'
    },
    {
      icon: 'MessageCircle',
      title: 'Порядок слов',
      description: 'В английском строгий порядок: Подлежащее → Сказуемое → Дополнение.',
      example: 'She reads books every day.'
    },
    {
      icon: 'BookOpen',
      title: 'Модальные глаголы',
      description: 'Can, must, should, may — не изменяются по лицам, после них идёт инфинитив.',
      example: 'You should study irregular verbs.'
    },
    {
      icon: 'Globe',
      title: 'Предлоги времени',
      description: 'in — месяцы/годы/сезоны, on — дни недели/даты, at — точное время.',
      example: 'at 5 pm, on Monday, in July'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">
          Правила-помощники
        </h2>
        <p className="text-muted-foreground">
          Полезные подсказки для изучения английского
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Tip {...tip} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrammarTips;
