create policy "Public can view anime"
on public.anime
for select
using (true);


create policy "Public can view episodes"
on public.episodes
for select
using (true);


create policy "Users can view own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid());


create policy "Admins can insert anime"
on public.anime
for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles
    where id = auth.uid()
    and is_admin = true
  )
);


create policy "Admins can delete anime"
on public.anime
for delete
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where id = auth.uid()
    and is_admin = true
  )
);


create policy "Admins can insert episodes"
on public.episodes
for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles
    where id = auth.uid()
    and is_admin = true
  )
);
