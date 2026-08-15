create policy "Public can view posters"
on storage.objects
for select
using (
  bucket_id = 'posters'
);


create policy "Admins can upload posters"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'posters'
  and exists (
    select 1
    from public.profiles
    where id = auth.uid()
    and is_admin = true
  )
);


create policy "Public can view videos"
on storage.objects
for select
using (
  bucket_id = 'videos'
);


create policy "Admins can upload videos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'videos'
  and exists (
    select 1
    from public.profiles
    where id = auth.uid()
    and is_admin = true
  )
);
