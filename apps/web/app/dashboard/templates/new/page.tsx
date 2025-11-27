import { TemplateEditor } from '@/components/templates/template-editor';

export default function NewTemplatePage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Create New Template</h1>
      <TemplateEditor />
    </div>
  );
}
