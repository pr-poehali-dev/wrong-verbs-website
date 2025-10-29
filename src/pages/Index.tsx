import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import VerbCard from '@/components/VerbCard';
import ProgressStats from '@/components/ProgressStats';
import GrammarTips from '@/components/GrammarTips';
import Icon from '@/components/ui/icon';

interface Verb {
  id: number;
  infinitive: string;
  pastSimple: string;
  pastParticiple: string;
  translation: string;
  imageUrl?: string;
  studiedCount: number;
  isMastered: boolean;
}

const API_URL = 'https://functions.poehali.dev/60a20dd2-4c23-43be-9fb6-da7acde267cb';

const Index = () => {
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVerb, setSelectedVerb] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchVerbs();
  }, []);

  const fetchVerbs = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setVerbs(data.verbs);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить глаголы',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStudied = async (verbId: number) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'study', verbId })
      });
      
      setVerbs(prev =>
        prev.map(v =>
          v.id === verbId
            ? { ...v, studiedCount: v.studiedCount + 1 }
            : v
        )
      );
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedVerb || !imageUrl) return;

    try {
      await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verbId: selectedVerb, imageUrl })
      });

      setVerbs(prev =>
        prev.map(v =>
          v.id === selectedVerb ? { ...v, imageUrl } : v
        )
      );

      toast({
        title: 'Успешно!',
        description: 'Изображение добавлено к глаголу'
      });

      setSelectedVerb(null);
      setImageUrl('');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить изображение',
        variant: 'destructive'
      });
    }
  };

  const filteredVerbs = verbs.filter(v =>
    v.infinitive.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.translation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const studiedVerbs = verbs.filter(v => v.studiedCount > 0).length;
  const masteredVerbs = verbs.filter(v => v.studiedCount >= 3).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-fade-in text-center">
          <Icon name="BookOpen" size={48} className="text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Загрузка глаголов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <Icon name="BookOpen" size={40} />
            Неправильные глаголы
          </h1>
          <p className="text-muted-foreground text-lg">
            Изучайте английский язык интерактивно
          </p>
        </header>

        <Tabs defaultValue="verbs" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
            <TabsTrigger value="verbs" className="flex items-center gap-2">
              <Icon name="Library" size={18} />
              Глаголы
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Icon name="Lightbulb" size={18} />
              Правила
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Icon name="TrendingUp" size={18} />
              Прогресс
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verbs" className="space-y-6 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Поиск глагола..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVerbs.map((verb, index) => (
                <div
                  key={verb.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <VerbCard
                    {...verb}
                    onStudied={handleStudied}
                    onImageUpload={(id) => setSelectedVerb(id)}
                  />
                </div>
              ))}
            </div>

            {filteredVerbs.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Глаголы не найдены
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tips" className="max-w-7xl mx-auto">
            <GrammarTips />
          </TabsContent>

          <TabsContent value="progress" className="max-w-2xl mx-auto animate-fade-in">
            <ProgressStats
              totalVerbs={verbs.length}
              studiedVerbs={studiedVerbs}
              masteredVerbs={masteredVerbs}
            />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {verbs
                .filter(v => v.studiedCount > 0)
                .sort((a, b) => b.studiedCount - a.studiedCount)
                .map(verb => (
                  <div
                    key={verb.id}
                    className="p-4 bg-card rounded-lg border flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold">{verb.infinitive}</p>
                      <p className="text-sm text-muted-foreground">{verb.translation}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="RotateCw" size={16} className="text-primary" />
                      <span className="font-semibold">{verb.studiedCount}</span>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={selectedVerb !== null} onOpenChange={() => setSelectedVerb(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить изображение</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="URL изображения"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button onClick={handleImageUpload} className="w-full">
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;