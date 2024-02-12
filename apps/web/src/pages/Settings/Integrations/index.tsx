import { TabsContent } from '@/components/ui/tabs';
import { settingsTabs } from '../const';
import { IntegrationType, integrations } from './const';
import { Card } from '@/components/ui/card';
import { TbExternalLink } from 'react-icons/tb';
import { Input } from '@/components/ui/input';
import { FaRegCopy } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth';
import { useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

const Integration = ({ integration }: { integration: IntegrationType }) => {
  return (
    <Card className="relative flex gap-4 p-5 min-w-[200px]">
      <div className="flex items-center">{integration.icon}</div>
      <div className="flex flex-col">
        <h2>{integration.title}</h2>
        <a
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          href={integration.url}
          target="_blank"
          rel="noreferrer"
        >
          Get extension <TbExternalLink />
        </a>
      </div>
      {!integration.url && (
        <div className="absolute top-0 right-0 pointer-events-none flex items-center justify-center p-2 text-lg italic text-gray-600 w-full h-full bg-white/70">
          Soon
        </div>
      )}
    </Card>
  );
};

export const Integrations = () => {
  const [isCopied, setIsCopied] = useState(false);
  const copyRef = useRef();
  const token = useAuthStore((state) => state.token);

  const onCopy = () => {
    navigator.clipboard.writeText(token!);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <TabsContent value={settingsTabs[0].value}>
      <h2 className="text-2xl mt-8">
        1. Install the relevant extensions that you use daily
      </h2>
      <div className="flex gap-4 mt-12">
        {integrations.map((integration) => (
          <Integration key={integration.title} integration={integration} />
        ))}
      </div>

      <h2 className="text-2xl mt-12">
        2. Use the following API Key to each extension
      </h2>
      <div className="flex items-center gap-2 mt-12">
        <Input className="max-w-[500px] text-ellipsis" value={token} />
        {isCopied ? (
          <Button className="flex gap-2" variant="outline">
            <FaCheck /> Copied
          </Button>
        ) : (
          <Button className="flex gap-2" variant="outline" onClick={onCopy}>
            <FaRegCopy /> Copy
          </Button>
        )}
      </div>
    </TabsContent>
  );
};
