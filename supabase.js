create table public.profiles (
  id uuid primary key references auth.users(id)
    on delete cascade,

  is_admin boolean not null default false,

  created_at timestamptz
    default now()
);


create table public.anime (
  id uuid primary key default gen_random_uuid(),

  title text not null,

  genre text,

  description text,

  poster_url text,

  created_by uuid
    references auth.users(id)
    on delete set null,

  created_at timestamptz
    default now()
);


create table public.episodes (
  id uuid primary key default gen_random_uuid(),

  anime_id uuid not null
    references public.anime(id)
    on delete cascade,

  episode_number integer not null,

  title text,

  video_url text not null,

  created_by uuid
    references auth.users(id)
    on delete set null,

  created_at timestamptz
    default now()
);


alter table public.profiles
enable row level security;

alter table public.anime
enable row level security;

alter table public.episodes
enable row level security;
