-- ================================================
-- Wana Digital - Database Schema
-- Run this SQL in your Supabase SQL Editor
-- ================================================

-- 1. Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'palette',
  price TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Logo Design',
  image_url TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_role TEXT NOT NULL DEFAULT '',
  client_avatar TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Contact Messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ================================================
-- Row Level Security (RLS)
-- ================================================

-- Enable RLS on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access for services, portfolio, testimonials
CREATE POLICY "Public can read active services"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read portfolio"
  ON portfolio FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can read active testimonials"
  ON testimonials FOR SELECT
  USING (is_active = true);

-- Public can insert contact messages
CREATE POLICY "Public can insert contact messages"
  ON contact_messages FOR INSERT
  TO anon
  WITH CHECK (true);

-- Authenticated users (admin) have full access
CREATE POLICY "Admin full access on services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access on portfolio"
  ON portfolio FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access on testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access on contact_messages"
  ON contact_messages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ================================================
-- Seed Data (optional - for demo)
-- ================================================

INSERT INTO services (title, description, icon, price, sort_order) VALUES
  ('Logo Design', 'Desain logo profesional yang mencerminkan identitas brand Anda. Termasuk revisi hingga Anda puas.', 'pen-tool', 'Mulai Rp 500rb', 1),
  ('Brand Identity', 'Paket lengkap identitas visual brand: logo, color palette, typography, dan brand guidelines.', 'palette', 'Mulai Rp 2jt', 2),
  ('Social Media Design', 'Desain konten sosial media yang menarik dan konsisten untuk meningkatkan engagement Anda.', 'share-2', 'Mulai Rp 300rb', 3),
  ('UI/UX Design', 'Desain antarmuka website dan aplikasi yang modern, intuitif, dan user-friendly.', 'layout', 'Mulai Rp 3jt', 4),
  ('Print Design', 'Desain untuk kebutuhan cetak: brosur, kartu nama, poster, banner, dan packaging.', 'printer', 'Mulai Rp 250rb', 5),
  ('Illustration', 'Ilustrasi kustom untuk berbagai kebutuhan: editorial, merchandise, digital art, dan lainnya.', 'image', 'Mulai Rp 750rb', 6);

INSERT INTO portfolio (title, description, category, image_url, is_featured) VALUES
  ('Brand Kopi Nusantara', 'Rebranding lengkap untuk brand kopi lokal premium', 'Brand Identity', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop', true),
  ('Tokopedia Campaign', 'Social media campaign design', 'Social Media', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop', true),
  ('Restoran Padang App', 'UI/UX design untuk food delivery app', 'UI/UX Design', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop', true),
  ('Festival Musik Poster', 'Poster design untuk festival musik tahunan', 'Print Design', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop', false),
  ('Eco Fashion Logo', 'Logo design untuk brand fashion sustainable', 'Logo Design', 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=600&h=400&fit=crop', true),
  ('Children Book Illustration', 'Ilustrasi untuk buku cerita anak', 'Illustration', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop', false);

INSERT INTO testimonials (client_name, client_role, message, rating) VALUES
  ('Andi Pratama', 'CEO, Kopi Nusantara', 'Wana Digital benar-benar memahami visi brand kami. Hasil desainnya jauh melampaui ekspektasi!', 5),
  ('Sarah Wijaya', 'Marketing Manager, TechStartup', 'Proses kerja yang profesional dan hasilnya luar biasa. Tim sangat responsif dan kreatif.', 5),
  ('Budi Santoso', 'Owner, Restoran Padang Jaya', 'Desain UI/UX app kami sangat user-friendly. Pelanggan sangat puas dengan tampilan baru.', 4),
  ('Maya Chen', 'Founder, EcoFashion ID', 'Logo yang dibuatkan sangat merefleksikan nilai-nilai brand kami. Highly recommended!', 5);

-- ================================================
-- Storage bucket for portfolio images (run separately)
-- ================================================
-- Go to Supabase Dashboard > Storage > Create new bucket
-- Name: portfolio-images
-- Public: true
