import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface VerbCardProps {
  id: number;
  infinitive: string;
  pastSimple: string;
  pastParticiple: string;
  translation: string;
  imageUrl?: string;
  onStudied: (id: number) => void;
  onImageUpload: (id: number) => void;
}

export default function VerbCard({
  id,
  infinitive,
  pastSimple,
  pastParticiple,
  translation,
  imageUrl,
  onStudied,
  onImageUpload
}: VerbCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      onStudied(id);
    }
  };

  return (
    <div className="perspective-1000 w-full h-[320px]">
      <div
        className={`relative w-full h-full transition-transform duration-600 preserve-3d cursor-pointer ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
        onClick={handleFlip}
      >
        <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 hover:shadow-lg transition-shadow">
          <div className="text-center space-y-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={infinitive}
                className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
              />
            ) : (
              <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Icon name="Image" size={48} className="text-muted-foreground" />
              </div>
            )}
            <h3 className="text-4xl font-bold text-primary">{infinitive}</h3>
            <p className="text-lg text-muted-foreground">{translation}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4"
            onClick={(e) => {
              e.stopPropagation();
              onImageUpload(id);
            }}
          >
            <Icon name="Upload" size={16} />
          </Button>
        </Card>

        <Card className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-secondary/10 to-accent/10 border-2">
          <div className="text-center space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Past Simple</p>
              <p className="text-3xl font-semibold text-secondary">{pastSimple}</p>
            </div>
            <div className="w-16 h-0.5 bg-border mx-auto" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Past Participle</p>
              <p className="text-3xl font-semibold text-accent">{pastParticiple}</p>
            </div>
            <p className="text-lg text-muted-foreground mt-4">{translation}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
