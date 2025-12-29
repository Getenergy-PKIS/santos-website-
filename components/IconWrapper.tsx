
import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Tv, 
  MapPin, 
  TrendingUp, 
  Clapperboard, 
  Users,
  Code,
  Zap,
  Network,
  BarChart3,
  Video,
  FileCheck,
  Building2,
  Share2,
  Sparkles
} from 'lucide-react';

interface IconWrapperProps {
  name: string;
  className?: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ name, className }) => {
  switch (name) {
    case 'shield-check': return <ShieldCheck className={className} />;
    case 'cpu': return <Cpu className={className} />;
    case 'globe': return <Globe className={className} />;
    case 'tv': return <Tv className={className} />;
    case 'map-pin': return <MapPin className={className} />;
    case 'trending-up': return <TrendingUp className={className} />;
    case 'clapperboard': return <Clapperboard className={className} />;
    case 'users': return <Users className={className} />;
    case 'code': return <Code className={className} />;
    case 'zap': return <Zap className={className} />;
    case 'network': return <Network className={className} />;
    case 'bar-chart': return <BarChart3 className={className} />;
    case 'video': return <Video className={className} />;
    case 'file-check': return <FileCheck className={className} />;
    case 'building': return <Building2 className={className} />;
    case 'share': return <Share2 className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    default: return <Zap className={className} />;
  }
};

export default IconWrapper;
