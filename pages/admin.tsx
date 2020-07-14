import dynamic from 'next/dynamic';

import config from 'cms/config';
import HomePreview from 'cms/previews/HomePreview';
import PostPreview from 'cms/previews/PostPreview';

const CMS = dynamic(
  (): any =>
    import('netlify-cms-app').then((cms: any) => {
      cms.init({ config });
      cms.registerPreviewStyle('../styles/index.css');
      cms.registerPreviewStyle(
        'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'
      );
      cms.registerPreviewStyle('../styles/blog.css');
      cms.registerPreviewTemplate('posts', PostPreview);
      cms.registerPreviewTemplate('home', HomePreview);
    }),
  { ssr: false, loading: () => <p>...</p> }
);

const AdminPage: React.FC = () => {
  return <CMS />;
};

export default AdminPage;
