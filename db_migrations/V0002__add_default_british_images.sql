ALTER TABLE irregular_verbs ADD COLUMN default_image_url TEXT;

UPDATE irregular_verbs SET default_image_url = 'https://cdn.poehali.dev/projects/baab7c15-aece-4201-8fd2-f77ee1fdd582/files/86a9c915-cfa1-4757-be15-85f7a35cec21.jpg' WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8);
UPDATE irregular_verbs SET default_image_url = 'https://cdn.poehali.dev/projects/baab7c15-aece-4201-8fd2-f77ee1fdd582/files/ec449381-0eae-49a3-84a2-b0f3e29c3cf2.jpg' WHERE id IN (9, 10, 11, 12, 13, 14, 15, 16);
UPDATE irregular_verbs SET default_image_url = 'https://cdn.poehali.dev/projects/baab7c15-aece-4201-8fd2-f77ee1fdd582/files/522a04f2-4307-4a6e-b4a0-5f1ea11da7f5.jpg' WHERE id IN (17, 18, 19, 20, 21, 22, 23, 24);
UPDATE irregular_verbs SET default_image_url = 'https://cdn.poehali.dev/projects/baab7c15-aece-4201-8fd2-f77ee1fdd582/files/e87830dc-9135-469e-baf4-0956d5bdcf01.jpg' WHERE id IN (25, 26, 27, 28, 29, 30, 31, 32);
UPDATE irregular_verbs SET default_image_url = 'https://cdn.poehali.dev/projects/baab7c15-aece-4201-8fd2-f77ee1fdd582/files/6ccf6890-e9c0-4df5-9f96-dd480fb79a20.jpg' WHERE id IN (33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47);
