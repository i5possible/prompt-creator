import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

interface Template {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await supabase
          .from('templates')
          .select('id, title, description, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTemplates(data || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Templates</h1>
        <Link href="/dashboard/templates/new">
          <Button>Create New Template</Button>
        </Link>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No templates yet. Create your first template!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Link href={`/dashboard/templates/${template.id}`}>
                <h2 className="text-xl font-semibold">{template.title}</h2>
                {template.description && (
                  <p className="text-gray-500 mt-2">{template.description}</p>
                )}
                <p className="text-sm text-gray-400 mt-2">
                  Created {new Date(template.created_at).toLocaleDateString()}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
