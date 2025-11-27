-- 创建模板表
create table templates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  content text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 创建模板变量表
create table template_variables (
  id uuid default uuid_generate_v4() primary key,
  template_id uuid references templates on delete cascade not null,
  name text not null,
  description text,
  required boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 创建模板历史记录表
create table template_history (
  id uuid default uuid_generate_v4() primary key,
  template_id uuid references templates on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
