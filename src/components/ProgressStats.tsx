import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface ProgressStatsProps {
  totalVerbs: number;
  studiedVerbs: number;
  masteredVerbs: number;
}

export default function ProgressStats({
  totalVerbs,
  studiedVerbs,
  masteredVerbs
}: ProgressStatsProps) {
  const studiedPercentage = totalVerbs > 0 ? (studiedVerbs / totalVerbs) * 100 : 0;
  const masteredPercentage = totalVerbs > 0 ? (masteredVerbs / totalVerbs) * 100 : 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Icon name="TrendingUp" size={24} className="text-primary" />
        Ваш прогресс
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-background rounded-lg">
            <div className="text-3xl font-bold text-primary">{totalVerbs}</div>
            <p className="text-sm text-muted-foreground mt-1">Всего глаголов</p>
          </div>
          
          <div className="text-center p-4 bg-background rounded-lg">
            <div className="text-3xl font-bold text-secondary">{studiedVerbs}</div>
            <p className="text-sm text-muted-foreground mt-1">Изучено</p>
          </div>
          
          <div className="text-center p-4 bg-background rounded-lg">
            <div className="text-3xl font-bold text-accent">{masteredVerbs}</div>
            <p className="text-sm text-muted-foreground mt-1">Освоено</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Прогресс изучения</span>
              <span className="text-sm text-muted-foreground">
                {studiedPercentage.toFixed(0)}%
              </span>
            </div>
            <Progress value={studiedPercentage} className="h-3" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Уровень освоения</span>
              <span className="text-sm text-muted-foreground">
                {masteredPercentage.toFixed(0)}%
              </span>
            </div>
            <Progress value={masteredPercentage} className="h-3 [&>div]:bg-accent" />
          </div>
        </div>
      </div>
    </Card>
  );
}
