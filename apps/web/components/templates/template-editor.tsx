'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

interface TemplateVariable {
  name: string;
  description: string;
  required: boolean;
}

export function TemplateEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [variables, setVariables] = useState<TemplateVariable[]>([]);
  const [loading, setLoading] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const supabase = createClient();

  const addVariable = () => {
    setVariables([...variables, { name: '', description: '', required: true }]);
  };

  const updateVariable = (
    index: number,
    field: keyof TemplateVariable,
    value: string | boolean
  ) => {
    const newVariables = [...variables];
    newVariables[index] = { ...newVariables[index], [field]: value };
    setVariables(newVariables);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const handleOptimize = async () => {
    if (!content) {
      toast({
        title: 'Error',
        description: 'Please enter some content to optimize',
        variant: 'destructive',
      });
      return;
    }

    setOptimizing(true);
    setError(null);

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: content }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to optimize prompt');
      }

      const { optimizedPrompt } = await response.json();
      setContent(optimizedPrompt);
      toast({
        title: 'Success',
        description: 'Prompt optimized successfully',
      });
    } catch (error: any) {
      setError(error.message);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setOptimizing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // 创建模板
      const { data: template, error: templateError } = await supabase
        .from('templates')
        .insert({
          user_id: user.id,
          title,
          content,
          description,
        })
        .select()
        .single();

      if (templateError) throw templateError;

      // 创建变量
      if (variables.length > 0) {
        const { error: variablesError } = await supabase
          .from('template_variables')
          .insert(
            variables.map((variable) => ({
              template_id: template.id,
              name: variable.name,
              description: variable.description,
              required: variable.required,
            }))
          );

        if (variablesError) throw variablesError;
      }

      // 创建历史记录
      const { error: historyError } = await supabase
        .from('template_history')
        .insert({
          template_id: template.id,
          content,
        });

      if (historyError) throw historyError;

      toast({
        title: 'Success',
        description: 'Template created successfully',
      });
    } catch (error: any) {
      setError(error.message);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            placeholder="Template Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Textarea
            placeholder="Template Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Template Content</h3>
            <Button
              type="button"
              variant="outline"
              onClick={handleOptimize}
              disabled={optimizing || !content}
            >
              {optimizing ? 'Optimizing...' : 'Optimize with AI'}
            </Button>
          </div>
          <Textarea
            placeholder="Template Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="min-h-[200px]"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Variables</h3>
            <Button type="button" onClick={addVariable}>
              Add Variable
            </Button>
          </div>
          {variables.map((variable, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Variable Name"
                  value={variable.name}
                  onChange={(e) =>
                    updateVariable(index, 'name', e.target.value)
                  }
                  required
                />
                <Input
                  placeholder="Variable Description"
                  value={variable.description}
                  onChange={(e) =>
                    updateVariable(index, 'description', e.target.value)
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={variable.required}
                    onChange={(e) =>
                      updateVariable(index, 'required', e.target.checked)
                    }
                  />
                  Required
                </label>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeVariable(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Template'}
        </Button>
      </form>
    </div>
  );
}
